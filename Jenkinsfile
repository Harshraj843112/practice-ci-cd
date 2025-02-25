pipeline {
    agent any
    triggers { githubPush() }
    environment {
        EC2_IP = "46.202.164.138"
        NODE_OPTIONS = '--max-old-space-size=2048'
        NPM_CACHE_DIR = "${env.WORKSPACE}/.npm-cache"
        GIT_CREDENTIALS_ID = 'github-credentials'
    }
    stages {
        stage('Checkout') { 
            steps { 
                git branch: 'main', url: 'https://github.com/Harshraj843112/practice-ci-cd.git', credentialsId: "${GIT_CREDENTIALS_ID}" 
            } 
        }
        stage('Setup Environment') { 
            steps { 
                sh '''#!/bin/bash
                    rm -rf ${NPM_CACHE_DIR} node_modules package-lock.json build || true
                    npm cache clean --force
                    npm config set registry https://registry.npmjs.org/
                    git config --global url."https://github.com/".insteadOf "ssh://git@github.com/"
                    mkdir -p ${NPM_CACHE_DIR}
                    chmod -R 777 ${NPM_CACHE_DIR}
                ''' 
            } 
        }
        stage('Build React App') { 
            steps { 
                sh '''#!/bin/bash
                    set -e
                    export npm_config_cache=${NPM_CACHE_DIR}
                    npm install --registry https://registry.npmjs.org/ --no-audit --no-fund --omit=dev --verbose || { echo "npm install failed"; exit 1; }
                    npm run build || { echo "npm run build failed"; exit 1; }
                    ls -la
                    if [ ! -d "build" ]; then echo "Error: build directory not found!"; exit 1; fi
                ''' 
            } 
        }
        stage('Deploy to EC2') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-credentials', keyFileVariable: 'SSH_KEY', usernameVariable: 'SSH_USER')]) {
                    sh """
                        echo "Deploying build files to EC2 as \$SSH_USER"
                        scp -i "\$SSH_KEY" -o StrictHostKeyChecking=no -r build/* "\${SSH_USER}@\${EC2_IP}:/var/www/html/"
                        ssh -i "\$SSH_KEY" -o StrictHostKeyChecking=no "\${SSH_USER}@\${EC2_IP}" << EOF
                            sudo chown -R www-data:www-data /var/www/html/
                            sudo chmod -R 755 /var/www/html/
                            sudo systemctl restart apache2
                            echo "Deployment completed successfully. Check http://${EC2_IP}"
EOF
                    """
                }
            }
        }
    }
    post {
        always { 
            sh 'rm -rf node_modules build ${NPM_CACHE_DIR} || true'; 
            cleanWs() 
        }
        success { echo "Build ${env.BUILD_NUMBER} deployed successfully to http://${EC2_IP}!" }
        failure { echo "Build ${env.BUILD_NUMBER} failed—check logs and resources!" }
    }
}
