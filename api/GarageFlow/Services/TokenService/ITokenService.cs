using GarageFlow.Entities;

namespace GarageFlow.Services.TokenService;

public interface ITokenService
{
    Task<string> GenerateToken(AppUser user);
}