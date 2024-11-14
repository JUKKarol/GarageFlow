using GarageFlow.Configuration;
using GarageFlow.Data;
using GarageFlow.Data.Seeders;
using GarageFlow.Entities;
using GarageFlow.Middlewares;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
var appSettings = builder.Configuration.GetSection("AppSettings").Get<AppSettings>();

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(appSettings.ConnectionStrings.DefaultConnection));

builder.Services.AddIdentityApiEndpoints<AppUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddAuthentication();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("bearerAuth", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "bearerAuth"
                        }
                    },
                    new List<string>()
                }
    });
});

builder.Host.UseSerilog((context, configuration) =>
    configuration.ReadFrom.Configuration(context.Configuration)
);

builder.Services.AddScoped<ErrorHandlingMiddleware>();
builder.Services.AddScoped<IAppSeeder, AppSeeder>();

var app = builder.Build();
var scope = app.Services.CreateScope();
var dbContext = scope.ServiceProvider.GetService<AppDbContext>();

var pendingMigrations = dbContext.Database.GetPendingMigrations();
if (pendingMigrations.Any())
{
    dbContext.Database.Migrate();
}

app.UseMiddleware<ErrorHandlingMiddleware>();

//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
app.UseSwaggerUI();

var seeder = scope.ServiceProvider.GetRequiredService<IAppSeeder>();
await seeder.Seed();
//}

app.UseHttpsRedirection();

app.MapGroup("/api/auth")
    .WithTags("Auth")
    .MapIdentityApi<AppUser>();

app.UseAuthorization();

app.MapControllers();

app.Run();