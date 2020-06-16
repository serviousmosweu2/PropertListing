using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DatabaseObjects;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BusinessObjects.Properties
{
    public class List
    {
        public class Query : IRequest<List<LandProperty>> { }
        public class Handler : IRequestHandler<Query, List<LandProperty>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<LandProperty>> Handle(Query request, CancellationToken cancellationToken)
            {
                var properties =  await _context.LandProperties.ToListAsync();
                return properties;
            }
        }
    }
}