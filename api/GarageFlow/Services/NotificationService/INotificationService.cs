using GarageFlow.Enums;

namespace GarageFlow.Services.NotificationService;

public interface INotificationService
{
    Task SendChangeRepairStatusEmail(string email, RepairStatus repairStatus);
}