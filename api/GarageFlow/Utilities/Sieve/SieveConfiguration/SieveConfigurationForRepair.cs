using GarageFlow.Entities;
using Sieve.Services;

namespace GarageFlow.Utilities.Sieve.SieveConfiguration;

public class SieveConfigurationForRepair : ISieveConfiguration
{
    public void Configure(SievePropertyMapper mapper)
    {
        mapper.Property<Repair>(r => r.CreatedAt)
            .CanSort();

        mapper.Property<Repair>(r => r.UpdatedAt)
            .CanSort();

        mapper.Property<Repair>(r => r.Description)
            .CanFilter();

        mapper.Property<Repair>(r => r.Status)
            .CanFilter()
            .CanSort();
    }
}