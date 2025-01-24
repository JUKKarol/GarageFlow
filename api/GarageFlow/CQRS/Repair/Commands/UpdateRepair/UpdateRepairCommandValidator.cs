using FluentValidation;

namespace GarageFlow.CQRS.Repair.Commands.UpdateRepair;

public class UpdateRepairCommandValidator : AbstractValidator<UpdateRepairCommand>
{
    public UpdateRepairCommandValidator()
    {
        RuleFor(c => c.StartedAt);
        RuleFor(c => c.FinishedAt);
        RuleFor(c => c.Description)
            .Length(1, 1000);
        RuleFor(c => c.CustomerName)
            .NotEmpty()
            .Length(1, 50);
        RuleFor(c => c.CustomerPhoneNumber)
            .Length(9, 15);
        RuleFor(c => c.CustomerEmail)
            .EmailAddress()
            .Length(1, 50);
        RuleFor(c => c.Status)
            .IsInEnum();
        RuleFor(c => c.CarId);
        RuleFor(c => c.Users);
    }
}