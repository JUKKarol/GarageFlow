using FluentValidation;

namespace GarageFlow.CQRS.RepairDetail.Commands.CreateRepairDetail;

public class CreateRepairDetailCommandValidator : AbstractValidator<CreateRepairDetailCommand>
{
    public CreateRepairDetailCommandValidator()
    {
        RuleFor(c => c.Name)
            .Length(1, 200)
            .NotEmpty();
        RuleFor(c => c.Price)
           .InclusiveBetween(1, 100000000)
           .NotEmpty();
    }
}