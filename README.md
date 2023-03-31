# cangaroo
This package provides a set of particle effects and animations based on pure javascript. You can use and edit them
as you like. However, please credit the author if you use this library for public/commercial projects. Donations are welcome,
too.

If you would like to contribute to this package, please get in contact with us.

# Build and Run Testing Environment (Docker)
This bundle comes with a Dockerfile to build a node.js Webserver as a test environment in one go.

In order to start the docker container, use this command from the cloned root directory of this repository: 

```docker run -p 3000:3000 -v $(pwd)/public:/app/public cangaroo```

Afterwards, you should be able to test this project in your web browser by calling http://localhost:3000

NOTE: By providing the -v Parameter, the `public`-Folder (containing scripts and styles) will be mounted into the Docker container instead of copying its contents. By doing so, you can edit the source files and all applied changes will immediately be present in the Docker environment.

By executing `docker exec -it <CONTAINER NAME>` you can log into the container.

```