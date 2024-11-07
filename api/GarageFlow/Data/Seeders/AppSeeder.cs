using GarageFlow.Constants;
using Microsoft.AspNetCore.Identity;

namespace GarageFlow.Data.Seeders;

public class AppSeeder(AppDbContext db) : IAppSeeder
{
    public async Task Seed()
    {
        if (await db.Database.CanConnectAsync())
        {
            if (!db.Roles.Any())
            {
                var roles = GetRoles();
                await db.Roles.AddRangeAsync(roles);
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
}