# Use Node.js 20
FROM node:20

# Set working directory
WORKDIR /server

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --force

RUN apt-get update && apt-get install -y curl

# Copy the rest of the application files
COPY . .

# Expose port
EXPOSE 5000

# Start the server
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate dev --name init && npm run dev"]
