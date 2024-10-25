# Use the official PostgreSQL image from Docker Hub
FROM postgres:15

# Set environment variables for database configuration
ENV POSTGRES_PASSWORD=2112004VSP37 
ENV POSTGRES_USER=user1  
ENV POSTGRES_DB=balanceproDB              

# Expose PostgreSQL port 5432 to the outside
EXPOSE 5432

# Use CMD to start the PostgreSQL server when the container is run
CMD ["postgres"]

# Building the image 
#❯ docker build -t my_postgres .

# Command to run the container
#❯ docker run -d \
# --name my_postgres_container \
#-v $(pwd)/pgdata:/var/lib/postgresql/data \
#-e POSTGRES_PASSWORD=2112004VSP37 \
  #-e POSTGRES_USER=user1 \
  #-e POSTGRES_DB=balanceproDB \
  #-p 5432:5432 \
  #my_postgres

#reconnect to the container






