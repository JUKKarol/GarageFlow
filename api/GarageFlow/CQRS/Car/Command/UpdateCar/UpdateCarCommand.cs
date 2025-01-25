using GarageFlow.Enums;
using MediatR;

namespace GarageFlow.CQRS.Car.Command.UpdateCar;

public class UpdateCarCommand : IRequest<CarResponse>
{
    public Guid Id { get; set; }
    public int Engine { get; set; }
    public FuelType FuelType { get; set; }
    public string RegistrationNumber { get; set; }
    public string Vin { get; set; }
    public int YearOfProduction { get; set; }
    public Guid ModelId { get; set; }
}