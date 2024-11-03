using MediatR;

namespace GarageFlow.CQRS.User.Commands.UnAssignRole;

public class UnAssignUserRoleCommand : IRequest
{
    public string Email { get; set; }
    public string Role { get; set; }
}