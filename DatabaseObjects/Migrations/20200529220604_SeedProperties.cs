using Microsoft.EntityFrameworkCore.Migrations;

namespace DatabaseObjects.Migrations
{
    public partial class SeedProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Properties",
                columns: new[] { "PropertyId", "IsAvailabe", "LandlordId", "LocationId", "MarketValue", "PropertyTypeId", "RentValue" },
                values: new object[] { 1, false, 1, 1, 0m, 1, 100m });

            migrationBuilder.InsertData(
                table: "Properties",
                columns: new[] { "PropertyId", "IsAvailabe", "LandlordId", "LocationId", "MarketValue", "PropertyTypeId", "RentValue" },
                values: new object[] { 2, false, 1, 1, 0m, 1, 100m });

            migrationBuilder.InsertData(
                table: "Properties",
                columns: new[] { "PropertyId", "IsAvailabe", "LandlordId", "LocationId", "MarketValue", "PropertyTypeId", "RentValue" },
                values: new object[] { 3, false, 1, 1, 0m, 1, 100m });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "PropertyId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "PropertyId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "PropertyId",
                keyValue: 3);
        }
    }
}
