using GarageFlow.Enums;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace GarageFlow.Services.NotificationService;

public class NotificationService(IEmailSender emailSender) : INotificationService
{
    public async Task SendChangeRepairStatusEmail(string email, RepairStatus repairStatus)
    {
        string subject = "Your repair has been updated!";
        string message = $"<h1>Your repair changed status to {repairStatus}</h1><p>If you need more informations, call us!</p>";
        await emailSender.SendEmailAsync(email, subject, message);
    }
}