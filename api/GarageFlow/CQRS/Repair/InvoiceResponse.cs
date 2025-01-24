using GarageFlow.CQRS.RepairDetail;

namespace GarageFlow.CQRS.Repair;

public class InvoiceResponse
{
    public Guid Id { get; set; }
    public DateOnly StartedAt { get; set; }
    public DateOnly FinishedAt { get; set; }
    public int Price { get; set; }
    public string Description { get; set; }
    public string CustomerName { get; set; }
    public string CustomerPhoneNumber { get; set; }
    public string CustomerEmail { get; set; }
    public string CustomerAddress { get; set; }
    public string Nip { get; set; }

    public List<RepairDetailResponse> RepairDetails { get; set; }
}