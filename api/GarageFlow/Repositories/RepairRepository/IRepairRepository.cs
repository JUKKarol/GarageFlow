﻿using GarageFlow.Entities;
using GarageFlow.Enums;
using System.Threading;

namespace GarageFlow.Repositories.RepairRepository;

public interface IRepairRepository
{
    Task<Repair> CreateRepair(Repair repair, CancellationToken cancellationToken);

    Task<List<Repair>> GetAllRepairs(CancellationToken cancellationToken);

    Task<List<Repair>> GetRepairsByStatus(RepairStatus repairStatus, CancellationToken cancellationToken);
}