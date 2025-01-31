using AutoMapper;
using GarageFlow.CQRS.RepairDetail;
using GarageFlow.Enums;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.RepairDetailRepository;
using GarageFlow.Repositories.RepairHistoryRepository;
using GarageFlow.Repositories.RepairRepository;
using MediatR;

namespace GarageFlow.CQRS.Repair.Queries.GetInvoice;

public class GetInvoiceQueryHandler(IMapper mapper,
    IRepairRepository repairRepository,
    IRepairDetailRepository repairDetailRepository,
    IRepairHistoryRepository repairHistoryRepository) : IRequestHandler<GetInvoiceQuery, InvoiceResponse>
{
    public async Task<InvoiceResponse> Handle(GetInvoiceQuery request, CancellationToken cancellationToken)
    {
        var repair = await repairRepository.GetRepairById(request.RepairId, cancellationToken);

        if (repair == null)
        {
            throw new NotFoundException(nameof(Repair), request.RepairId.ToString());
        }

        var repairStatus = await repairHistoryRepository.GetCurrentRepairHistoryByRepairId(repair.Id, cancellationToken);

        if (repairStatus.Status != RepairStatus.Done)
        {
            throw new BadRequestException($"Repair {repair.Id} should be Done instead of {repairStatus.Status}");
        }

        var invoice = mapper.Map<InvoiceResponse>(repair);
        var repairDetails = await repairDetailRepository.GetRepairDetailsByRepairId(repair.Id, cancellationToken);
        invoice.CustomerAddress = request.CustomerAddress;
        invoice.Nip = request.Nip;

        invoice.RepairDetails = mapper.Map<List<RepairDetailResponse>>(repairDetails);
        invoice.Price = invoice.RepairDetails.Sum(rd => rd.Price);

        return invoice;
    }
}