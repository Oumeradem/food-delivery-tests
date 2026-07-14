pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Install Playwright') {
            steps {
                sh 'npx playwright install chromium'
            }
        }
        stage('Run E2E Tests') {
            steps {
                sh 'npm run test:reg'
            }
        }
    }
}
