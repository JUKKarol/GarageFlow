using AutoMapper;
using GarageFlow.Repositories.RepairRepository;
using MediatR;

namespace GarageFlow.CQRS.Repair.Queries.GetInvoice;

public class GetInvoiceQueryHandler(IMapper mapper,
    IRepairRepository repairRepository) : IRequestHandler<GetInvoiceQuery>
{
    public async Task Handle(GetInvoiceQuery request, CancellationToken cancellationToken)
    {
    }
}