# Starter Kit

## Requirements

1.  Install [Node >= 10](https://nodejs.org/en/download/)
    (ideally install the latest LTS, currently Node 10).

## Setup development environment

### Install project dependencies

```bash
# Go to project folder
cd /project/path

# Install project dependencies
npm install
```

### Set environment variables

The environment variables in `.env` file are set
before launching the server (see below to launch the server).

```bash
# Copy the sample file (DBAA: don't do this if you already have a .env file)
cp .env.sample .env
```

Then replace the environment variables:

| Variable name                                | Prefixed | Description                                                                     | Default value |
| -------------------------------------------- | -------- | --------------------------------------------------------------------------------| ------------- |
| ENV_TEST_VARIABLE                            |          | Path to the JSON key for GCP Authentifications                                  |               |

## Run development environment

```bash
# Launch webpack to watch all bundles
# and start the server / worker and repository subscriber with live reloading
npm run start
```

## Install and run production

### Install

```bash
# Go to the bundle folder (e.g.: ./.dist)
cd /project/path

# Install production dependencies
npm install --production
```

### Setup environment

You need to setup the production environment before launching the server.
You can either:
-   Set the machine environment. This is particularly useful with Docker
    where you can just run the container with the correct environment.

-   Create a .env file in the folder. Use the [guide](#set-environment-variables).

### Run

```bash
npm start
```
