using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using BusinessObjects.Errors;
using DatabaseObjects;
using MediatR;

namespace BusinessObjects.Properties
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                    throw new RestException(HttpStatusCode.NotFound, new { property = "Not Found" });

                _context.Remove(property);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}