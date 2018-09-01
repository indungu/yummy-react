# How containers are used to deploy Yummy-React to GKE
To package and deploy your application on Kubernetes Engine, we did the following:

1. Packaged our app into a Docker image
2. Ran the container locally to ensure all was well
3. Created a container cluster
4. Created a CI image for the CI-CD pipeline
5. Created a CI-CD pipeline that uses the above image
6. Deployed our app to the cluster
7. Exposed our app to the Internet
8. Concluded the setup

We shall go through this one after the other as we shed more light on what exactly was done under each phase.

> If you intend to follow though but have no prior knowledge of deploying containerised applications to the Google Kubernetes Engine, I'd kindly suggest you go through their [official tutorial](https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app) first. If you have dabbled in the art of container orchestration and management, or just like living on the edge, let's continue.

### Packaging the Application
In the root of this repository you will find the Dockerfile responsible for the creation of the image we run in our containers.

To set it up, just clone the repo, ensure you have Docker installed in your computer and run

    docker build -t <dockerhub_username>/<app_name>:<tag_of_choice> .

After replacing the placeholder values with those of your choosing, you can build the app image as we did.

### Running the Application in a container locally
Well we are the pessimistic type and we did not want to leave anything to chance as far as the integrity of our image is concerned.

    docker inspect <your_dockerhub_username>/<image_name>:<your_tag_of_choice> 

This dumps some json content to standard output. You want to check the `containerConfig` and the `Config` sections ensuring the `WorkingDir` value is the same for both. The other key point of interest should be the `Cmd` sub-section whose value should be an array. The `containerConfig` `Cmd` array will have `"CMD [\"yarn\" \"run\" \"start\"]"` as the last element of the array while the `config` `Cmd` array will just be the entries in the `CMD` section of the `Dockerfile`. If this is the case then the image did build successfully and the container will launch properly.

We used a command much similar to this one to run it locally.

    docker run -p 3000:3000 <dockerhub_username>/<app_name>:<tag_of_choice>

You could also run the container in `detached` mode using the following command. This will just dump the ID of the running container ro standard output but the application will be accessible since it's running in the background

    docker run -p 3000:3000 -d <dockerhub_username>/<app_name>:<tag_of_choice>

The result was a running container that could be accessed over the browser on http://localhost:3000

> If the above command errors with the error shown below, then the port 3000 is currently being used by another app or process, just change the first `3000` in the `-p 3000:3000` port binding section to an available port, say `3001`. To access the app use your new port number in the URL, in the case of port `3001` the url should now be http://localhost:3001.
![port error](https://user-images.githubusercontent.com/30072633/45213387-11ec2400-b2a0-11e8-9d28-c71fe409baf1.png)


### Creating the cluster
Following the [Before you begin](https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app#before-you-begin) section of the resource recommended above. We set up a cluster on our Gcloud Project.

### Creating a CI image for CI/CD pipeline
As you maybe wondering - if you are not let's just assume you were - we opted to create out own image bootstrapped with some tools that are key to the success of our CI/CD pipeline. For a better understanding of why and how we achieved this, head on over to the [You are using a custom CI image... How? Why?](https://github.com/indungu/yummy-react/wiki/Continuous-Integration-and-Delivery-through-CircleCI-with-Docker-and-Kubernetes#you-are-using-a-custom-ci-image-how-why) section of the project wiki page on the whole containerisation endeavour.

### Creating a CI-CD pipeline that uses the above image
If you the above explanation got you to read further down the Wiki, you might have read the section explaining the CI/CD pipeline setup. But if you're lazy as some people we know, head on over there and get your [scoop of ice cream with the cherry on top](https://github.com/indungu/yummy-react/wiki/Continuous-Integration-and-Delivery-through-CircleCI-with-Docker-and-Kubernetes#yaay-ice-cream-but-first-awesowe-as-the-scripts-may-be-how-will-we-get-circeci-to-bring-it-all-together-how-is-our-cicd-pipeline-going-to-look-like). Don't be gone too long though, we just got to the good part.

### Deploying our app to the cluster
**PS** Incase it's not so evident, the app is actually deployed to the cluster when the `yummy-react.deployment.yml` file is applied by `kubectl` on the cluster.
If the word play is getting a bit much, my apologies. Head on to the [Okay... Makes sense. So how does the deployment happen?](https://github.com/indungu/yummy-react/wiki/Continuous-Integration-and-Delivery-through-CircleCI-with-Docker-and-Kubernetes#okay-makes-sense-so-how-does-the-deployment-happen) section of the wiki for a description on how this happens. 

> Be sure to not how we use the [gcloud sdk](https://cloud.google.com/sdk/gcloud/), [ReactiveOps Scripts](https://github.com/reactiveops/rok8s-scripts), [Docker](https://docs.docker.com/install/) and the [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) tool to orchestrate a deployment to the cluster we created.

### Exposing our app to the Internet
**PS** Incase it's not so evident, the app is actually deployed to the cluster when the `yummy-react.service.yml` file is applied by `kubectl` on the cluster.
The same section above does go into slightly more details on where exactly in the deployment script this happens though it does so implicitly since the same command that deploys the app to the pod on the cluster creates a service of type `loadbalancer` to serve the application over http. In so doing the appication (after a few domain mappings that go beyond the scope of this document) is now accessible over this address http://app.yummy-react.indungu.ml.

### Conclusion
The journey was a tough one seeing us we had never really done this before, not successfully at least. But what we learnt we invaluable and we hope this breakdown helped you get your feet wet with deploying containerised application to a kubernetes engine.

Your suggestion, questions, comments and especially corrections for the typos I may have missed are most welcome. Just fork and PR all of them, your input is highly appreciated. Until next time, **_LIVE LONG AND PROSPER!_**

> PS: A place to start contribution-wise is improving this document by making the Table Of Contents part at the beginning have links that point to the actual breakdown of the work done. Thanks.
