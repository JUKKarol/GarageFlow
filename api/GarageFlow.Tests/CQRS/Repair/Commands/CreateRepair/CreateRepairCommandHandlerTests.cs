using AutoMapper;
using GarageFlow.CQRS.Repair;
using GarageFlow.CQRS.Repair.Commands.CreateRepair;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.CarRepository;
using GarageFlow.Repositories.RepairRepository;
using Moq;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace GarageFlow.Tests.CQRS.Repair.Commands.CreateRepair;

public class CreateRepairCommandHandlerTests
{
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<IRepairRepository> _repairRepositoryMock;
    private readonly Mock<ICarRepository> _carRepositoryMock;
    private readonly CreateRepairCommandHandler _handler;

    public CreateRepairCommandHandlerTests()
    {
        _mapperMock = new Mock<IMapper>();
        _repairRepositoryMock = new Mock<IRepairRepository>();
        _carRepositoryMock = new Mock<ICarRepository>();
        _handler = new CreateRepairCommandHandler(_mapperMock.Object, _repairRepositoryMock.Object, _carRepositoryMock.Object);
    }

    [Fact]
    public async Task Handle_ShouldCreateRepair_WhenCarIdIsValid()
    {
        // Arrange
        var command = new CreateRepairCommand
        {
            CarId = Guid.NewGuid(),
            Description = "Test Description",
            customerName = "John Doe",
            customerPhoneNumber = "1234567890",
            customerEmail = "john.doe@example.com",
            PlannedStartAt = DateOnly.FromDateTime(DateTime.Now),
            PlannedFinishAt = DateOnly.FromDateTime(DateTime.Now.AddDays(1))
        };

        var car = new GarageFlow.Entities.Car { Id = command.CarId };
        var repair = new GarageFlow.Entities.Repair { Id = Guid.NewGuid(), CarId = car.Id };
        var repairResponse = new RepairResponse { Id = repair.Id };

        _carRepositoryMock.Setup(repo => repo.GetCarById(command.CarId, It.IsAny<CancellationToken>())).ReturnsAsync(car);
        _mapperMock.Setup(mapper => mapper.Map<GarageFlow.Entities.Repair>(command)).Returns(repair);
        _repairRepositoryMock.Setup(repo => repo.CreateRepair(repair, It.IsAny<CancellationToken>())).ReturnsAsync(repair);
        _mapperMock.Setup(mapper => mapper.Map<RepairResponse>(repair)).Returns(repairResponse);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(repairResponse.Id, result.Id);
        _carRepositoryMock.Verify(repo => repo.GetCarById(command.CarId, It.IsAny<CancellationToken>()), Times.Once);
        _repairRepositoryMock.Verify(repo => repo.CreateRepair(repair, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Handle_ShouldThrowNotFoundException_WhenCarIdIsInvalid()
    {
        // Arrange
        var command = new CreateRepairCommand
        {
            CarId = Guid.NewGuid(),
            Description = "Test Description",
            customerName = "John Doe",
            customerPhoneNumber = "1234567890",
            customerEmail = "john.doe@example.com",
            PlannedStartAt = DateOnly.FromDateTime(DateTime.Now),
            PlannedFinishAt = DateOnly.FromDateTime(DateTime.Now.AddDays(1))
        };

        _carRepositoryMock.Setup(repo => repo.GetCarById(command.CarId, It.IsAny<CancellationToken>())).ReturnsAsync((GarageFlow.Entities.Car)null);

        // Act & Assert
        await Assert.ThrowsAsync<NotFoundException>(() => _handler.Handle(command, CancellationToken.None));
        _carRepositoryMock.Verify(repo => repo.GetCarById(command.CarId, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Handle_ShouldCreateRepair_WhenCarIdIsEmpty()
    {
        // Arrange
        var command = new CreateRepairCommand
        {
            CarId = Guid.Empty,
            Description = "Test Description",
            customerName = "John Doe",
            customerPhoneNumber = "1234567890",
            customerEmail = "john.doe@example.com",
            PlannedStartAt = DateOnly.FromDateTime(DateTime.Now),
            PlannedFinishAt = DateOnly.FromDateTime(DateTime.Now.AddDays(1))
        };

        var repair = new GarageFlow.Entities.Repair { Id = Guid.NewGuid(), CarId = null };
        var repairResponse = new RepairResponse { Id = repair.Id };

        _mapperMock.Setup(mapper => mapper.Map<GarageFlow.Entities.Repair>(command)).Returns(repair);
        _repairRepositoryMock.Setup(repo => repo.CreateRepair(repair, It.IsAny<CancellationToken>())).ReturnsAsync(repair);
        _mapperMock.Setup(mapper => mapper.Map<RepairResponse>(repair)).Returns(repairResponse);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(repairResponse.Id, result.Id);
        _repairRepositoryMock.Verify(repo => repo.CreateRepair(repair, It.IsAny<CancellationToken>()), Times.Once);
    }
}