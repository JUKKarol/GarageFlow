using MediatR;

namespace GarageFlow.CQRS.Repair.Queries.GetInvoice;

public class GetInvoiceQuery : IRequest<InvoiceResponse>
{
    public Guid RepairId { get; set; }
    public string CustomerAddress { get; set; }
    public int Nip { get; set; }
}