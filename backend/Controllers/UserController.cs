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
    public class UserController : Controller
    {
        private static User[] users = Enumerable.Range(1, 20).Select(index => new User
        {
            Id = index,
            Nombre = "Usuario " + index,
            Cedula = "Cedula" + index,
            Ubicacion = "Facatativa"
        }).ToArray();

        // GET: api/<InmuebleController>
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return users;
        }

        // GET api/<InmuebleController>/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            for (int i = 0; i < users.Length; i++)
            {
                if (users[i].Id == id)
                {
                    return users[i];
                }
            }

            return null;
        }

        // POST api/<InmuebleController>
        [HttpPost]
        public void Post([FromBody] User user)
        {
            //Solo para ver el numero. Error al eliminar
            user.Id = users.Count() + 1;
            users = users.Append(user).ToArray();
        }

        // PUT api/<InmuebleController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] User user)
        {
            int indexAEditar = users.ToList().FindIndex(n => n.Id == id);

            users[indexAEditar].Nombre = user.Nombre;
            users[indexAEditar].Cedula = user.Cedula;
            users[indexAEditar].Ubicacion = user.Ubicacion;

        }

        // DELETE api/<InmuebleController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            int indexABorrar = users.ToList().FindIndex(n => n.Id == id);
            users = users.Where((source, index) => index != indexABorrar).ToArray();
        }
    }
}
