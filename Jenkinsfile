pipeline {
  agent any

  environment {
    registry = "harbor.stl.vn/stl/topsim-test"
    registryCredential = 'harbor-registry-token'
    dockerImage = ''

    DOCKER_TAG = "${GIT_BRANCH.tokenize('/').pop()}-${BUILD_NUMBER}-${GIT_COMMIT.substring(0, 5)}"
    APP_NAME="${registry.tokenize('/').pop()}"
    ENV = "${(GIT_BRANCH.tokenize('/').pop() == 'master') ? 'prod' : 'dev'}"
    NAMESPACE="topsim"
  }

  stages {

    stage ('prepare') {
      steps {
        withCredentials([
          file(credentialsId: "topsim-test-${ENV}-env", variable: 'envFile')
        ]) {
          sh "chmod -R 777 \$(pwd)"
          sh "cp \$envFile \$(pwd)/.env"
        }
      }
    }

    stage('build') {
      steps {
        script {
          docker.withRegistry('https://' + registry, registryCredential) {
            dockerImage = docker.build(registry + ":$DOCKER_TAG")
          }
        }
      }
    }

    stage('push') {
      steps {
        script {
          docker.withRegistry('https://' + registry, registryCredential) {
            dockerImage.push()

            // Add latest tag if git branch is master
            if (GIT_BRANCH.tokenize('/').pop() == 'master') {
              dockerImage.push('latest')
            }
          }
        }
      }
    }

    stage('deploy') {
      steps {
        script {
          withCredentials([usernameColonPassword(credentialsId: 'global-github-account', variable: 'GIT_TOKEN')]) {
            env.GIT_COMMIT_MSG = sh (script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
            env.ARGOCD_FOLDER = GIT_BRANCH.tokenize('/').pop()

            sh '''
              git clone https://$GIT_TOKEN@github.com/DTH-DevOps/k8s-manifest.git $DOCKER_TAG
              cd $DOCKER_TAG
              sed -i "s+$registry:.*+$registry:$DOCKER_TAG+g" ./$ARGOCD_FOLDER/$NAMESPACE/$APP_NAME/deployment.yaml
              git config --global user.email "devops-bot@stl.vn"
              git config --global user.name "DTH DevOps Team"
              git add -A
              git commit -m "[BOT -> $APP_NAME:$DOCKER_TAG] $GIT_COMMIT_MSG"
              git push origin master
            '''
          }
        }
      }
    }
  }

  post {
    always {
      sh 'rm -rf $DOCKER_TAG'
    }
  }
}