using GarageFlow.Enums;

namespace GarageFlow.CQRS.Car;

public class CarResponse
{
    public Guid Id { get; set; }
    public int Engine { get; set; }
    public FuelType FuelType { get; set; }
    public string RegistrationNumber { get; set; }
    public string Vin { get; set; }
    public int yearOfProduction { get; set; }

    public Guid ModelId { get; set; }
}