# Use Node.js 20
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port
EXPOSE 3000

# Start the frontend application
CMD ["npm", "start"]
