using GarageFlow.Data;
using GarageFlow.Entities;
using Microsoft.EntityFrameworkCore;

namespace GarageFlow.Repositories;

public class RepairRepository(AppDbContext context) : IRepairRepository
{
    public async Task<Repair> CreateRepair(Repair repair, CancellationToken cancellationToken)
    {
        await context.Repairs.AddAsync(repair, cancellationToken);
        await context.SaveChangesAsync();
        return repair;
    }

    public async Task<List<Repair>> GetAllRepairs(CancellationToken cancellationToken)
    {
        return await context.Repairs.ToListAsync(cancellationToken);
    }
}