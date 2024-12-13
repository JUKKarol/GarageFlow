using GarageFlow.Constants;
using GarageFlow.Entities;
using Microsoft.AspNetCore.Identity;

namespace GarageFlow.Data.Seeders;

public class AppSeeder(AppDbContext db, UserManager<AppUser> userManager) : IAppSeeder
{
    public async Task SeedDev()
    {
        if (await db.Database.CanConnectAsync())
        {
            if (!db.Brands.Any())
            {
                var brandId = Guid.Parse("11111111-1111-1111-1111-111111111111");
                var modelId = Guid.Parse("22222222-2222-2222-2222-222222222222");
                var CarId = Guid.Parse("33333333-3333-3333-3333-333333333333");
                var brand = new Brand
                {
                    Id = brandId,
                    Name = "BMW"
                };
                var model = new Model
                {
                    Id = modelId,
                    Name = "E36",
                    BrandId = brandId
                };
                var car = new Car
                {
                    Id = CarId,
                    Engine = 2800,
                    RegistrationNumber = "PO44445",
                    Vin = "WBAAB31030EA12345",
                    yearOfProduction = 1995,
                    ModelId = modelId
                };

                await db.Brands.AddAsync(brand);
                await db.Models.AddAsync(model);
                await db.Cars.AddAsync(car);

                await db.SaveChangesAsync();
            }
        }
    }

    public async Task Seed()
    {
        if (await db.Database.CanConnectAsync())
        {
            if (!db.AppConfig.Any() && !db.Roles.Any() && !db.Users.Any())
            {
                var config = new AppConfig
                {
                    Id = Guid.Empty,
                    RepairsLimitPerDay = 10,
                };
                await db.AppConfig.AddAsync(config);

                var roles = GetRoles();
                await db.Roles.AddRangeAsync(roles);

                var users = GetUsers();

                foreach (var user in users)
                {
                    var result = await userManager.CreateAsync(user.User, user.Password);
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user.User, user.Role);
                    }
                }

                await db.SaveChangesAsync();
            }
        }
    }

    private IEnumerable<IdentityRole> GetRoles()
    {
        List<IdentityRole> roles =
        [
            new (UserRoles.Client)
            {
                NormalizedName = UserRoles.Client.ToUpper()
            },
            new (UserRoles.Employee)
            {
                NormalizedName = UserRoles.Employee.ToUpper()
            },
            new (UserRoles.Admin)
            {
                NormalizedName = UserRoles.Admin.ToUpper()
            },
        ];

        return roles;
    }

    private IEnumerable<(AppUser User, string Password, string Role)> GetUsers()
    {
        return new List<(AppUser, string, string)>
        {
            (new AppUser
            {
                UserName = "client@example.com",
                Email = "client@example.com",
                EmailConfirmed = true
            }, "GarageFlow1!", UserRoles.Client),

            (new AppUser
            {
                UserName = "employee@example.com",
                Email = "employee@example.com",
                EmailConfirmed = true
            }, "GarageFlow1!", UserRoles.Employee),

            (new AppUser
            {
                UserName = "admin@example.com",
                Email = "admin@example.com",
                EmailConfirmed = true
            }, "GarageFlow1!", UserRoles.Admin),
        };
    }
}