using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace DatabaseObjects
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options):base(options)
        {
            
        }

        public DbSet<Property> Properties {get;set;}

        protected override void OnModelCreating (ModelBuilder builder)
        {
            /*builder.Entity<Property>()
                .HasData(
                    new Property {PropertyId=1, IsAvailabe=false,MarketValue = 0, RentValue=100,LandlordId=1,PropertyTypeId=1, LocationId = 1},
                    new Property {PropertyId=2, IsAvailabe=false,MarketValue = 0, RentValue=100,LandlordId=1,PropertyTypeId=1, LocationId = 1},
                    new Property {PropertyId=3, IsAvailabe=false,MarketValue = 0, RentValue=100,LandlordId=1,PropertyTypeId=1, LocationId = 1}
                ); */
        }
    }
}
