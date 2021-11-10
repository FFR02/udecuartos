using backend.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MisHospedajesController : ControllerBase
    {
        private readonly AppDbContext context;

        public MisHospedajesController(AppDbContext context)
        {
            this.context = context;
        }
        // GET: api/<MisHospedajesController>
        [HttpGet("{id}")]
        public IEnumerable<Hospedaje> Get(int id)
        {
            return context.Hospedaje.Where(x => x.iduser == id).ToList();
        }
    }
}
