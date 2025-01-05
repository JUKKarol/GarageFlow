using GarageFlow.Entities;
using Sieve.Models;

namespace GarageFlow.Repositories.CarRepository;

public interface ICarRepository
{
    Task<Car> CreateCar(Car car, CancellationToken cancellationToken);

    Task<Car> UpdateCar(Car car, CancellationToken cancellationToken);

    Task<List<Car>> GetAllCars(SieveModel query, CancellationToken cancellationToken);

    Task<int> GetCarsCount(SieveModel query, CancellationToken cancellationToken);

    Task<Car> GetCarById(Guid carId, CancellationToken cancellationToken);
}