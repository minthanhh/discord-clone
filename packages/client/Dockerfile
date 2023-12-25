FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine AS production

WORKDIR /usr/share/nginx/html

COPY --from=development /usr/src/app/build /usr/share/nginx/html 
COPY nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]