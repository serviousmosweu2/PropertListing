using System;

namespace Domain
{
    public class Property
    {
        public int PropertyId { get; set; }
        public bool IsAvailabe { get; set; }
        public decimal MarketValue { get; set; }
        public decimal RentValue  { get; set; }
        public int LandlordId{get;set;}
        public int PropertyTypeId { get; set; }
        public int LocationId { get; set; }
    }
}
