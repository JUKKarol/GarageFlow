namespace GarageFlow.Middlewares.Exceptions;

public class BadRequestException(string message) : Exception($"{message}")
{
}