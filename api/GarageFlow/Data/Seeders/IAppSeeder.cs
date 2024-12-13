namespace GarageFlow.Data.Seeders;

public interface IAppSeeder
{
    Task Seed();

    Task SeedDev();
}