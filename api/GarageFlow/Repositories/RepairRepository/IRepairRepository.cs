using GarageFlow.Entities;
using GarageFlow.Enums;
using Sieve.Models;

namespace GarageFlow.Repositories.RepairRepository;

public interface IRepairRepository
{
    Task<Repair> CreateRepair(Repair repair, CancellationToken cancellationToken);

    Task<Repair> UpdateRepair(Repair repair, CancellationToken cancellationToken);

    Task<List<Repair>> GetAllRepairs(SieveModel query, CancellationToken cancellationToken);

    Task<int> GetRepairsCount(SieveModel query, CancellationToken cancellationToken);

    Task<Repair> GetRepairById(Guid repairId, CancellationToken cancellationToken);

    Task<Repair> GetNewestRepairByCarId(Guid id, CancellationToken cancellationToken);
}