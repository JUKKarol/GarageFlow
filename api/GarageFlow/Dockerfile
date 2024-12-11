# Set the base image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env

# Set the working directory
WORKDIR /src

# Copy and restore dependencies
COPY api/GarageFlow/*.csproj ./api/GarageFlow/
WORKDIR /src/api/GarageFlow
RUN dotnet restore

# Copy the entire project and build
COPY api/GarageFlow/ ./ 
RUN dotnet publish -c Release -o /app

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Set the working directory
WORKDIR /app

# Copy build artifacts
COPY --from=build-env /app .

# Set environment variables
ENV ASPNETCORE_ENVIRONMENT=Production

# Set the entry point for the container
ENTRYPOINT ["dotnet", "GarageFlow.dll"]
