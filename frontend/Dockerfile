# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM node:lts AS development

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm ci
COPY . /code

ENV CI=true
ENV PORT=3000
ARG REACT_APP_GRAPHQL_URL
ENV REACT_APP_GRAPHQL_URL $REACT_APP_GRAPHQL_URL
ARG REACT_APP_APOLLO_CLIENT_CREDENTIALS
ENV REACT_APP_APOLLO_CLIENT_CREDENTIALS $REACT_APP_APOLLO_CLIENT_CREDENTIALS

CMD [ "npm", "start" ]

FROM development AS dev-envs
RUN <<EOF
apt-get update
apt-get install -y git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF

COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]

FROM development AS build

RUN ["npm", "run", "build"]

FROM nginx:1.13-alpine
COPY --from=build /code/.nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /code/build /usr/share/nginx/html
