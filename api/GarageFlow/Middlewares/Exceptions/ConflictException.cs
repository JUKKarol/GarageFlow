namespace GarageFlow.Middlewares.Exceptions;

public class ConflictException(string message) : Exception($"{message}")
{
}