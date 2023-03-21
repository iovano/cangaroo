# cangaroo
Collection of Frontend Elements

# Build and Run Testing Environment (Docker)
This bundle comes with a Dockerfile to build an apache2 webserver as a test environment in one go.

In order to start the docker container, use this command from the cloned root directory of this repository: 

```docker run -d -p 80:80 -v $(pwd):/var/www/html cangaroo```

Afterwards, you should be able to test this project in your web browser by calling http://localhost
