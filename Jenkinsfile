pipeline {
    agent any
    stages {
        stage("init") {
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
        stage("sonarqube") {
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

        stage("backend-tests") {
            steps {
                echo "======== backend-tests ========"
                sh "npm run backend"
            }
        }

        stage("generate-and-publish-backend-results") {
            steps {
                echo "======== backend-results ========"
                sh "npm run backend-gen-report"
                sh "npm run backend-publish-report"
            }
        }

        stage("frontend-tests") {
            steps {
                echo "======== frontend-tests ========"
                sh "npm run frontend-chrome-headless"
            }
        }

        stage("generate-and-publish-frontend-results") {
            steps {
                echo "======== frontend-results ========"
                sh "npm run backend-gen-report"
                sh "npm run backend-publish-report"
            }
        }

        stage("build-notification") {
            steps {
                slackSend color: '#576675', message: "Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
            }
        }
    }
}