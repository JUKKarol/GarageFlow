using GarageFlow.CQRS.RepairHistory;
using MediatR;

namespace GarageFlow.CQRS.Car.Queries.GetCurrentCarRepairHistoryByVin;

public class GetCurrentCarRepairHistoryByVinQuery : IRequest<List<RepairHistoryResponse>>
{
    public string Vin { get; set; }
}