using backend.Controllers;
using backend.Models;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace UdeCuartosTest.PruebasUnitarias
{
    [TestClass]
    public class LoginControllerTest: BasePruebas
    {
        [TestMethod]
        public async Task Login()
        {
            //Preparacion
            var nombreDB = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombreDB);

            contexto.User.Add(new User() {
                nombre = "Nombre 1",
                correo = "prueba@correo.com",
                cedula = 123456789,
                ubicacion = "madrid",
                clave = "123" });
            contexto.SaveChanges();
            var contexto2 = ConstruirContext(nombreDB);

            var controller = new UserController(contexto2);

            var controller2 = new LoginController(contexto2, config);

            var log = new Login() { Correo = "prueba@correo.com", Clave = "123" };

            var res = controller2.Post(log);
            Assert.IsNotNull(res);


        }
    }
}
