# Use an official Node runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN pnpm prisma generate

# Build the application
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "run", "start:prod"]