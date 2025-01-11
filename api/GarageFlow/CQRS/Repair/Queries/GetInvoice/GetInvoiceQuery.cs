using MediatR;

namespace GarageFlow.CQRS.Repair.Queries.GetInvoice;

public class GetInvoiceQuery : IRequest<InvoiceResponse>
{
    public Guid RepairId { get; set; }
}