using GarageFlow.Entities;
using Sieve.Services;

namespace GarageFlow.Utilities.Sieve.SieveConfiguration;

public class SieveConfigurationForModel : ISieveConfiguration
{
    public void Configure(SievePropertyMapper mapper)
    {
        mapper.Property<Model>(r => r.CreatedAt)
            .CanSort();

        mapper.Property<Model>(r => r.UpdatedAt)
            .CanSort();

        mapper.Property<Model>(r => r.Name)
            .CanFilter()
            .CanSort();

        mapper.Property<Model>(r => r.Id)
            .CanFilter();

        mapper.Property<Model>(r => r.BrandId)
            .CanFilter()
            .CanSort();
    }
}