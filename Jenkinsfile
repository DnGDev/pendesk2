pipeline {
  agent any
  stages {
    stage('Dependencies') {
      steps {
        sh '''#!/bin/sh -e
node -v
npm -v
mono --version
wine --version
cp -R /var/lib/jenkins/workspace/PenDesk/node_modules /var/lib/jenkins/workspace/pendesk2_master-CXRXMLQ3ALNTFROZRMA3B3ZLXLHILCP4U3J6L6WE4ME35DMJQ7KA
cp /var/lib/jenkins/scripts/setvar.sh /var/lib/jenkins/workspace/pendesk2_master-CXRXMLQ3ALNTFROZRMA3B3ZLXLHILCP4U3J6L6WE4ME35DMJQ7KA'''
      }
    }
    stage('Build for Linux') {
      parallel {
        stage('Build for Linux') {
          steps {
            sh '''#!/bin/sh -e
. ./setvar.sh
electron-forge publish --platform=linux'''
          }
        }
        stage('Build for Windows') {
          steps {
            sh '''#!/bin/sh -e
. ./setvar.sh
electron-forge publish --platform=win32'''
          }
        }
      }
    }
  }
}