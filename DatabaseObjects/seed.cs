using System.Collections.Generic;
using System.Linq;
using Domain;

namespace DatabaseObjects
{
    public class seed
    {
        public static void SeedData(DataContext context)
        {
            if(!context.LandProperties.Any())
            {
                var LandProperties = new List<LandProperty>
                {
                    new LandProperty{
                         Title = "3 Bedroom",StreatAddress1 ="1000", Suburb = "10",City="1"
                        },
                    new LandProperty{
                         Title = "3 Bedroom",StreatAddress1 ="1000", Suburb = "10",City="1"
                        },
                    new LandProperty{
                         Title = "3 Bedroom",StreatAddress1 ="1000", Suburb = "10",City="1"
                        },
                    new LandProperty{
                         Title = "3 Bedroom",StreatAddress1 ="1000", Suburb = "10",City="1"
                        }
                };

                context.LandProperties.AddRange(LandProperties);
                context.SaveChanges();
            }
        }
    }
}