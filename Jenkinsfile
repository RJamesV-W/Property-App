pipeline {
    agent any
   
    stages {
        stage('Build Spring backend') {
            steps {
                dir('property_api') {
                    script {
                        bat 'mvn clean install'
                    }
                }
            }
        }
        
        stage('Build React frontend') {
            environment{CI=false}
            steps {
                dir('property-site') {
                    script {
                        bat 'npm install'
                        bat 'npm run build'
                    }
                }
            }
        }

        stage('Save Artifacts') {
            steps {
                script {
                    archiveArtifacts artifacts: 'property_api/target/*.jar, property-site/build/*'
                }
            }
        }
    }
    post {
        always {
            mail to: 'jamesvaughanwilliams@gmail.com',
            subject: "Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
            body: "Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL}) finished"
        }
    }
}
