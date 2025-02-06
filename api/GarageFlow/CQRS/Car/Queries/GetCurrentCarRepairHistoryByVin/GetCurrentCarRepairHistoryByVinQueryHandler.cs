using AutoMapper;
using GarageFlow.CQRS.Car.Queries.GetCars;
using GarageFlow.CQRS.RepairHistory;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.CarRepository;
using GarageFlow.Repositories.RepairHistoryRepository;
using GarageFlow.Repositories.RepairRepository;
using MediatR;

namespace GarageFlow.CQRS.Car.Queries.GetCurrentCarRepairHistoryByVin;

public class GetCurrentCarRepairHistoryByVinQueryHandler(IMapper mapper,
    ICarRepository carRepository,
    IRepairRepository repairRepository,
    IRepairHistoryRepository repairHistoryRepository) : IRequestHandler<GetCurrentCarRepairHistoryByVinQuery, List<RepairHistoryResponse>>
{
    public async Task<List<RepairHistoryResponse>> Handle(GetCurrentCarRepairHistoryByVinQuery request, CancellationToken cancellationToken)
    {
        var car = await carRepository.GetCarByVin(request.Vin, cancellationToken);
        if (car == null)
        {
            throw new NotFoundException(nameof(Car), request.Vin);
        }

        var repair = await repairRepository.GetNewestRepairByCarId(car.Id, cancellationToken);
        if (repair == null)
        {
            throw new NotFoundException(nameof(Repair), car.Id.ToString());
        }

        var repairHistory = await repairHistoryRepository.GetRepairHistoryByRepairId(repair.Id, cancellationToken);
        var repairHistoryDto = mapper.Map<List<RepairHistoryResponse>>(repairHistory);
        return repairHistoryDto;
    }
}