pipeline { 
    agent any 
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('Build') { 
            steps { 
               echo 'building success'
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
