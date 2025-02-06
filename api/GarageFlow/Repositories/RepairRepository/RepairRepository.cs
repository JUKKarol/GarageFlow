using GarageFlow.Data;
using GarageFlow.Entities;
using GarageFlow.Enums;
using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;

namespace GarageFlow.Repositories.RepairRepository;

public class RepairRepository(AppDbContext db,
    ISieveProcessor sieveProcessor) : IRepairRepository
{
    public async Task<Repair> CreateRepair(Repair repair, CancellationToken cancellationToken)
    {
        await db.Repairs.AddAsync(repair, cancellationToken);
        await db.SaveChangesAsync(cancellationToken);
        return repair;
    }

    public async Task<Repair> UpdateRepair(Repair repair, CancellationToken cancellationToken)
    {
        db.Repairs.Update(repair);
        await db.SaveChangesAsync(cancellationToken);
        return repair;
    }

    public async Task<List<Repair>> GetAllRepairs(SieveModel query, CancellationToken cancellationToken)
    {
        var repairs = db
            .Repairs
            .AsNoTracking()
            .AsQueryable();

        return await sieveProcessor
            .Apply(query, repairs)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<int> GetRepairsCount(SieveModel query, CancellationToken cancellationToken)
    {
        var repairs = db
            .Repairs
            .AsNoTracking()
            .AsQueryable();

        return await sieveProcessor
            .Apply(query, repairs, applyPagination: false)
            .CountAsync(cancellationToken);
    }

    public async Task<Repair> GetRepairById(Guid repairId, CancellationToken cancellationToken)
    {
        return await db.Repairs.AsNoTracking().FirstOrDefaultAsync(r => r.Id == repairId, cancellationToken);
    }

    public async Task<Repair> GetNewestRepairByCarId(Guid id, CancellationToken cancellationToken)
    {
        return await db.Repairs
            .AsNoTracking()
            .Where(r => r.Car.Id == id)
            .OrderByDescending(r => r.UpdatedAt)
            .FirstOrDefaultAsync(cancellationToken);
    }
}