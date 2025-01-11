using FluentValidation;

namespace GarageFlow.CQRS.User.Commands.AssignUserRole;

public class AssignUserRoleCommandValidator : AbstractValidator<AssignUserRoleCommand>
{
    public AssignUserRoleCommandValidator()
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