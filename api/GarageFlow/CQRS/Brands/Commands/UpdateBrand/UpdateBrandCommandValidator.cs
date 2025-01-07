using FluentValidation;

namespace GarageFlow.CQRS.Brands.Commands.UpdateBrand;

public class UpdateBrandCommandValidator : AbstractValidator<UpdateBrandCommand>
{
    public UpdateBrandCommandValidator()
    {
        RuleFor(b => b.Id)
            .NotEmpty();

        RuleFor(b => b.Name)
            .NotEmpty()
            .Length(1, 30);
    }
}