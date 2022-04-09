FROM node:17 as build

ENV NODE_ENV production

WORKDIR /app

# Install node modules
COPY package.json .
COPY yarn.lock .
RUN yarn install --production

# Copy all source codes and build
COPY . .
RUN yarn build


FROM nginx as production

ENV NODE_ENV production

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Add nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
