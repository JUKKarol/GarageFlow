﻿using Microsoft.AspNetCore.Identity;

namespace GarageFlow.Entities;

public class AppUser : IdentityUser
{
    public List<Repair> Repairs { get; set; }
}