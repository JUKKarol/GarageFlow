using AutoMapper;
using GarageFlow.Enums;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.RepairRepository;
using MediatR;

namespace GarageFlow.CQRS.Repair.Queries.GetInvoice;

public class GetInvoiceQueryHandler(IMapper mapper, IRepairRepository repairRepository) : IRequestHandler<GetInvoiceQuery, InvoiceResponse>
{
    public async Task<InvoiceResponse> Handle(GetInvoiceQuery request, CancellationToken cancellationToken)
    {
        var repair = await repairRepository.GetRepairById(request.RepairId, cancellationToken);

        if (repair.Status != RepairStatus.Done)
        {
            throw new BadRequestException($"Repair {repair.Id} should be Done instead of {repair.Status}");
        }

        var invoice = mapper.Map<InvoiceResponse>(repair);
        invoice.CustomerAddress = request.CustomerAddress;
        invoice.Nip = request.Nip;

        return invoice;
    }
}