using MediatR;

namespace GarageFlow.CQRS.User.Commands.UnassignRole;

public class UnassignUserRoleCommand : IRequest
{
    public string Email { get; set; }
    public string Role { get; set; }
}