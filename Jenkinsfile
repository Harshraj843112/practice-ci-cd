pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerHubCredentials')
        DOCKER_IMAGE = "harshraj843112/my-react-app"
        EC2_IP = "98.81.253.133"
        DOCKER_IMAGE_TAG = "${DOCKER_IMAGE}:${env.BUILD_NUMBER}"
        NODE_OPTIONS = '--max-old-space-size=128'
        NPM_CACHE_DIR = "${env.WORKSPACE}/.npm-cache"
        GIT_CREDENTIALS_ID = 'github-credentials'
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
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
                    if [ ! -f /swapfile ]; then
                        sudo fallocate -l 2G /swapfile || true
                        sudo chmod 600 /swapfile
                        sudo mkswap /swapfile
                        sudo swapon /swapfile
                        echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
                    fi
                    free -m
                    rm -rf ~/.npm ~/.cache "${NPM_CACHE_DIR}" node_modules package-lock.json build .npmrc || true
                    npm cache clean --force
                    mkdir -p "${NPM_CACHE_DIR}"
                    npm config set registry https://registry.npmjs.org/
                    npm config set fetch-retries 5
                    npm config list
                    df -h /
                    node --version
                    npm --version
                '''
            }
        }
        
        stage('Build React App') {
            steps {
                script {
                    sh '''#!/bin/bash
                        set -e  # Exit on any error
                        export NODE_OPTIONS=--max-old-space-size=128
                        
                        # Clean slate
                        rm -rf node_modules package-lock.json build || true
                        npm cache clean --force
                        
                        # Debug: Verify environment
                        echo "Current directory: $(pwd)"
                        echo "Listing files before install:"
                        ls -la
                        echo "Contents of package.json:"
                        cat package.json || echo "package.json not found!"
                        
                        # Install dependencies with proper quoting
                        npm install --no-audit --no-fund --omit=dev --cache "${NPM_CACHE_DIR}" --verbose
                        
                        # Verify react-scripts
                        echo "Checking react-scripts installation:"
                        ls -la node_modules/react-scripts 2>/dev/null || echo "react-scripts not installed!"
                        if [ ! -f node_modules/react-scripts/bin/react-scripts.js ]; then
                            echo "react-scripts binary not found, installing explicitly..."
                            npm install react-scripts@5.0.1 --no-audit --no-fund --omit=dev --cache "${NPM_CACHE_DIR}" --verbose
                        fi
                        
                        # Build the app
                        echo "Running npm run build..."
                        npm run build
                        
                        # Verify build output
                        echo "Checking build directory:"
                        if [ ! -d build ]; then
                            echo "ERROR: Build directory not created!"
                            ls -la
                            exit 1
                        else
                            echo "Build directory created successfully:"
                            ls -la build
                        fi
                        
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
                rm -rf node_modules build "${NPM_CACHE_DIR}" || true
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
