pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    stages {
        stage("Init: Cleanup Environment and Run ESLint") {
            steps {
                echo "======== init ========"
                checkout([$class: 'GitSCM', 
                          branches: scm.branches,
                          doGenerateSubmoduleConfigurations: false,
                          extensions: [],
                          submoduleCfg: [],
                          userRemoteConfigs: [[credentialsId: 'wzgithub',
                                               url: 'git@github.com:wizeline/qa-buddy-program-alejandro-serrano.git']
                                               ]
                         ])
                sh 'npm i --verbose'
                sh 'npm run clean'
                sh 'npm run lint'
            }
        }
        stage("Quality Gate: SonarQube") {
            environment {
                scannerHome = tool 'sonar'
            }
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh "${scannerHome}/bin/sonar-scanner"
                }

                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage("Backend: Run Backend Tests") {
            steps {
                echo "======== backend-tests ========"
                sh "npm run backend"
            }
        }

        stage("Backend Test Results: Generate and Publish Backend Test Results") {
            steps {
                echo "======== backend-results ========"
                sh "npm run backend-gen-report"
                allure includeProperties: false, jdk: '', results: [[path: 'reports/backend/allure-results']]
            }
        }

        stage("Frontend: Run Frontend Tests") {
            steps {
                echo "======== frontend-tests ========"
                sh "npm run frontend-chrome-headless"
            }
        }

        stage("Frontend Test Results: Generate And Publish Frontend Test Results") {
            steps {
                echo "======== frontend-results ========"
                sh "npm run frontend-gen-report"
                allure includeProperties: false, jdk: '', results: [[path: 'reports/frontend/allure-results']]
            }
        }

        post {
            always {
                slackSend color: '#576675', message: "Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
            }
        }
    }
}