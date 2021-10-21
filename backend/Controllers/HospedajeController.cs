using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections;
using backend.Context;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HospedajeController : ControllerBase
    {
        private readonly AppDbContext context;

        public HospedajeController(AppDbContext context)
        {
            this.context = context;
        }
        //private static Hospedaje[] Hospedajes = Enumerable.Range(1, 5).Select(index => new Hospedaje
        //{
        //    Id = index,
        //    Titulo = "Hospedaje de ejemplo " + index,
        //    Tipo = "Apartamento",
        //    Direccion = "Cra " + index,
        //    Ubicacion = "Facatativa",
        //    Precio = index*1000,
        //    UserId = index,
        //    Servicios = new string[] { "Wifi", "Television" },
        //    Imagen = "https://res.cloudinary.com/drwoisvgb/image/upload/v1632877491/s8ki07h9d7toqqdmemjf.jpg"
        //}).ToArray();

        // GET: api/<HospedajeController>

        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<Hospedaje> Get()
        {

            return context.Hospedaje.ToList();
        }

        // GET api/<HospedajeController>/5
        [HttpGet("{id}")]
        public Hospedaje Get(int id)
        {
            var x = context.Hospedaje.FirstOrDefault(p => p.id == id);
            return x;
        }

        // POST api/<HospedajeController>
        [HttpPost]
        public void Post([FromBody] Hospedaje hospedaje)
        {
            context.Hospedaje.Add(hospedaje);
            context.SaveChanges();
        }

        // PUT api/<HospedajeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Hospedaje hospedaje)
        {
            if (hospedaje.id == id)
            {
                context.Entry(hospedaje).State = EntityState.Modified;
                context.SaveChanges();

            }

        }

        // DELETE api/<HospedajeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var hosp = context.Hospedaje.FirstOrDefault(x => x.id == id);
            if (hosp != null)
            {
                context.Hospedaje.Remove(hosp);
                context.SaveChanges();
            }
        }

        // GET api/<HospedajeController>/search?query=<Location>
        [HttpGet]
        [Route("search")]
        public IActionResult SearchByLocation([FromQuery] string query)
        {
            var result = context.Hospedaje.Where(p => p.ubicacion.ToLower().Contains(query.ToLower())).ToList();
            return Ok(result);
        }

    }
}
