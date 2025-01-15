using MediatR;

namespace GarageFlow.CQRS.Car.Command.CreateCar;

public class CreateCarCommand : IRequest<CarResponse>
{
    public int Engine { get; set; }
    public string RegistrationNumber { get; set; }
    public string Vin { get; set; }
    public int YearOfProduction { get; set; }
    public Guid ModelId { get; set; }
}