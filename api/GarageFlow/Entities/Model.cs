namespace GarageFlow.Entities;

public class Model
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public Guid BrandId { get; set; }
    public string Name { get; set; }

    public Brand Brand { get; set; }
    public List<Car> Cars { get; set; }
}