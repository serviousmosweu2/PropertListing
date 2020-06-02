using System.Threading;
using System.Threading.Tasks;
using DatabaseObjects;
using Domain;
using MediatR;

namespace BusinessObjects.Properties
{
    public class Details
    {
        public class Query : IRequest<Property>
        {
            public int PropertyId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Property>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Property> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity =  await _context.Properties.FindAsync(request.PropertyId);
                return activity;
            }
        }
    }
}