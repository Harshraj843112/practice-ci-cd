pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerHubCredentials')
        DOCKER_IMAGE = "harshraj843112/my-react-app"
        EC2_IP = "98.81.253.133"  // Your EC2 IP
        DOCKER_IMAGE_TAG = "${DOCKER_IMAGE}:${env.BUILD_NUMBER}"
        NODE_OPTIONS = '--max-old-space-size=128'  // Low memory for t2.micro
        NPM_CACHE_DIR = "${env.WORKSPACE}/.npm-cache"  // Local npm cache
        GIT_CREDENTIALS_ID = 'github-credentials'  // GitHub credentials
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    // Use HTTPS with GitHub credentials
                    withCredentials([usernamePassword(credentialsId: env.GIT_CREDENTIALS_ID, 
                        usernameVariable: 'GIT_USERNAME', 
                        passwordVariable: 'GIT_PASSWORD')]) {
                        git branch: 'main', 
                            url: "https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/Harshraj843112/practice-ci-cd.git"
                    }
                }
            }
        }
        
        stage('Setup Environment') {
            steps {
                sh '''#!/bin/bash
                    # Ensure swap is active (2 GB)
                    if [ ! -f /swapfile ]; then
                        sudo fallocate -l 2G /swapfile || true
                        sudo chmod 600 /swapfile
                        sudo mkswap /swapfile
                        sudo swapon /swapfile
                        echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
                    fi
                    free -m  # Verify memory and swap
                    # Clean all npm and system caches
                    rm -rf ~/.npm ~/.cache ${NPM_CACHE_DIR} node_modules package-lock.json build || true
                    npm cache clean --force
                    mkdir -p ${NPM_CACHE_DIR}
                    df -h /  # Check disk space
                    node --version
                    npm --version
                '''
            }
        }
        
        stage('Build React App') {
            steps {
                script {
                    sh '''#!/bin/bash
                        # Set npm cache and memory limits
                        export npm_config_cache=${NPM_CACHE_DIR}
                        export NODE_OPTIONS=--max-old-space-size=128
                        
                        # Ensure clean slate
                        rm -rf node_modules package-lock.json build || true
                        npm cache clean --force
                        
                        # Install dependencies with HTTPS only
                        npm install --no-audit --no-fund --omit=dev --cache ${NPM_CACHE_DIR} --verbose || {
                            echo "NPM install failed, retrying with force..."
                            npm install --force --no-audit --no-fund --omit=dev --cache ${NPM_CACHE_DIR} --verbose
                        }
                        
                        # Ensure react-scripts is installed
                        if [ ! -f node_modules/react-scripts/package.json ]; then
                            echo "Installing react-scripts explicitly..."
                            npm install react-scripts@5.0.1 --no-audit --no-fund --omit=dev --cache ${NPM_CACHE_DIR} --verbose
                        fi
                        
                        # Build the React app
                        npm run build --production || {
                            echo "Build failed, reinstalling react-scripts and retrying..."
                            npm install react-scripts@5.0.1 --no-audit --no-fund --omit=dev --cache ${NPM_CACHE_DIR} --verbose
                            npm run build --production
                        }
                        
                        # Clean up
                        rm -rf node_modules || true
                    '''
                }
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
                    sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    sh "docker push ${DOCKER_IMAGE_TAG}"
                    sh "docker push ${DOCKER_IMAGE}:latest"
                }
            }
        }
        
        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['ec2-ssh-credentials']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} << 'EOF'
                            # Ensure Docker is running
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
