using MediatR;

namespace GarageFlow.CQRS.User.Queries.GetAllUsers;

public class GetAllUsersQuery : IRequest<List<UserResponse>>
{
}