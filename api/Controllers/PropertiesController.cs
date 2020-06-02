using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessObjects.Properties;
using DatabaseObjects;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PropertiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        //Get
        [HttpGet]
        public async Task<ActionResult<List<Property>>> List()
        {
           return  await _mediator.Send(new List.Query());
            
        }

        [HttpGet("{propertyId}")]
        public async Task<ActionResult<Property>> Details(int propertyId)
        {
            return await _mediator.Send(
                new Details.Query{PropertyId = propertyId});
        }

       
    }
}