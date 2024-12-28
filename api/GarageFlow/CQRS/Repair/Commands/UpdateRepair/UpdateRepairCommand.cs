﻿using GarageFlow.Enums;
using MediatR;
using System.Text.Json.Serialization;

namespace GarageFlow.CQRS.Repair.Commands.UpdateRepair;

public class UpdateRepairCommand : IRequest
{
    public Guid Id { get; set; }

    [JsonIgnore]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public DateOnly StartedAt { get; set; }
    public DateOnly FinishedAt { get; set; }
    public int Price { get; set; }
    public string Description { get; set; }
    public string CustomerName { get; set; }
    public string CustomerPhoneNumber { get; set; }
    public string CustomerEmail { get; set; }
    public RepairStatus Status { get; set; }
    public List<Guid> Users { get; set; }
}