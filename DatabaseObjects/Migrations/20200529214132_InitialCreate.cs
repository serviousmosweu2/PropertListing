using Microsoft.EntityFrameworkCore.Migrations;

namespace DatabaseObjects.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Properties",
                columns: table => new
                {
                    PropertyId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsAvailabe = table.Column<bool>(nullable: false),
                    MarketValue = table.Column<decimal>(nullable: false),
                    RentValue = table.Column<decimal>(nullable: false),
                    LandlordId = table.Column<int>(nullable: false),
                    PropertyTypeId = table.Column<int>(nullable: false),
                    LocationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Properties", x => x.PropertyId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Properties");
        }
    }
}
