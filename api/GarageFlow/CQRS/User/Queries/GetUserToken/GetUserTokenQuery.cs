using MediatR;

namespace GarageFlow.CQRS.User.Queries.GetUserToken;

public class GetUserTokenQuery : IRequest<string>
{
    public string Email { get; set; }
    public string Password { get; set; }
}