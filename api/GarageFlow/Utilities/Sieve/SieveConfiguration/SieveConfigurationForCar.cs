using GarageFlow.Entities;
using Sieve.Services;

namespace GarageFlow.Utilities.Sieve.SieveConfiguration;

public class SieveConfigurationForCar : ISieveConfiguration
{
    public void Configure(SievePropertyMapper mapper)
    {
        mapper.Property<Car>(r => r.CreatedAt)
             .CanSort();

        mapper.Property<Car>(r => r.UpdatedAt)
            .CanSort();

        mapper.Property<Car>(r => r.Engine)
            .CanFilter()
            .CanSort();

        mapper.Property<Car>(r => r.RegistrationNumber)
           .CanFilter()
           .CanSort();

        mapper.Property<Car>(r => r.Vin)
           .CanFilter()
           .CanSort();

        mapper.Property<Car>(r => r.yearOfProduction)
           .CanFilter()
           .CanSort();

        mapper.Property<Car>(r => r.ModelId)
           .CanFilter()
           .CanSort();

        mapper.Property<Car>(r => r.Id)
             .CanFilter()
             .CanSort();
    }
}