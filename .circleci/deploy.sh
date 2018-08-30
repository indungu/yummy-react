#!/usr/bin/env bash
ROOT_DIR=$(pwd)

source $ROOT_DIR/.circleci/setup_k8s.sh

# Create and activate service file
createAndActivateServiceKeyFile() {
    require 'SERVICE_KEY' $SERVICE_KEY

    echo $SERVICE_KEY | base64 --decode > $SERVICE_KEY_PATH
    gcloud auth activate-service-account --key-file $SERVICE_KEY_PATH
}

buildTagAndPushDockerImage() {
    require 'DOCKER_REGISTRY' $DOCKER_REGISTRY
    require 'PROJECT_ID' $PROJECT_ID
    require 'IMAGE_TAG' $IMAGE_TAG

    IMAGE_NAME="$DOCKER_REGISTRY/$PROJECT_ID/$PROJECT_NAME"
    TAGGED_NAME=$IMAGE_NAME:$IMAGE_TAG

    display_info "Build docker application image"
    docker build -t $TAGGED_NAME .
    is_success "Image successfully tagged $TAGGED_NAME"

    display_info "Login to $DOCKER_REGISTRY container registry"
    is_success_or_fail $(gcloud auth configure-docker)

    display_info "Push $TAGGED_NAME to $DOCKER_REGISTRY container registry"
    docker push $TAGGED_NAME
}

buildLintAndDeployK8sConfiguration(){
    display_info "Creating kubernetes deployment file"
    createDeploymentConfigFile
    createDeploymentFiles

    display_info "Linting generated configuration file"
    k8s-lint -f yummy.deployment.config
    is_success "Completed linting successfully"

    display_info "Initiating deployment for image $TAGGED_NAME to $ENVIRONMENT environment"
    setClusterContext
    kubectl apply -R -f deploy/
    is_success "$TAGGED_NAME successfully deployed"
}

main() {
    createAndActivateServiceKeyFile
    buildTagAndPushDockerImage
    buildLintAndDeployK8sConfiguration
}

$@