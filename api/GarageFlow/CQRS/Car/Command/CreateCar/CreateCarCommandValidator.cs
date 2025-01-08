using FluentValidation;

namespace GarageFlow.CQRS.Car.Command.CreateCar;

public class CreateCarCommandValidator : AbstractValidator<CreateCarCommand>
{
    public CreateCarCommandValidator()
    {
        RuleFor(c => c.Engine)
            .NotEmpty()
            .InclusiveBetween(1, 20000);
        RuleFor(c => c.RegistrationNumber)
            .NotEmpty()
            .Length(1, 10);
        RuleFor(c => c.Vin)
            .NotEmpty()
            .Length(17);
        RuleFor(c => c.YearOfProduction)
            .InclusiveBetween(1800, DateTime.Now.Year)
            .NotEmpty();
        RuleFor(c => c.ModelId)
            .NotEmpty();
    }
}