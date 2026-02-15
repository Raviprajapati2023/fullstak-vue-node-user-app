# --- Stage 1: Build the app ---
FROM node:24-alpine as build-stage

# Install the Quasar CLI globally
RUN npm install -g @quasar/cli

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code and build the project
COPY . .
RUN quasar build

# --- Stage 2: Serve the app with Nginx ---
FROM nginx:stable-alpine as production-stage

# Copy the build output from the first stage to Nginx
# Note: Quasar builds to /dist/spa by default for web apps
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]