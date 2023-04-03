node{
      def image_name = "192.168.2.40:8888/syzeroblog/syzero-blog-admin:${BUILD_NUMBER}"
      def k8s_auth = "672f2571-a179-4452-b9b0-6b8f10dc4da4"
      def git_auth = "5994db74-0fa3-4c71-8c90-03e7b9f2941f"
      def docker_auth = "6ae52668-f044-49e5-b866-ee31f1d80c9c"
      // 第一步
      stage('拉取代码'){
        git branch: 'master', credentialsId: "${git_auth}", url: 'https://gitee.com/syzero/syzero-blog-admin.git'
      }
      // 第二步
      stage('代码编译'){
          nodejs('NodeJS12.9.1') {
            sh """
              cd src
              npm install --registry=https://registry.npm.taobao.org
              rm -rf dist/*
              npm run build
            """
          }
      }
      // 第三步
      stage('构建镜像'){
        withCredentials([usernamePassword(credentialsId: "${docker_auth}", passwordVariable: 'docker_pwd', usernameVariable: 'docker_name')]) {
          sh """
              cd src
              docker build -t ${image_name} .
              docker login -u ${docker_name} -p '${docker_pwd}' 192.168.2.40:8888
              docker push ${image_name}
          """ 
        }
      }
       // 第四步
      stage('部署到K8S平台'){
        sh """
          sed -i 's#\$IMAGE_NAME#${image_name}#' src/syzero-blog-admin.yaml
        """
        kubernetesDeploy configs: 'src/syzero-blog-admin.yaml', kubeConfig: [path: ''], kubeconfigId: "${k8s_auth}", secretName: '', ssh: [sshCredentialsId: '*', sshServer: ''], textCredentials: [certificateAuthorityData: '', clientCertificateData: '', clientKeyData: '', serverUrl: 'https://']
      }
}

