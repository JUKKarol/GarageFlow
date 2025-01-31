using GarageFlow.Data;
using GarageFlow.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace GarageFlow.Repositories.RepairHistoryRepository;

public class RepairHistoryRepository(AppDbContext db) : IRepairHistoryRepository
{
    public async Task<List<RepairHistory>> GetRepairHistoryByRepairId(Guid repairId, CancellationToken cancellationToken)
    {
        return await db.RepairHistory
            .AsNoTracking()
            .Where(rh => rh.RepairId == repairId)
            .ToListAsync(cancellationToken);
    }

    public async Task<RepairHistory> GetCurrentRepairHistoryByRepairId(Guid repairId, CancellationToken cancellationToken)
    {
        return await db.RepairHistory
            .AsNoTracking()
            .Where(rh => rh.RepairId == repairId)
            .OrderByDescending(rh => rh.CreatedAt)
            .FirstOrDefaultAsync();
    }

    public async Task<RepairHistory> CreateRepairHistory(RepairHistory repairHistory, CancellationToken cancellationToken)
    {
        await db.RepairHistory.AddAsync(repairHistory, cancellationToken);
        await db.SaveChangesAsync(cancellationToken);
        return repairHistory;
    }
}