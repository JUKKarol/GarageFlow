using GarageFlow.Constants;
using Microsoft.AspNetCore.Identity;

namespace GarageFlow.CQRS.User.Queries.GetFullUserInfo;

public class GetFullUserInfoResponse
{
    public Guid UserId { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public bool EmailConfirmed { get; set; }
    public string PhoneNumber { get; set; }
    public List<string> Roles { get; set; }
}