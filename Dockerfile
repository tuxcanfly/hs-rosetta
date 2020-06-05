FROM handshakeorg/hsd:latest AS base

RUN apk add --no-cache make gcc g++ git

WORKDIR /opt/hs-rosetta
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm link

WORKDIR /code
RUN npm link hs-rosetta

CMD [ "hsd", "--plugins", "hs-rosetta", "--index-tx", "--index-address", "--prefix=/data"]
