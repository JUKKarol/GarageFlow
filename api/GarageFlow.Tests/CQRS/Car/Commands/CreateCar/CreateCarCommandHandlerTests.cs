using AutoMapper;
using GarageFlow.CQRS.Car;
using GarageFlow.CQRS.Car.Commands.CreateCar;
using GarageFlow.Entities;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.CarRepository;
using GarageFlow.Repositories.ModelRepository;
using Moq;
using Xunit;

namespace GarageFlow.Tests.CQRS.Car.Commands.CreateCar;

public class CreateCarCommandHandlerTests
{
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<ICarRepository> _carRepositoryMock;
    private readonly Mock<IModelRepository> _modelRepositoryMock;
    private readonly CreateCarCommandHandler _handler;

    public CreateCarCommandHandlerTests()
    {
        _mapperMock = new Mock<IMapper>();
        _carRepositoryMock = new Mock<ICarRepository>();
        _modelRepositoryMock = new Mock<IModelRepository>();
        _handler = new CreateCarCommandHandler(_mapperMock.Object, _carRepositoryMock.Object, _modelRepositoryMock.Object);
    }

    [Fact]
    public async Task Handle_ModelNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var command = new CreateCarCommand { ModelId = Guid.NewGuid() };
        _modelRepositoryMock.Setup(repo => repo.GetModelById(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((Model)null);

        // Act & Assert
        await Assert.ThrowsAsync<NotFoundException>(() => _handler.Handle(command, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_CarWithVinAlreadyExists_ThrowsConflictException()
    {
        // Arrange
        var command = new CreateCarCommand { ModelId = Guid.NewGuid(), Vin = "1234567890" };
        var model = new Model { Id = command.ModelId };
        _modelRepositoryMock.Setup(repo => repo.GetModelById(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(model);
        _carRepositoryMock.Setup(repo => repo.GetCarByVin(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new GarageFlow.Entities.Car());

        // Act & Assert
        await Assert.ThrowsAsync<ConflictException>(() => _handler.Handle(command, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_ValidRequest_ReturnsCarResponse()
    {
        // Arrange
        var command = new CreateCarCommand { ModelId = Guid.NewGuid(), Vin = "1234567890" };
        var model = new Model { Id = command.ModelId };
        var car = new GarageFlow.Entities.Car { Id = Guid.NewGuid(), Vin = command.Vin };
        var carResponse = new CarResponse { Id = car.Id, Vin = car.Vin };

        _modelRepositoryMock.Setup(repo => repo.GetModelById(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(model);
        _carRepositoryMock.Setup(repo => repo.GetCarByVin(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((GarageFlow.Entities.Car)null);
        _mapperMock.Setup(mapper => mapper.Map<GarageFlow.Entities.Car>(It.IsAny<CreateCarCommand>()))
            .Returns(car);
        _mapperMock.Setup(mapper => mapper.Map<CarResponse>(It.IsAny<GarageFlow.Entities.Car>()))
            .Returns(carResponse);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(carResponse.Id, result.Id);
        Assert.Equal(carResponse.Vin, result.Vin);
    }
}