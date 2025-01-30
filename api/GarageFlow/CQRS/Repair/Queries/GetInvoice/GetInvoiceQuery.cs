using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GarageFlow.CQRS.Repair.Queries.GetInvoice;

public class GetInvoiceQuery : IRequest<IActionResult>
{
    public Guid RepairId { get; set; }
    public string CustomerAddress { get; set; }
    public string Nip { get; set; }
}