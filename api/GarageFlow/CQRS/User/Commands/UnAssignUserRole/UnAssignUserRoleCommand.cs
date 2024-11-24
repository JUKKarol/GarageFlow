using MediatR;

namespace GarageFlow.CQRS.User.Commands.UnassignUserRole;

public class UnassignUserRoleCommand : IRequest
{
    public string Email { get; set; }
    public string Role { get; set; }
}