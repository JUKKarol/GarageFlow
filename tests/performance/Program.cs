using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using NBomber.Contracts;
using NBomber.CSharp;

namespace PerformanceTestNBOMBER;

internal class Program
{
    private static async Task Main(string[] args)
    {
        // Load appsettings.json
        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .Build();

        var apiUrl = configuration["ApiUrl"];
        var userEmail = configuration["User:Email"];
        var userPassword = configuration["User:Password"];
        var rate = int.Parse(configuration["Simulation:Rate"]);
        var intervalMilliseconds = int.Parse(configuration["Simulation:IntervalMiliSeconds"]);
        var duringSeconds = int.Parse(configuration["Simulation:DuringSeconds"]);

        string JWTToken = string.Empty; // Initialize JWTToken

        var loginPayload = new
        {
            email = userEmail,
            password = userPassword
        };

        // Convert payload to JSON
        var loginPayloadJson = JsonSerializer.Serialize(loginPayload);

        // Define the NBomber scenario for login
        var loginScenario = Scenario.Create("Login to API", async context =>
        {
            using var httpClient = new HttpClient();
            var requestContent = new StringContent(loginPayloadJson, Encoding.UTF8, "application/json");

            var response = await httpClient.PostAsync($"{apiUrl}auth/login", requestContent);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var jsonResponse = JsonDocument.Parse(responseContent);
                JWTToken = jsonResponse.RootElement.GetProperty("accessToken").GetString();
                return Response.Ok(sizeBytes: responseContent.Length);
            }
            else
            {
                return Response.Fail();
            }
        })
        .WithLoadSimulations(
            Simulation.Inject(rate: rate,
                              interval: TimeSpan.FromMilliseconds(intervalMilliseconds),
                              during: TimeSpan.FromSeconds(duringSeconds))
        );

        var getCarsScenario = Scenario.Create("Get Cars", async context =>
        {
            using var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {JWTToken}");

            var response = await httpClient.GetAsync($"{apiUrl}Car");
            var responseContent = await response.Content.ReadAsStringAsync();

            return response.IsSuccessStatusCode
                ? Response.Ok(sizeBytes: responseContent.Length)
                : Response.Fail();
        })
        .WithLoadSimulations(
            Simulation.Inject(rate: rate,
                              interval: TimeSpan.FromMilliseconds(intervalMilliseconds),
                              during: TimeSpan.FromSeconds(duringSeconds))
        );

        var getRepairsScenario = Scenario.Create("Get Repairs", async context =>
        {
            using var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {JWTToken}");

            var response = await httpClient.GetAsync($"{apiUrl}Repair");
            var responseContent = await response.Content.ReadAsStringAsync();

            return response.IsSuccessStatusCode
                ? Response.Ok(sizeBytes: responseContent.Length)
                : Response.Fail();
        })
        .WithLoadSimulations(
            Simulation.Inject(rate: rate,
                              interval: TimeSpan.FromMilliseconds(intervalMilliseconds),
                              during: TimeSpan.FromSeconds(duringSeconds))
        );

        NBomberRunner
            .RegisterScenarios(loginScenario, getCarsScenario, getRepairsScenario)
            .Run();
    }
}