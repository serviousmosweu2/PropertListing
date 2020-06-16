using System;

namespace Domain
{
    public class LandProperty
    {
        public Guid Id { get; set; }
        public string Title {get;set;}
        public string StreatAddress1 { get; set; }
        public string Suburb {get;set;}
        public string City{get;set;}
    }
}
