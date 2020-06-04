FROM node:12.6-buster-slim

RUN npm install handshake-org/hsd

CMD [ "hsd", "--network=simnet", "--prefix=/data"]
