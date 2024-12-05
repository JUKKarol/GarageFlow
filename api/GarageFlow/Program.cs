using GarageFlow.Configuration;
using GarageFlow.CQRS.User;
using GarageFlow.Data;
using GarageFlow.Data.Seeders;
using GarageFlow.Entities;
using GarageFlow.Middlewares;
using GarageFlow.Repositories.RepairRepository;
using GarageFlow.Services;
using GarageFlow.Services.TokenService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
var appSettings = builder.Configuration.GetSection("AppSettings").Get<AppSettings>();

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(appSettings.ConnectionStrings.DefaultConnection));

var frontendCorsName = "frontendCors";
builder.Services.AddCors(options =>
{
    options.AddPolicy(frontendCorsName, policy =>
    {
        policy.WithOrigins(appSettings.AllowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddIdentityApiEndpoints<AppUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = appSettings.JWT.Issuer,
        ValidateAudience = true,
        ValidAudience = appSettings.JWT.Audience,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(appSettings.JWT.SigningKey)
        )
    };
});
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

builder.Services.AddMediatR(config => config.RegisterServicesFromAssembly(typeof(Program).Assembly));
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddScoped<ErrorHandlingMiddleware>();
builder.Services.AddScoped<IAppSeeder, AppSeeder>();
builder.Services.AddTransient<IEmailSender, EmailSender>();
builder.Services.AddScoped<IUserContext, UserContext>();

builder.Services.AddTransient<ITokenService, TokenService>();
builder.Services.AddScoped<IRepairRepository, RepairRepository>();

var app = builder.Build();
var scope = app.Services.CreateScope();
var dbContext = scope.ServiceProvider.GetService<AppDbContext>();

var pendingMigrations = dbContext.Database.GetPendingMigrations();
if (pendingMigrations.Any())
{
    dbContext.Database.Migrate();
}

app.UseMiddleware<ErrorHandlingMiddleware>();

var seeder = scope.ServiceProvider.GetRequiredService<IAppSeeder>();

//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
app.UseSwaggerUI();

await seeder.SeedDev();
//}

await seeder.Seed();

app.UseCors(frontendCorsName);

app.UseHttpsRedirection();

app.MapGroup("/api/auth")
    .WithTags("Auth")
    .MapIdentityApi<AppUser>();

app.UseAuthorization();

app.MapControllers();

app.Run();