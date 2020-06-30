using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using BusinessObjects.Errors;
using DatabaseObjects;
using FluentValidation;
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
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.StreatAddress1).NotEmpty();
                RuleFor(x => x.Suburb).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
            }
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