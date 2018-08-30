#!/usr/bin/env bash
ROOT_DIR=$(pwd)

source $ROOT_DIR/.circleci/base.sh

createDeploymentConfigFile() {
    cat <<EOF > yummy.deployment.config 
# Configuration for https://github.com/reactiveops/rok8s-scripts

# External registry domain
EXTERNAL_REGISTRY_BASE_DOMAIN="$DOCKER_REGISTRY/$PROJECT_ID"

# Name of repository/project
REPOSITORY_NAME="$PROJECT_NAME"

# Docker tag that will be created
# Defaults to concatenation of your external registry + repository name, i.e.:
# DOCKERTAG=quay.io/example-org/example-app
DOCKERTAG="$IMAGE_NAME"

# Namespace to work in
NAMESPACE="$NAMESPACE"

EOF
}

# create deployment file
createDeploymentFiles() {
    mkdir -p deploy
    display_info "Creating the deployment.yml file"
    cat <<EOF > deploy/yummy-react.deployment.yml 
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: $PROJECT_NAME
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: $PROJECT_NAME
    spec:
      containers:
        - name: $PROJECT_NAME
          image: $TAGGED_NAME
          ports:
            - containerPort: 3000
EOF
    display_info "Creating the service.yml file"
    cat <<EOF > deploy/yummy-react.service.yml 
apiVersion: v1
kind: Service
metadata:
  name: $PROJECT_NAME
  labels:
    app: $PROJECT_NAME
spec:
  type: LoadBalancer
  externalTrafficPolicy: Cluster
  ports:
    - port: 80
      targetPort: 3000
  selector:
    app: $PROJECT_NAME

EOF
}

setClusterContext() {
    display_info "Setting cluster context"
    gcloud --quiet config set project ${PROJECT_ID}
    gcloud --quiet config set compute/zone ${COMPUTE_ZONE}
    gcloud --quiet container clusters get-credentials ${CLUSTER_NAME}
}
