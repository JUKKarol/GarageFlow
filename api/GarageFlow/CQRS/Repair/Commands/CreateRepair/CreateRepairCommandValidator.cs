using FluentValidation;

namespace GarageFlow.CQRS.Repair.Commands.CreateRepair;

public class CreateRepairCommandValidator : AbstractValidator<CreateRepairCommand>
{
    public CreateRepairCommandValidator()
    {
        RuleFor(c => c.PlannedFinishAt)
            .NotEmpty();
        RuleFor(c => c.PlannedStartAt)
            .NotEmpty();
        RuleFor(c => c.Description)
            .Length(1, 1000);
        RuleFor(c => c.customerName)
            .NotEmpty()
            .Length(1, 50);
        RuleFor(c => c.customerPhoneNumber)
            .Length(9, 15);
        RuleFor(c => c.customerEmail)
            .EmailAddress()
            .Length(1, 50);
    }
}