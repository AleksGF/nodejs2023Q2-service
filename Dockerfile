ARG IMAGE=node:20.11.0-alpine

FROM $IMAGE as builder
WORKDIR /app
COPY . .
RUN npm install

FROM builder as dev
CMD [""]
