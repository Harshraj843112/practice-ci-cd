pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerHubCredentials')
        DOCKER_IMAGE = "harshraj843112/my-react-app"
        EC2_IP = "34.233.123.50"  // Replace with your actual EC2 IP
        DOCKER_IMAGE_TAG = "${DOCKER_IMAGE}:${env.BUILD_NUMBER}"
        NODE_OPTIONS = '--max-old-space-size=1024'  // Limit Node memory
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                    credentialsId: 'github-credentials',
                    url: 'https://github.com/Harshraj843112/practice-ci-cd.git'
            }
        }
        
        stage('Setup Environment') {
            steps {
                script {
                    // Explicitly use bash to avoid sh compatibility issues
                    sh '''#!/bin/bash
                        # Check if Node.js is installed
                        if ! command -v node >/dev/null 2>&1; then
                            echo "Installing Node.js..."
                            curl -fsSL https://deb.nodesource.com/setup_18.x -o nodesetup.sh
                            # Use echo to pipe password to sudo -S
                            echo "jenkins" | sudo -S bash nodesetup.sh
                            sudo apt-get install -y nodejs
                            rm nodesetup.sh
                        else
                            echo "Node.js already installed"
                        fi
                        node --version
                        npm --version
                        # Add swap space if not present
                        if [ ! -f /swapfile ]; then
                            echo "Adding swap space..."
                            sudo fallocate -l 2G /swapfile
                            sudo chmod 600 /swapfile
                            sudo mkswap /swapfile
                            sudo swapon /swapfile
                            echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
                        fi
                        free -m
                    '''
                }
            }
        }
        
        stage('Build React App') {
            steps {
                script {
                    sh '''#!/bin/bash
                        rm -rf node_modules package-lock.json || true
                        npm cache clean --force
                        npm install --verbose > npm_install.log 2>&1
                        npm run build --verbose > npm_build.log 2>&1 || { 
                            echo "Build failed, dumping logs..."
                            cat npm_build.log
                            exit 1
                        }
                    '''
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker --version'
                    sh "docker build -t ${DOCKER_IMAGE_TAG} -t ${DOCKER_IMAGE}:latest ."
                }
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
                        ssh -o StrictHostKeyChecking=no ec2-user@${EC2_IP} << 'EOF'
                            if ! command -v docker >/dev/null 2>&1; then
                                sudo apt update
                                sudo apt install -y docker.io
                                sudo systemctl start docker
                                sudo usermod -aG docker ec2-user
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
            sh 'docker logout || true'
            cleanWs()
            archiveArtifacts artifacts: '*.log', allowEmptyArchive: true
        }
        success {
            echo "Build ${env.BUILD_NUMBER} deployed successfully!"
        }
        failure {
            echo "Build ${env.BUILD_NUMBER} failed!"
        }
    }
}
