using AutoMapper;
using GarageFlow.CQRS.Car.Queries.GetCurrentCarRepairHistoryByVin;
using GarageFlow.CQRS.Repair;
using GarageFlow.CQRS.RepairHistory;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.CarRepository;
using GarageFlow.Repositories.RepairHistoryRepository;
using GarageFlow.Repositories.RepairRepository;
using MediatR;

namespace GarageFlow.CQRS.Car.Queries.GetCarRepairsByVin;

public class GetCarRepairsByVinQueryHandler(IMapper mapper,
    ICarRepository carRepository,
    IRepairRepository repairRepository,
    IRepairHistoryRepository repairHistoryRepository) : IRequestHandler<GetCarRepairsByVinQuery, List<RepairWithDetailsResponse>>
{
    public async Task<List<RepairWithDetailsResponse>> Handle(GetCarRepairsByVinQuery request, CancellationToken cancellationToken)
    {
        var car = await carRepository.GetCarByVin(request.Vin, cancellationToken);
        if (car == null)
        {
            throw new NotFoundException(nameof(Car), request.Vin);
        }

        var repairs = await repairRepository.GetRepairsByCarId(car.Id, cancellationToken);
        var repairsDto = mapper.Map<List<RepairWithDetailsResponse>>(repairs);
        return repairsDto;
    }
}