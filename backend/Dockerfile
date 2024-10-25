# Step 1: Use the official Node.js image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the backend port (3000)
EXPOSE 3000

# Step 7: Start the application
CMD ["npm", "start"]
