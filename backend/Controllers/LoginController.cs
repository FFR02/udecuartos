using backend.Context;
using backend.Helper;
using backend.Models;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class LoginController : ControllerBase
    {
        private readonly AppDbContext context;
        private readonly IConfiguration config;
        public LoginController(AppDbContext context, IConfiguration configuration)
        {
            this.context = context;
            this.config = configuration;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Post(Login login)
        {
            //buscamos al usuario que coincida el correo
            User user = await context.User.Where(x => x.correo == login.Correo).FirstOrDefaultAsync();
            if(user == null)
            {
                return NotFound( "No se ha encontrado el usuario");

            }
            if(HashHelper.CheckHash(login.Clave, user.clave, user.sal))
            {
                var secretKey = config.GetValue<string>("SecretKey");
                var key = Encoding.ASCII.GetBytes(secretKey);

                var claims = new ClaimsIdentity();
                claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, login.Correo));

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claims,
                    //Tiempo de expiracion
                    Expires = DateTime.UtcNow.AddHours(4),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var createdToken = tokenHandler.CreateToken(tokenDescriptor);


                //bearer_token es nuestro token
                string bearer_token = tokenHandler.WriteToken(createdToken);
                return Ok(bearer_token);
            }
            else
            {
                return NotFound("Contraseña no valida");
            }
        }

        //Metodo para obtener los valores del usuario activo, devuelve el correo
        [HttpGet]
        public IActionResult Get()
        {
            var r = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.NameIdentifier);
            return Ok(r == null ? "" : "Usuario " + r.Value);
        }
    }
}
