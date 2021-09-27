    using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospedajeController : ControllerBase
    {
        private static Hospedaje[] Hospedajes = Enumerable.Range(1, 5).Select(index => new Hospedaje
        {
            Id = index,
            Titulo = "Hospedaje de ejemplo " + index,
            Tipo = "Apartamento",
            Direccion = "Cra " + index,
            Ubicacion = "Facatativa",
            Precio = index*1000,
            UserId = index,
            Servicios = new string[] { "Wifi", "Television" },
            Imagen = "https://res.cloudinary.com/drwoisvgb/image/upload/v1632877491/s8ki07h9d7toqqdmemjf.jpg"
        }).ToArray();

        // GET: api/<HospedajeController>
        [HttpGet]
        public IEnumerable<Hospedaje> Get()
        {
            return Hospedajes;
        }

        // GET api/<HospedajeController>/5
        [HttpGet("{id}")]
        public Hospedaje Get(int id)
        {
            for (int i = 0; i < Hospedajes.Length; i++)
            {
                if (Hospedajes[i].Id == id)
                {
                    return Hospedajes[i];
                }
            }

            return null;
        }

        // POST api/<HospedajeController>
        [HttpPost]
        public void Post([FromBody] Hospedaje hospedaje)
        {
            //Solo para ver el numero. Error al eliminar
            hospedaje.Id = Hospedajes.Count() + 1;
            Hospedajes = Hospedajes.Append(hospedaje).ToArray();
        }

        // PUT api/<HospedajeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Hospedaje hospedaje)
        {
            int indexAEditar = Hospedajes.ToList().FindIndex(n => n.Id == id);

            Hospedajes[indexAEditar].Titulo = hospedaje.Titulo;
            Hospedajes[indexAEditar].Tipo = hospedaje.Tipo;
            Hospedajes[indexAEditar].Direccion = hospedaje.Direccion;
            Hospedajes[indexAEditar].Ubicacion = hospedaje.Ubicacion;
            Hospedajes[indexAEditar].Precio = hospedaje.Precio;

        }

        // DELETE api/<HospedajeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            int indexABorrar = Hospedajes.ToList().FindIndex(n => n.Id == id);
            Hospedajes = Hospedajes.Where((source, index) => index != indexABorrar).ToArray();
        }
    }
}
