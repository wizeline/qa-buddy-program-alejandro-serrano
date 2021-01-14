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
                publishHTML([allowMissing: false, 
                             alwaysLinkToLastBuild: true,
                             keepAll: true,
                             reportDir: 'reports/eslint',
                             reportFiles: 'eslint.html',
                             reportName: 'ESLint Report',
                             reportTitles: 'ESLint Report'])
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
                allure commandline: 'allure', includeProperties: false, jdk: '', report: 'reports/backend/allure-report', results: [[path: 'reports/backend/allure-results']]
            }
        }

        stage("Frontend: Run Frontend Tests") {
            environment {
                TODOIST_CREDS = credentials('todoist-credentials')
                TODOIST_USER = "$TODOIST_CREDS_USR"
                TODOIST_PASSWORD = "$TODOIST_CREDS_PSW"
            }
            steps {
                catchError(stageResult: 'FAILURE', buildResult: 'SUCCESS') {
                    echo "======== frontend-tests ========"
                    sh "npm run frontend-chrome-headless"
                }
            }
        }

        stage("Frontend Test Results: Generate And Publish Frontend Test Results") {
            steps {
                echo "======== frontend-results ========"
                sh "npm run frontend-gen-report"
                allure commandline: 'allure-frontend', includeProperties: false, jdk: '', report: 'reports/frontend/allure-report', results: [[path: 'reports/frontend/allure-results']]
            }
        }
    }

    post {
        success {
            slackSend color: '#1ABC9C', message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
        }

        unstable {
            slackSend color: '#5D6D7E', message: "UNSTABLE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
        }

        failure {
            slackSend color: '#CD5C5C', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
        }
    }
}