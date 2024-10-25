# Step 1: Use the official Node.js image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the application code
COPY . .

# Step 5: Expose the Next.js port (3000)
EXPOSE 3000

# Step 6: Start the application
CMD ["npm", "run", "dev"]
