using System.Collections.Generic;
using System.Linq;
using Domain;

namespace DatabaseObjects
{
    public class seed
    {
        public static void SeedData(DataContext context)
        {
            if(!context.Properties.Any())
            {
                var properties = new List<Property>
                {
                    new Property{
                         IsAvailabe = true,MarketValue =1000, RentValue = 10,LandlordId=1,PropertyTypeId=1,LocationId = 1
                        },
                    new Property{
                         IsAvailabe = false,MarketValue =1000, RentValue = 10,LandlordId=1,PropertyTypeId=1,LocationId = 1
                        },
                    new Property{
                         IsAvailabe = true,MarketValue =1000, RentValue = 10,LandlordId=1,PropertyTypeId=1,LocationId = 1
                        },
                    new Property{
                         IsAvailabe = false,MarketValue =1000, RentValue = 10,LandlordId=1,PropertyTypeId=1,LocationId = 1
                        }
                };

                context.Properties.AddRange(properties);
                context.SaveChanges();
            }
        }
    }
}