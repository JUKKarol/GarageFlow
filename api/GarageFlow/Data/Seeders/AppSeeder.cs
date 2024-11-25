using GarageFlow.Constants;
using GarageFlow.Entities;
using GarageFlow.Enums;
using Microsoft.AspNetCore.Identity;

namespace GarageFlow.Data.Seeders;

public class AppSeeder(AppDbContext db, UserManager<AppUser> userManager) : IAppSeeder
{
    public async Task SeedDev()
    {
        if (await db.Database.CanConnectAsync())
        {
            if (!db.Roles.Any() && !db.Users.Any())
            {
                var roles = GetRoles();
                await db.Roles.AddRangeAsync(roles);
                await db.SaveChangesAsync();

                await SeedUsers();
            }
        }
    }

    public async Task Seed()
    {
        if (await db.Database.CanConnectAsync())
        {
            if (!db.AppConfig.Any())
            {
                var config = new AppConfig
                {
                    Id = Guid.Empty,
                    RepairsLimit = 10,
                };
                await db.AppConfig.AddAsync(config);
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

    private async Task SeedUsers()
    {
        var users = GetUsers();

        foreach (var user in users)
        {
            var result = await userManager.CreateAsync(user.User, user.Password);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user.User, user.Role);
            }
        }
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