# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy only the package.json and package-lock.json first
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Run the server 
CMD ["npm", "start"]