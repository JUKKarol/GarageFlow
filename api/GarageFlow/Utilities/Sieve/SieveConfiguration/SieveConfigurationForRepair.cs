using GarageFlow.Entities;
using Sieve.Services;

namespace GarageFlow.Utilities.Sieve.SieveConfiguration;

public class SieveConfigurationForRepair : ISieveConfiguration
{
    public void Configure(SievePropertyMapper mapper)
    {
        mapper.Property<Repair>(r => r.Id)
           .CanFilter();

        mapper.Property<Repair>(r => r.CreatedAt)
            .CanFilter()
            .CanSort();

        mapper.Property<Repair>(r => r.UpdatedAt)
            .CanFilter()
            .CanSort();

        mapper.Property<Repair>(r => r.StartedAt)
            .CanFilter()
            .CanSort();

        mapper.Property<Repair>(r => r.PlannedStartAt)
            .CanFilter()
            .CanSort();

        mapper.Property<Repair>(r => r.FinishedAt)
            .CanFilter()
            .CanSort();

        mapper.Property<Repair>(r => r.PlannedFinishAt)
            .CanFilter()
            .CanSort();

        mapper.Property<Repair>(r => r.Description)
            .CanFilter()
            .CanSort();

        mapper.Property<Repair>(r => r.CustomerName)
            .CanFilter()
            .CanSort();

        mapper.Property<Repair>(r => r.CustomerPhoneNumber)
            .CanFilter()
            .CanSort();

        mapper.Property<Repair>(r => r.CustomerEmail)
            .CanFilter()
            .CanSort();

        mapper.Property<Repair>(r => r.CarId)
            .CanFilter()
            .CanSort();

        mapper.Property<Repair>(r => r.Status)
            .CanFilter()
            .CanSort();
    }
}