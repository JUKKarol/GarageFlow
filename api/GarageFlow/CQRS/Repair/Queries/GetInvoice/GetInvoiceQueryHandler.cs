using AutoMapper;
using GarageFlow.CQRS.RepairDetail;
using GarageFlow.Entities;
using GarageFlow.Enums;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.RepairDetailRepository;
using GarageFlow.Repositories.RepairRepository;
using MediatR;

namespace GarageFlow.CQRS.Repair.Queries.GetInvoice;

public class GetInvoiceQueryHandler(IMapper mapper,
    IRepairRepository repairRepository,
    IRepairDetailRepository repairDetailRepository) : IRequestHandler<GetInvoiceQuery, InvoiceResponse>
{
    public async Task<InvoiceResponse> Handle(GetInvoiceQuery request, CancellationToken cancellationToken)
    {
        var repair = await repairRepository.GetRepairById(request.RepairId, cancellationToken);

        if (repair == null)
        {
            throw new NotFoundException(nameof(Repair), request.RepairId.ToString());
        }

        if (repair.Status != RepairStatus.Done)
        {
            throw new BadRequestException($"Repair {repair.Id} should be Done instead of {repair.Status}");
        }

        var invoice = mapper.Map<InvoiceResponse>(repair);
        invoice.CustomerAddress = request.CustomerAddress;
        invoice.Nip = request.Nip;

        var repairDetails = await repairDetailRepository.GetRepairDetailsByRepairId(repair.Id, cancellationToken);
        invoice.RepairDetails = mapper.Map<List<RepairDetailResponse>>(repairDetails);

        return invoice;
    }
}