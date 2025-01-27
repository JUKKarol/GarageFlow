using GarageFlow.Enums;

namespace GarageFlow.Entities;

public class Car
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public int Engine { get; set; }
    public FuelType FuelType { get; set; }
    public string RegistrationNumber { get; set; }
    public string Vin { get; set; }
    public int YearOfProduction { get; set; }
    public Guid ModelId { get; set; }

    public Model Model { get; set; }
    public List<Repair> Repairs { get; set; }
}