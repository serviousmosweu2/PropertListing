using System;
using System.Threading;
using System.Threading.Tasks;
using DatabaseObjects;
using MediatR;

namespace BusinessObjects.Properties
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string StreatAddress1 { get; set; }
            public string Suburb { get; set; }

            public string City { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var property = await _context.LandProperties.FindAsync(request.Id);

                if (property == null)
                    throw new Exception("Could not find property");

                property.Title = request.Title ?? property.Title;            
                property.StreatAddress1 = request.StreatAddress1 ?? property.StreatAddress1;            
                property.Suburb = request.Suburb ?? property.Suburb;
                property.City = request.City ?? property.City;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}