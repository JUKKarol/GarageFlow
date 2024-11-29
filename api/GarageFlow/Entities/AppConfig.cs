namespace GarageFlow.Entities;

public class AppConfig
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int RepairsLimitPerDay { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}