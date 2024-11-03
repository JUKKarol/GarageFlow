using MediatR;

namespace GarageFlow.CQRS.User.Commands.AssignUserRole;

public class AssignUserRoleCommand : IRequest
{
    public string Email { get; set; }
    public string Role { get; set; }
}