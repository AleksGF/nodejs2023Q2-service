ARG IMAGE=node:20-alpine

FROM $IMAGE as builder
WORKDIR /app
COPY package*.json .
RUN npm install

FROM builder as nodejs2024_app
COPY . .
CMD [""]
