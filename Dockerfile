# Stage 1: Build the React app
FROM node:18-alpine AS build
WORKDIR /app

# Leverage caching by installing dependencies first
COPY package.json package-lock.json ./
RUN npm install --ignore-scripts

# Copy the rest of the application code and build for production
# COPY . ./
COPY src/ ./src
COPY public/ ./public
RUN npm run build

# Stage 2: Development environment
FROM node:18-alpine AS development
WORKDIR /app

RUN apk add --no-cache git \
    && git config --global user.name "Ng Min Yuan Jocelyn" \
    && git config --global user.email "2301930@SIT.singaporetech.edu.sg"

# Install dependencies again for development
COPY package.json package-lock.json ./
RUN npm install --ignore-scripts

# Copy the full source code
# COPY . ./
COPY src/ ./src
COPY public/ ./public

# Expose port for the development server
EXPOSE 3000
# CMD ["npm", "start"]
CMD ["sh", "-c", "npm install && npm start"]

# Stage 3: Production environment
FROM nginx:alpine AS production

# Create non-root user
RUN adduser -D myuser

# Copy the production build artifacts from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Change ownership
RUN chown -R myuser:myuser /usr/share/nginx/html

# Switch to non-root user
USER myuser

# Expose the default NGINX port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
