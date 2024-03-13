# Home Library Service

## Downloading

```
git clone https://github.com/AleksGF/nodejs2023Q2-service.git
```

## Installing NPM modules

```
npm run install
```

## Running application

```
npm run start
```

## Port

By default, app starts on port 4000. You can specify another port number by adding it in `.env` file in project.

## Testing

To run all tests without authorization:
1. Start application
2. Open new terminal and enter:

```
npm run test:noauth
```

You can also start all tests (without token refresh tests). Because of auth is not implemented yet, test of auth will have fail result.

```
npm run test
```
