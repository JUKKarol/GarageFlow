using GarageFlow.Data;
using GarageFlow.Entities;
using Microsoft.EntityFrameworkCore;
using Sieve.Services;

namespace GarageFlow.Repositories.RepairDetailRepository;

public class RepairDetailRepository(AppDbContext db,
    ISieveProcessor sieveProcessor) : IRepairDetailRepository
{
    public async Task<RepairDetail> CreateRepairDetail(RepairDetail repairDetail, CancellationToken cancellationToken)
    {
        await db.RepairDetails.AddAsync(repairDetail, cancellationToken);
        await db.SaveChangesAsync(cancellationToken);
        return repairDetail;
    }

    public async Task<RepairDetail> UpdateRepairDetail(RepairDetail repairDetail, CancellationToken cancellationToken)
    {
        db.RepairDetails.Update(repairDetail);
        await db.SaveChangesAsync(cancellationToken);
        return repairDetail;
    }

    public async Task<RepairDetail> GetRepairDetailById(Guid repairDetailId, CancellationToken cancellationToken)
    {
        return await db
            .RepairDetails
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.Id == repairDetailId, cancellationToken);
    }

    public async Task<List<RepairDetail>> GetRepairDetailsByRepairId(Guid repairId, CancellationToken cancellationToken)
    {
        return await db
            .RepairDetails
            .AsNoTracking()
            .Where(r => r.RepairId == repairId)
            .ToListAsync(cancellationToken);
    }

    public async Task DeleteRepairDetail(Guid repairDetailId, CancellationToken cancellationToken)
    {
        var repairDetail = await db.RepairDetails.FirstOrDefaultAsync(rd => rd.Id == repairDetailId, cancellationToken);
        db.RepairDetails.Remove(repairDetail);
        await db.SaveChangesAsync(cancellationToken);
    }
}