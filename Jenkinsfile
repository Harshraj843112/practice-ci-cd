pipeline {
    agent any
    triggers { githubPush() }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerHubCredentials')
        DOCKER_IMAGE = "20scse1010239/my-react-app"
        EC2_IP = "46.202.164.138"
        DOCKER_IMAGE_TAG = "${DOCKER_IMAGE}:${env.BUILD_NUMBER}"
        NODE_OPTIONS = '--max-old-space-size=2048'
        NPM_CACHE_DIR = "${env.WORKSPACE}/.npm-cache"
        GIT_CREDENTIALS_ID = 'github-credentials'
    }
    stages {
        stage('Checkout') { steps { git branch: 'main', url: 'https://github.com/Harshraj843112/practice-ci-cd.git', credentialsId: "${GIT_CREDENTIALS_ID}" } }
        stage('Setup Environment') { steps { sh '''#!/bin/bash
            rm -rf ${NPM_CACHE_DIR} node_modules package-lock.json build || true
            npm cache clean --force
            npm config set registry https://registry.npmjs.org/
            git config --global url."https://github.com/".insteadOf "ssh://git@github.com/"
            mkdir -p ${NPM_CACHE_DIR}
            chmod -R 777 ${NPM_CACHE_DIR}
        ''' } }
        stage('Build React App') { steps { sh '''#!/bin/bash
            set -e
            export npm_config_cache=${NPM_CACHE_DIR}
            npm install --registry https://registry.npmjs.org/ --no-audit --no-fund --omit=dev --verbose || { echo "npm install failed"; exit 1; }
            npm run build || { echo "npm run build failed"; exit 1; }
            ls -la
            if [ ! -d "build" ]; then echo "Error: build directory not found!"; exit 1; fi
        ''' } }
        stage('Build Docker Image') { steps { sh 'docker --version'; sh "docker build -t ${DOCKER_IMAGE_TAG} -t ${DOCKER_IMAGE}:latest ." } }
        stage('Push to DockerHub') { steps { withCredentials([usernamePassword(credentialsId: 'dockerHubCredentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) { sh '''
            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
            docker push "${DOCKER_IMAGE_TAG}"
            docker push "${DOCKER_IMAGE}:latest"
        ''' } } }
        stage('Deploy to EC2') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-credentials', keyFileVariable: 'SSH_KEY', usernameVariable: 'SSH_USER')]) {
                    sh """
                        echo "Deploying to EC2 as \$SSH_USER"
                        ssh -i "\$SSH_KEY" -o StrictHostKeyChecking=no "\${SSH_USER}@\${EC2_IP}" << EOF
                            set -e
                            if ! docker ps >/dev/null 2>&1; then sudo systemctl start docker; fi
                            docker stop my-react-app-temp || true
                            docker rm my-react-app-temp || true
                            docker pull ${DOCKER_IMAGE_TAG}
                            docker run -d --name my-react-app-temp -p 8000:80 ${DOCKER_IMAGE_TAG}
                            echo "Copying new build files to Nginx root..."
                            docker cp my-react-app-temp:/usr/share/nginx/html/. /usr/share/nginx/html/
                            sudo systemctl restart nginx
                            docker stop my-react-app-temp
                            docker rm my-react-app-temp
                            docker image prune -f
                            echo "Deployment completed successfully. Check http://${EC2_IP}"
EOF
                    """
                }
            }
        }
    }
    post {
        always { sh 'docker logout || true; docker system prune -f || true; rm -rf node_modules build ${NPM_CACHE_DIR} || true'; cleanWs() }
        success { echo "Build ${env.BUILD_NUMBER} deployed successfully to http://${EC2_IP}!" }
        failure { echo "Build ${env.BUILD_NUMBER} failed—check logs and resources!" }
    }
}
