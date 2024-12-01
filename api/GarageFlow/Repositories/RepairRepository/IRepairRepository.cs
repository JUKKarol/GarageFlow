using GarageFlow.Entities;
using System.Threading;

namespace GarageFlow.Repositories.RepairRepository;

public interface IRepairRepository
{
    Task<Repair> CreateRepair(Repair repair, CancellationToken cancellationToken);

    Task<List<Repair>> GetAllRepairs(CancellationToken cancellationToken);
}