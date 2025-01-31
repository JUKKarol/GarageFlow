using GarageFlow.Entities;

namespace GarageFlow.Repositories.RepairHistoryRepository;

public interface IRepairHistoryRepository
{
    Task<List<RepairHistory>> GetRepairHistoryByRepairId(Guid repairId, CancellationToken cancellationToken);

    Task<RepairHistory> GetCurrentRepairHistoryByRepairId(Guid repairId, CancellationToken cancellationToken);

    Task<RepairHistory> CreateRepairHistory(RepairHistory repairHistory, CancellationToken cancellationToken);
}