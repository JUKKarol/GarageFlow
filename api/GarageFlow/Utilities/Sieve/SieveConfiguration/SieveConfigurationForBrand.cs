using GarageFlow.Entities;
using Sieve.Services;

namespace GarageFlow.Utilities.Sieve.SieveConfiguration;

public class SieveConfigurationForBrand : ISieveConfiguration
{
    public void Configure(SievePropertyMapper mapper)
    {
        mapper.Property<Brand>(r => r.CreatedAt)
            .CanSort();

        mapper.Property<Brand>(r => r.UpdatedAt)
            .CanSort();

        mapper.Property<Brand>(r => r.Name)
            .CanFilter()
            .CanSort();

        mapper.Property<Brand>(r => r.Id)
            .CanFilter();
    }
}