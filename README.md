# Unmaintained
This repository is no longer maintained. Thank you for your interest.


# Web Application
Web Application built with node.js modules. This application uses the Express framework for backend.

This application can be run locally or with docker. 

#### Locally
```bash
$ npm start
```

#### With Docker
```bash
$ npm run-script docker-vm
```

A `.env` file must be created in the config directory before setting up a docker image. Using `npm run-script docker-vm` will automatically run `./src/init.js` beforehand to prompt values for the environment variables. Note that the docker image will always listen on port `8080`. This can be mapped to a different port by modifying the `docker-compose.yml` file.
