# Use the official Node.js image as a base
FROM node:22.6.0-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Debugging: list contents of .next directory
RUN ls -la .next

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
