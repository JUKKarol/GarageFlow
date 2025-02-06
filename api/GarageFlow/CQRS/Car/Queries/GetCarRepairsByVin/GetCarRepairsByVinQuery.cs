using GarageFlow.CQRS.Repair;
using GarageFlow.CQRS.RepairHistory;
using MediatR;

namespace GarageFlow.CQRS.Car.Queries.GetCarRepairsByVin;

public class GetCarRepairsByVinQuery : IRequest<List<RepairWithDetailsResponse>>
{
    public string Vin { get; set; }
}