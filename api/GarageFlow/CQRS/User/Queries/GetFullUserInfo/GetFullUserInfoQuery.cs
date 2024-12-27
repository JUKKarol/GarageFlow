using MediatR;

namespace GarageFlow.CQRS.User.Queries.GetFullUserInfo;

public class GetFullUserInfoQuery : IRequest<GetFullUserInfoResponse>
{
    public Guid UserId { get; set; }
}