using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InmuebleController : Controller
    {
        private static Inmueble[] inmuebles = Enumerable.Range(1, 20).Select(index => new Inmueble
        {
            InmuebleId = index,
            Titulo = "Hospedaje de ejemplo " + index,
            Tipo = "Apartamento",
            Ubicacion = "Facatativa",
            Precio = index*10,
            UserId = index,
            Servicios = new string[] { "Wifi", "Television" }
        }).ToArray();

        // GET: api/<InmuebleController>
        [HttpGet]
        public IEnumerable<Inmueble> Get()
        {
            return inmuebles;
        }

        // GET api/<InmuebleController>/5
        [HttpGet("{id}")]
        public Inmueble Get(int id)
        {
            for (int i = 0; i < inmuebles.Length; i++)
            {
                if (inmuebles[i].InmuebleId == id)
                {
                    return inmuebles[i];
                }
            }

            return null;
        }

        // POST api/<InmuebleController>
        [HttpPost]
        public void Post([FromBody] Inmueble inmueble)
        {
            //Solo para ver el numero. Error al eliminar
            inmueble.InmuebleId = inmuebles.Count() + 1;
            inmuebles = inmuebles.Append(inmueble).ToArray();
        }

        // PUT api/<InmuebleController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Inmueble inmueble)
        {
            int indexAEditar = inmuebles.ToList().FindIndex(n => n.InmuebleId == id);

            inmuebles[indexAEditar].Titulo = inmueble.Titulo;
            inmuebles[indexAEditar].Tipo = inmueble.Tipo;
            inmuebles[indexAEditar].Ubicacion = inmueble.Ubicacion;
            inmuebles[indexAEditar].Precio = inmueble.Precio;
            inmuebles[indexAEditar].UserId = inmueble.UserId;
            inmuebles[indexAEditar].Servicios = inmueble.Servicios;

        }

        // DELETE api/<InmuebleController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            int indexABorrar = inmuebles.ToList().FindIndex(n => n.InmuebleId == id);
            inmuebles = inmuebles.Where((source, index) => index != indexABorrar).ToArray();
        }
    }
}
