using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using BusinessObjects.Errors;
using DatabaseObjects;
using Domain;
using MediatR;

namespace BusinessObjects.Properties
{
    public class Details
    {
        public class Query : IRequest<LandProperty>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, LandProperty>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<LandProperty> Handle(Query request, CancellationToken cancellationToken)
            {
                var property =  await _context.LandProperties.FindAsync(request.Id);
                 if (property == null)
                    throw new RestException(HttpStatusCode.NotFound, new { property = "Not Found" });
                return property;
            }
        }
    }
}