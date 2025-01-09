using FluentValidation;

namespace GarageFlow.CQRS.Model.Commands.CreateModel;

public class CreateModelCommandValidator : AbstractValidator<CreateModelCommand>
{
    public CreateModelCommandValidator()
    {
        RuleFor(c => c.Name)
            .NotEmpty()
            .Length(1, 50);
        RuleFor(c => c.BrandId)
            .NotEmpty();
    }
}