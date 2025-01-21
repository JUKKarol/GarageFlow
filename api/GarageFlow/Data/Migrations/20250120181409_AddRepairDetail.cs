using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GarageFlow.Migrations
{
    /// <inheritdoc />
    public partial class AddRepairDetail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Repairs");

            migrationBuilder.CreateTable(
                name: "RepairDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RepairId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RepairDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RepairDetails_Repairs_RepairId",
                        column: x => x.RepairId,
                        principalTable: "Repairs",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_RepairDetails_RepairId",
                table: "RepairDetails",
                column: "RepairId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RepairDetails");

            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "Repairs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
