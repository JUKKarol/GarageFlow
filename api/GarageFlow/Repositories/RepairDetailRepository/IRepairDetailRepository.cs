using GarageFlow.Entities;

namespace GarageFlow.Repositories.RepairDetailRepository;

public interface IRepairDetailRepository
{
    Task<RepairDetail> CreateRepairDetail(RepairDetail repairDetail, CancellationToken cancellationToken);

    Task<RepairDetail> UpdateRepairDetail(RepairDetail repairDetail, CancellationToken cancellationToken);

    Task<RepairDetail> GetRepairDetailById(Guid repairDetailId, CancellationToken cancellationToken);

    Task<List<RepairDetail>> GetRepairDetailsByRepairId(Guid repairId, CancellationToken cancellationToken);

    Task DeleteRepairDetail(Guid repairDetailId, CancellationToken cancellationToken);
}