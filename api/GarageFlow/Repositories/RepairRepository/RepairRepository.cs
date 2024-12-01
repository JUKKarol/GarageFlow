using GarageFlow.Data;
using GarageFlow.Entities;
using Microsoft.EntityFrameworkCore;

namespace GarageFlow.Repositories.RepairRepository;

public class RepairRepository(AppDbContext db) : IRepairRepository
{
    public async Task<Repair> CreateRepair(Repair repair, CancellationToken cancellationToken)
    {
        await db.Repairs.AddAsync(repair, cancellationToken);
        await db.SaveChangesAsync();
        return repair;
    }

    public async Task<List<Repair>> GetAllRepairs(CancellationToken cancellationToken)
    {
        return await db.Repairs.ToListAsync(cancellationToken);
    }
}