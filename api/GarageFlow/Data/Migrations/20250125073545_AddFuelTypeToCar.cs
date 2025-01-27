using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GarageFlow.Migrations
{
    /// <inheritdoc />
    public partial class AddFuelTypeToCar : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FuelType",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FuelType",
                table: "Cars");
        }
    }
}
