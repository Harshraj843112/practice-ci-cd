pipeline {
    agent any // Consider specifying a lightweight agent if running on EC2
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerHubCredentials')
        DOCKER_IMAGE = "20scse1010239/my-react-app"
        EC2_IP = "3.95.156.64"
        DOCKER_IMAGE_TAG = "${DOCKER_IMAGE}:${env.BUILD_NUMBER}"
        NODE_OPTIONS = '--max-old-space-size=1024' // Reduced from 2048 for free tier
        NPM_CACHE_DIR = "${env.WORKSPACE}/.npm-cache"
        GIT_CREDENTIALS_ID = 'github-credentials'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/Harshraj843112/practice-ci-cd.git', 
                    credentialsId: "${GIT_CREDENTIALS_ID}"
            }
        }
        
        stage('Setup Environment') {
            steps {
                sh '''#!/bin/bash
                    rm -rf ${NPM_CACHE_DIR} node_modules package-lock.json build || true
                    npm cache clean --force
                    npm config set registry https://registry.npmjs.org/
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
                    npm install --production --registry https://registry.npmjs.org/ --no-audit --no-fund --verbose || { echo "npm install failed"; exit 1; }
                    npm run build || { echo "npm run build failed"; exit 1; }
                    if [ ! -d "build" ]; then
                        echo "Error: build directory not found!"
                        exit 1
                    fi
                '''
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker --version'
                sh "docker build --no-cache -t ${DOCKER_IMAGE_TAG} -t ${DOCKER_IMAGE}:latest ."
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
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-credentials', 
                    keyFileVariable: 'SSH_KEY', 
                    usernameVariable: 'SSH_USER')]) {
                    sh """
                        echo "Deploying to EC2 as \$SSH_USER"
                        ssh -i "\$SSH_KEY" -o StrictHostKeyChecking=no "\${SSH_USER}@\${EC2_IP}" << 'EOF'
                            set -e
                            echo "Checking Docker service..."
                            if ! docker ps >/dev/null 2>&1; then
                                echo "Starting Docker..."
                                sudo systemctl start docker || { echo "Failed to start Docker"; exit 1; }
                            fi
                            echo "Stopping and removing existing container..."
                            docker stop my-react-app || true
                            docker rm my-react-app || true
                            echo "Pulling Docker image ${DOCKER_IMAGE_TAG}..."
                            docker pull ${DOCKER_IMAGE_TAG} || { echo "Failed to pull image"; exit 1; }
                            echo "Running new container with resource limits..."
                            docker run -d --name my-react-app -p 80:80 --memory="512m" --cpus="0.5" ${DOCKER_IMAGE_TAG} || { echo "Failed to run container"; exit 1; }
                            echo "Pruning unused images..."
                            docker image prune -f
                            echo "Deployment completed successfully"
                            docker ps -a
                            docker logs my-react-app
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
