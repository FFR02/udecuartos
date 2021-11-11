using backend.Controllers;
using Backend.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace UdeCuartosTest.PruebasUnitarias
{
    [TestClass]
    public class MisHospedajesControllerTest: BasePruebas
    {
        [TestMethod]
        public void Ingresar()
        {
            //Preparacion
            var nombreDB = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombreDB);

            contexto.Hospedaje.Add(new Hospedaje() { titulo = "PruebaTest 1" , iduser=1});
            contexto.Hospedaje.Add(new Hospedaje() { titulo = "PruebaTest 2", iduser=2});
            contexto.SaveChanges();

            var contexto2 = ConstruirContext(nombreDB);

            //Prueba
            var controller = new MisHospedajesController(contexto2);
            var res = controller.Get(1);
            //Verifiacacion
            Console.WriteLine(res);
            Assert.AreEqual(1, res.Count());
        }
    }
}
