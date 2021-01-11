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
            step {
                def sonarqubeScannerHome = tool name: 'sonar', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                withCredentials([string(credentialsId: 'sonar', variable: 'sonarLogin')]) {
                    sh "${sonarqubeScannerHome}/bin/sonar-scanner -e -Dsonar.host.url=http://sonarqube:9000 -Dsonar.login=${sonarLogin}"
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