pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerHubCredentials')
        DOCKER_IMAGE = "20scse1010239/my-react-app"
        EC2_IP = "54.163.150.233"
        DOCKER_IMAGE_TAG = "${DOCKER_IMAGE}:${env.BUILD_NUMBER}"
        NODE_OPTIONS = '--max-old-space-size=1024'  // Reduced for free tier (1 GB RAM)
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
                    set -e
                    rm -rf ${NPM_CACHE_DIR} node_modules package-lock.json build || true
                    npm cache clean --force  # Only if needed, or remove
                    npm config set registry https://registry.npmmirror.com/  # Faster mirror for free tier
                    git config --global url."https://github.com/".insteadOf "ssh://git@github.com/"
                    mkdir -p ${NPM_CACHE_DIR}
                    chmod -R 777 ${NPM_CACHE_DIR}

                    # Install Yarn if not already installed
                    if ! command -v yarn &> /dev/null; then
                        echo "Installing Yarn..."
                        curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
                        echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
                        sudo apt update
                        sudo apt install -y yarn
                    fi
                '''
            }
        }
        
        stage('Build React App') {
            steps {
                sh '''#!/bin/bash
                    set -e
                    export npm_config_cache=${NPM_CACHE_DIR}
                    yarn install --registry https://registry.npmmirror.com/ --no-audit --no-fund --frozen-lockfile || { echo "Yarn install failed"; exit 1; }
                    yarn build || { echo "Yarn build failed"; exit 1; }
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
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-credentials', 
                    keyFileVariable: 'SSH_KEY', 
                    usernameVariable: 'SSH_USER')]) {
                    sh """
                        echo "Deploying to EC2 as \$SSH_USER"
                        ssh -i "\$SSH_KEY" -o StrictHostKeyChecking=no "\${SSH_USER}@\${EC2_IP}" << EOF
                            set -e  # Exit on any error
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
                            echo "Running new container..."
                            docker run -d --name my-react-app -p 80:80 ${DOCKER_IMAGE_TAG} || { echo "Failed to run container"; exit 1; }
                            echo "Pruning unused images..."
                            docker image prune -f
                            echo "Deployment completed successfully"
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
