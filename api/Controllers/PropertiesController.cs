using System.Collections.Generic;
using System.Threading.Tasks;
using DatabaseObjects;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly DataContext _context;

        public PropertiesController(DataContext context)
        {
            _context = context;

        }

        //Get
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Property>>> Get()
        {
            var properties = await _context.Properties.ToListAsync();
            return Ok(properties);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Property>> GetAction(int id)
        {
            var property = await _context.Properties.FindAsync(id);
            return Ok(property);
        }
    }
}