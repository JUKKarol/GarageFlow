using AutoMapper;
using GarageFlow.CQRS.RepairDetail;
using GarageFlow.CQRS.RepairDetail.Commands.CreateRepairDetail;
using GarageFlow.Entities;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.RepairDetailRepository;
using GarageFlow.Repositories.RepairRepository;
using Moq;
using Xunit;

namespace GarageFlow.Tests.CQRS.RepairDetail.Commands.CreateRepairDetail;

public class CreateRepairDetailCommandHandlerTests
{
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<IRepairDetailRepository> _repairDetailRepositoryMock;
    private readonly Mock<IRepairRepository> _repairRepositoryMock;
    private readonly CreateRepairDetailCommandHandler _handler;

    public CreateRepairDetailCommandHandlerTests()
    {
        _mapperMock = new Mock<IMapper>();
        _repairDetailRepositoryMock = new Mock<IRepairDetailRepository>();
        _repairRepositoryMock = new Mock<IRepairRepository>();
        _handler = new CreateRepairDetailCommandHandler(
            _mapperMock.Object,
            _repairDetailRepositoryMock.Object,
            _repairRepositoryMock.Object
        );
    }

    [Fact]
    public async Task Handle_RepairNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var command = new CreateRepairDetailCommand
        {
            Name = "Test Repair Detail",
            Price = 100,
            RepairId = Guid.NewGuid()
        };

        _repairRepositoryMock
            .Setup(repo => repo.GetRepairById(command.RepairId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((GarageFlow.Entities.Repair)null);

        // Act & Assert
        await Assert.ThrowsAsync<NotFoundException>(() => _handler.Handle(command, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_ValidRequest_CreatesRepairDetail()
    {
        // Arrange
        var command = new CreateRepairDetailCommand
        {
            Name = "Test Repair Detail",
            Price = 100,
            RepairId = Guid.NewGuid()
        };

        var repair = new GarageFlow.Entities.Repair { Id = command.RepairId };
        var repairDetail = new GarageFlow.Entities.RepairDetail { Id = Guid.NewGuid(), Name = command.Name, Price = command.Price, RepairId = command.RepairId };
        var repairDetailResponse = new RepairDetailResponse { Id = repairDetail.Id, Name = repairDetail.Name, Price = repairDetail.Price, RepairId = repairDetail.RepairId };

        _repairRepositoryMock
            .Setup(repo => repo.GetRepairById(command.RepairId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(repair);

        _mapperMock
            .Setup(mapper => mapper.Map<GarageFlow.Entities.RepairDetail>(command))
            .Returns(repairDetail);

        _repairDetailRepositoryMock
            .Setup(repo => repo.CreateRepairDetail(repairDetail, It.IsAny<CancellationToken>()))
            .ReturnsAsync(repairDetail);

        _mapperMock
            .Setup(mapper => mapper.Map<RepairDetailResponse>(repairDetail))
            .Returns(repairDetailResponse);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(repairDetailResponse.Id, result.Id);
        Assert.Equal(repairDetailResponse.Name, result.Name);
        Assert.Equal(repairDetailResponse.Price, result.Price);
        Assert.Equal(repairDetailResponse.RepairId, result.RepairId);
    }
}