pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerHubCredentials')
        DOCKER_IMAGE = "harshraj843112/my-react-app"
        EC2_IP = "34.233.123.50"  // Replace with your actual EC2 IP if different
        DOCKER_IMAGE_TAG = "${DOCKER_IMAGE}:${env.BUILD_NUMBER}"
        NODE_OPTIONS = '--max-old-space-size=1024'  // Limit Node memory usage
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
                    // Ensure Node.js is installed and add swap space if needed
                    sh '''
                        if ! command -v node &> /dev/null; then
                            curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                            sudo apt-get install -y nodejs
                        fi
                        node --version
                        npm --version
                        # Add 2GB swap if not present
                        if [ ! -f /swapfile ]; then
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
                    // Install dependencies and build with verbose output
                    sh 'rm -rf node_modules package-lock.json || true'
                    sh 'npm cache clean --force'
                    sh 'npm install --verbose > npm_install.log 2>&1'
                    sh 'npm run build --verbose > npm_build.log 2>&1'
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
                            if ! command -v docker &> /dev/null; then
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
            archiveArtifacts artifacts: '*.log', allowEmptyArchive: true  // Save logs for debugging
        }
        success {
            echo "Build ${env.BUILD_NUMBER} deployed successfully!"
        }
        failure {
            echo "Build ${env.BUILD_NUMBER} failed!"
        }
    }
}
