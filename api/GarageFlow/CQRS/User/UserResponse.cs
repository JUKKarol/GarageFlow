﻿namespace GarageFlow.CQRS.User;

public class UserResponse
{
    public string Id { get; set; }
    public string Email { get; set; }
    public string UserName { get; set; }

    public List<string> Roles { get; set; }
}