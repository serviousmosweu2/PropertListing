using System;
using System.Threading;
using System.Threading.Tasks;
using DatabaseObjects;
using Domain;
using FluentValidation;
using MediatR;

namespace BusinessObjects.Properties
{
    public class Create
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
                RuleFor(x =>x.Title).NotEmpty();
                RuleFor(x =>x.StreatAddress1).NotEmpty();
                RuleFor(x =>x.Suburb).NotEmpty();
                RuleFor(x =>x.City).NotEmpty();
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
                var property = new LandProperty
                {
                    Id = request.Id,
                    Title = request.Title,
                    StreatAddress1 = request.StreatAddress1,
                    Suburb = request.Suburb,
                    City = request.City
                };

                _context.LandProperties.Add(property);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}