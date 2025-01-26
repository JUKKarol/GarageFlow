using AutoMapper;
using GarageFlow.CQRS.Car;
using GarageFlow.CQRS.Car.Commands.UpdateCar;
using GarageFlow.Entities;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.CarRepository;
using GarageFlow.Repositories.ModelRepository;
using Moq;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace GarageFlow.Tests.CQRS.Car.Commands.UpdateCar;

public class UpdateCarCommandHandlerTests
{
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<ICarRepository> _carRepositoryMock;
    private readonly Mock<IModelRepository> _modelRepositoryMock;
    private readonly UpdateCarCommandHandler _handler;

    public UpdateCarCommandHandlerTests()
    {
        _mapperMock = new Mock<IMapper>();
        _carRepositoryMock = new Mock<ICarRepository>();
        _modelRepositoryMock = new Mock<IModelRepository>();
        _handler = new UpdateCarCommandHandler(_mapperMock.Object, _carRepositoryMock.Object, _modelRepositoryMock.Object);
    }

    [Fact]
    public async Task Handle_CarNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var command = new UpdateCarCommand { Id = Guid.NewGuid() };
        _carRepositoryMock.Setup(repo => repo.GetCarById(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((GarageFlow.Entities.Car)null);

        // Act & Assert
        await Assert.ThrowsAsync<NotFoundException>(() => _handler.Handle(command, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_CarWithVinExists_ThrowsConflictException()
    {
        // Arrange
        var command = new UpdateCarCommand { Id = Guid.NewGuid(), Vin = "12345" };
        var existingCar = new GarageFlow.Entities.Car { Id = Guid.NewGuid(), Vin = "12345" };
        _carRepositoryMock.Setup(repo => repo.GetCarById(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new GarageFlow.Entities.Car());
        _carRepositoryMock.Setup(repo => repo.GetCarByVin(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(existingCar);

        // Act & Assert
        await Assert.ThrowsAsync<ConflictException>(() => _handler.Handle(command, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_ModelNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var command = new UpdateCarCommand { Id = Guid.NewGuid(), Vin = "12345", ModelId = Guid.NewGuid() };
        _carRepositoryMock.Setup(repo => repo.GetCarById(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new GarageFlow.Entities.Car());
        _carRepositoryMock.Setup(repo => repo.GetCarByVin(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((GarageFlow.Entities.Car)null);
        _modelRepositoryMock.Setup(repo => repo.GetModelById(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((Model)null);

        // Act & Assert
        await Assert.ThrowsAsync<NotFoundException>(() => _handler.Handle(command, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_ValidCommand_UpdatesCar()
    {
        // Arrange
        var command = new UpdateCarCommand { Id = Guid.NewGuid(), Vin = "12345", ModelId = Guid.NewGuid() };
        var car = new GarageFlow.Entities.Car { Id = command.Id, Vin = command.Vin, ModelId = command.ModelId };
        var model = new Model { Id = command.ModelId };
        var carResponse = new CarResponse { Id = command.Id, Vin = command.Vin, ModelId = command.ModelId };

        _carRepositoryMock.Setup(repo => repo.GetCarById(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(car);
        _carRepositoryMock.Setup(repo => repo.GetCarByVin(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((GarageFlow.Entities.Car)null);
        _modelRepositoryMock.Setup(repo => repo.GetModelById(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(model);
        _mapperMock.Setup(mapper => mapper.Map<GarageFlow.Entities.Car>(It.IsAny<UpdateCarCommand>()))
            .Returns(car);
        _mapperMock.Setup(mapper => mapper.Map<CarResponse>(It.IsAny<GarageFlow.Entities.Car>()))
            .Returns(carResponse);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        Assert.Equal(carResponse, result);
        _carRepositoryMock.Verify(repo => repo.UpdateCar(It.IsAny<GarageFlow.Entities.Car>(), It.IsAny<CancellationToken>()), Times.Once);
    }
}