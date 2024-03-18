# Home Library Service

## Downloading

```
git clone https://github.com/AleksGF/nodejs2023Q2-service.git
```

## Environment variables

Add to the root `.env` file with content:
```
PORT=4000
CRYPT_SALT=10
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/postgres"
```

## Starting Docker engine

[https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

```
docker-compose up
```

## Vulnerabilities scanning

```
npm run scan
```

## Docker image

[App Image](https://hub.docker.com/repository/docker/aleksgf/nodejs2024_app/general)

## Installing NPM modules

```
npm run install
```

## Running application

```
npm run start
```

## Port

By default, app starts on port 4000. You can specify another port number by adding it in `.env` file in project and changing port in `docker-compose.yml`.

## Testing

To run all tests without authorization:
1. Start application
2. Open new terminal and enter:

```
npm run test
```
