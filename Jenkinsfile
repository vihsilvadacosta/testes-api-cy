pipeline {
    agent any

    stages {
        stage('Clonar repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/vihsilvadacosta/testes-api-cy.git'
            }
        }
    }
    stages {
        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }
    }
    stages {
        stage('Executar os testes') {
            steps {
                sh 'npm cy:run'
            }
        }
    }
}
