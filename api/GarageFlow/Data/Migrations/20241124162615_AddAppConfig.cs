using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GarageFlow.Migrations
{
    /// <inheritdoc />
    public partial class AddAppConfig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUserRepair_Repair_RepairsId",
                table: "AppUserRepair");

            migrationBuilder.DropForeignKey(
                name: "FK_Repair_Cars_CarId",
                table: "Repair");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Repair",
                table: "Repair");

            migrationBuilder.RenameTable(
                name: "Repair",
                newName: "Repairs");

            migrationBuilder.RenameIndex(
                name: "IX_Repair_CarId",
                table: "Repairs",
                newName: "IX_Repairs_CarId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Repairs",
                table: "Repairs",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "AppConfig",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RepairsLimit = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppConfig", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserRepair_Repairs_RepairsId",
                table: "AppUserRepair",
                column: "RepairsId",
                principalTable: "Repairs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Repairs_Cars_CarId",
                table: "Repairs",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUserRepair_Repairs_RepairsId",
                table: "AppUserRepair");

            migrationBuilder.DropForeignKey(
                name: "FK_Repairs_Cars_CarId",
                table: "Repairs");

            migrationBuilder.DropTable(
                name: "AppConfig");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Repairs",
                table: "Repairs");

            migrationBuilder.RenameTable(
                name: "Repairs",
                newName: "Repair");

            migrationBuilder.RenameIndex(
                name: "IX_Repairs_CarId",
                table: "Repair",
                newName: "IX_Repair_CarId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Repair",
                table: "Repair",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserRepair_Repair_RepairsId",
                table: "AppUserRepair",
                column: "RepairsId",
                principalTable: "Repair",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Repair_Cars_CarId",
                table: "Repair",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id");
        }
    }
}
