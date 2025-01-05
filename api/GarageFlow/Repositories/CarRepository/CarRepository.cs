using GarageFlow.Data;
using GarageFlow.Entities;
using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;

namespace GarageFlow.Repositories.CarRepository;

public class CarRepository(AppDbContext db,
    ISieveProcessor sieveProcessor) : ICarRepository
{
    public async Task<Car> CreateCar(Car car, CancellationToken cancellationToken)
    {
        await db.Cars.AddAsync(car, cancellationToken);
        await db.SaveChangesAsync(cancellationToken);
        return car;
    }

    public async Task<Car> UpdateCar(Car car, CancellationToken cancellationToken)
    {
        db.Cars.Update(car);
        await db.SaveChangesAsync(cancellationToken);
        return car;
    }

    public async Task<List<Car>> GetAllCars(SieveModel query, CancellationToken cancellationToken)
    {
        var car = db
            .Cars
            .AsNoTracking()
            .AsQueryable();

        return await sieveProcessor
            .Apply(query, car)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<int> GetCarsCount(SieveModel query, CancellationToken cancellationToken)
    {
        var cars = db
            .Cars
            .AsNoTracking()
            .AsQueryable();

        return await sieveProcessor
            .Apply(query, cars, applyPagination: false)
            .CountAsync(cancellationToken);
    }

    public async Task<Car> GetCarById(Guid carId, CancellationToken cancellationToken)
    {
        return await db.Cars.AsNoTracking().FirstOrDefaultAsync(c => c.Id == carId, cancellationToken);
    }
}