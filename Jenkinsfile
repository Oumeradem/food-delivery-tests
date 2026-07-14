pipeline {
    agent any
    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:${env.PATH}"
    }
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
    post {
        always {
            // Generate Cucumber HTML report after every run
            cucumber buildStatus: 'UNSTABLE',
                     reportTitle: 'Tomato App E2E Test Report',
                     fileIncludePattern: '**/cucumber-report.json',
                     trendsLimit: 10
        }
    }
}
