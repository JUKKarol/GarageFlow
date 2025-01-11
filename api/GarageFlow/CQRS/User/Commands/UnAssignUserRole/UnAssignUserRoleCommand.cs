using MediatR;

namespace GarageFlow.CQRS.User.Commands.UnAssignUserRole;

public class UnassignUserRoleCommand : IRequest
{
    public string Email { get; set; }
    public string Role { get; set; }
}