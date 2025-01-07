using FluentValidation;

namespace GarageFlow.CQRS.Brands.Commands.CreateBrand;

public class CreateBrandCommandValidator : AbstractValidator<CreateBrandCommand>
{
    public CreateBrandCommandValidator()
    {
        RuleFor(b => b.Name)
            .NotEmpty()
            .Length(1, 30);
    }
}