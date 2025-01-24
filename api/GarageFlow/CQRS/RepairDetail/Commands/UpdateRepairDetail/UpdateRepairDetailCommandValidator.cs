using FluentValidation;

namespace GarageFlow.CQRS.RepairDetail.Commands.UpdateRepairDetail;

public class UpdateRepairDetailCommandValidator : AbstractValidator<UpdateRepairDetailCommand>
{
    public UpdateRepairDetailCommandValidator()
    {
        RuleFor(c => c.Name)
            .Length(1, 200)
            .NotEmpty();
        RuleFor(c => c.Price)
           .InclusiveBetween(1, 100000000)
           .NotEmpty();
    }
}