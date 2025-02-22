pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerHubCredentials')
        DOCKER_IMAGE = "harshraj843112/my-react-app"
        EC2_IP = "3.95.156.64"  // Deployment target
        DOCKER_IMAGE_TAG = "${DOCKER_IMAGE}:${env.BUILD_NUMBER}"
        NODE_OPTIONS = '--max-old-space-size=128'
        NPM_CACHE_DIR = "${env.WORKSPACE}/.npm-cache"
        GIT_CREDENTIALS_ID = 'github-credentials'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/Harshraj843112/practice-ci-cd.git', 
                    credentialsId: 'github-credentials'
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
                    export npm_config_cache=${NPM_CACHE_DIR}
                    export NODE_OPTIONS=--max-old-space-size=128
                    npm install --registry https://registry.npmjs.org/ --no-audit --no-fund --omit=dev --verbose
                    npm run build
                    ls -la  # Verify build directory exists
                '''
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker --version'
                sh "docker build -t ${DOCKER_IMAGE_TAG} -t ${DOCKER_IMAGE}:latest ."
            }
        }
        
        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerHubCredentials', 
                    usernameVariable: 'DOCKER_USERNAME', 
                    passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh '''
                        echo "Using DockerHub username: $DOCKER_USERNAME"
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                        docker push "${DOCKER_IMAGE_TAG}"
                        docker push "${DOCKER_IMAGE}:latest"
                    '''
                }
            }
        }
        
        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-credentials']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} << 'EOF'
                            if ! docker ps >/dev/null 2>&1; then
                                sudo systemctl start docker || true
                            fi
                            docker stop my-react-app || true
                            docker rm my-react-app || true
                            docker pull ${DOCKER_IMAGE_TAG}
                            docker run -d --name my-react-app -p 80:80 ${DOCKER_IMAGE_TAG}
                            docker image prune -f
                        EOF
                    """
                }
            }
        }
    }
    
    post {
        always {
            sh '''
                docker logout || true
                docker system prune -f || true
                rm -rf node_modules build ${NPM_CACHE_DIR} || true
            '''
            cleanWs()
        }
        success {
            echo "Build ${env.BUILD_NUMBER} deployed successfully!"
        }
        failure {
            echo "Build ${env.BUILD_NUMBER} failed—check logs and resources!"
        }
    }
}
