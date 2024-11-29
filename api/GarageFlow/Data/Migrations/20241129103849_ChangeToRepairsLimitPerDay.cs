using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GarageFlow.Migrations
{
    /// <inheritdoc />
    public partial class ChangeToRepairsLimitPerDay : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RepairsLimit",
                table: "AppConfig",
                newName: "RepairsLimitPerDay");

            migrationBuilder.AddColumn<DateTime>(
                name: "FinisheEstimatedAt",
                table: "Repairs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "FinishedAt",
                table: "Repairs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "PriceEstimate",
                table: "Repairs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartedAt",
                table: "Repairs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartedEstimateAt",
                table: "Repairs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FinisheEstimatedAt",
                table: "Repairs");

            migrationBuilder.DropColumn(
                name: "FinishedAt",
                table: "Repairs");

            migrationBuilder.DropColumn(
                name: "PriceEstimate",
                table: "Repairs");

            migrationBuilder.DropColumn(
                name: "StartedAt",
                table: "Repairs");

            migrationBuilder.DropColumn(
                name: "StartedEstimateAt",
                table: "Repairs");

            migrationBuilder.RenameColumn(
                name: "RepairsLimitPerDay",
                table: "AppConfig",
                newName: "RepairsLimit");
        }
    }
}
