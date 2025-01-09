using FluentValidation;

namespace GarageFlow.CQRS.Model.Commands.UpdateModel;

public class UpdateModelCommandValidator : AbstractValidator<UpdateModelCommand>
{
    public UpdateModelCommandValidator()
    {
        RuleFor(c => c.Name)
            .NotEmpty()
            .Length(1, 50);
        RuleFor(c => c.Id)
            .NotEmpty();
    }
}