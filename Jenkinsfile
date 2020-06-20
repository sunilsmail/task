pipeline { 
    agent any 
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('Build') { 
            steps { 
               echo 'building success'
               nodejs('Node-12.14.1')
              sh 'npm install'
            }
        }
        stage('Test'){
            steps {
               echo 'testing success'
            }
        }
        stage('Deploy') {
            steps {
                echo 'deploy success'
            }
        }
    }
}
