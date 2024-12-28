using GarageFlow.Entities;
using GarageFlow.Enums;

namespace GarageFlow.Repositories.RepairRepository;

public interface IRepairRepository
{
    Task<Repair> CreateRepair(Repair repair, CancellationToken cancellationToken);

    Task<Repair> UpdateRepair(Repair repair, CancellationToken cancellationToken);

    Task<List<Repair>> GetAllRepairs(CancellationToken cancellationToken);

    Task<Repair> GetRepairById(Guid repairId, CancellationToken cancellationToken);

    Task<List<Repair>> GetRepairsByStatus(RepairStatus repairStatus, CancellationToken cancellationToken);
}