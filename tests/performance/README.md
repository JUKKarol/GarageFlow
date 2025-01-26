
# PerformanceTestNBOMBER

Performance test for API using .NET 8 NBOMBER

## Get Started

### Environment Requirements:

1. Clone the repository:
    ```
    git clone https://github.com/JUKKarol/GarageFlow.git
    ```

2. Install .NET 8 from:
    ```
    https://dotnet.microsoft.com/en-us/download/dotnet/8.0
    ```
## Appsettings.json
Before run you have to set variables at  PerformanceTestNBOMBER/appsettings.json
- ApiUrl - Target API url, example: `https://localhost:7161/api/`
-  Simulation/Rate - Virtual users count
-  Simulation/IntervalMiliSeconds - The interval between injections
-  Simulation/DuringSeconds - The duration of load simulation


## Run the Project 

1. Run API
2. Set environment variables in file PerformanceTestNBOMBER/appsettings.json
3. Navigate into the solution directory:
    ```
    cd /your/repo/dir/PerformanceTestNBOMBER
    ```

4. Run the application:
    ```
    dotnet run
    ```

## Scenarios

1. scenario_login_info_logout
	- Login `Simulation/Rate` users on account with login: "user123@example.com" and password: "string!@#S1"
	- Get account
	- Logout 



