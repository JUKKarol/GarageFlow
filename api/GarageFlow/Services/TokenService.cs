using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using GarageFlow.Configuration;
using Microsoft.Extensions.Options;

namespace GarageFlow.Services;

public class TokenService(IOptions<AppSettings> appSettings)
{
    public string GenerateToken(string userId)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(appSettings.Value.JWT.SigningKey);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId)
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            Issuer = appSettings.Value.JWT.Issuer,
            Audience = appSettings.Value.JWT.Audience,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}