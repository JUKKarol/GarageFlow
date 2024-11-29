using GarageFlow.Entities;
using System.Threading;

namespace GarageFlow.Repositories;

public interface IRepairRepository
{
    Task<Repair> CreateRepair(Repair repair, CancellationToken cancellationToken);

    Task<List<Repair>> GetAllRepairs(CancellationToken cancellationToken);
}