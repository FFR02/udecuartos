using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using backend.Context;
using Microsoft.EntityFrameworkCore;
using backend.Helper;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly AppDbContext context;

        public UserController(AppDbContext context)
        {
            this.context = context;
        }
        //private static User[] users = Enumerable.Range(1, 20).Select(index => new User
        //{
        //    Id = index,
        //    Nombre = "Usuario " + index,
        //    Cedula = "Cedula" + index,
        //    Ubicacion = "Facatativa"
        //}).ToArray();

        // GET: api/<InmuebleController>
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return context.User.ToList();
        }

        // GET api/<InmuebleController>/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            var x = context.User.FirstOrDefault(p => p.id == id);
            return x;
        }
        //Crea el usuario con la clave hash
        // POST api/<InmuebleController>
        [HttpPost]
        public void Post([FromBody] User user)
        {
            var hash = HashHelper.Hash(user.clave);
            user.clave = hash.Password;
            user.sal = hash.Salt;
            context.User.Add(user);
            context.SaveChanges();
        }

        // PUT api/<InmuebleController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] User user)
        {
            if (user.id == id)
            {
                context.Entry(user).State = EntityState.Modified;
                context.SaveChanges();

            }

        }

        // DELETE api/<InmuebleController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var usuario = context.User.FirstOrDefault(x => x.id == id);
            if (usuario != null)
            {
                context.User.Remove(usuario);
                context.SaveChanges();
            }
        }
    }
}
