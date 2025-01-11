using FluentValidation;

namespace GarageFlow.CQRS.User.Commands.UnAssignUserRole;

public class UnassignUserRoleCommandValidator : AbstractValidator<UnassignUserRoleCommand>
{
    public UnassignUserRoleCommandValidator()
    {
        RuleFor(c => c.Email)
            .NotEmpty()
            .EmailAddress()
            .Length(1, 50);
        RuleFor(c => c.Role)
            .NotEmpty()
            .Length(1, 50);
    }
}