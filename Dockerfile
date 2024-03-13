ARG IMAGE=node:lts-alpine

FROM $IMAGE as builder
WORKDIR /app
COPY . .
RUN npm i

FROM builder as dev
CMD [""]
