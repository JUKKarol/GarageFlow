using GarageFlow.Entities;

namespace GarageFlow.Services;

public interface ITokenService
{
    Task<string> GenerateToken(AppUser user);
}