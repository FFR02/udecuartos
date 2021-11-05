using backend.Controllers;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
namespace UdeCuartosTest
{
    [TestClass]
    public class HospedajeControllerTests: BasePruebas
    {
        [TestMethod]
        public void ObtenerTodosLosHospedajes()
        {
            //Preparacion
            var nombreDB = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombreDB);

            contexto.Hospedaje.Add(new Hospedaje() { titulo = "PruebaTest 1" });
            contexto.Hospedaje.Add(new Hospedaje() { titulo = "PruebaTest 2" });
            contexto.SaveChanges();

            var contexto2 = ConstruirContext(nombreDB);

            //Prueba
            var controller = new HospedajeController(contexto2);
            var res = controller.Get();
            //Verifiacacion
            Console.WriteLine(res);
            Assert.AreEqual(2, res.Count());
        }
        [TestMethod]
        public void ObtenerHospedajePorIdNoExistente()
        {
            //Preparacion
            var nombreDB = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombreDB);

            var controller = new HospedajeController(contexto);
            var res = controller.Get(1);
            Assert.AreEqual(null, res);
        }
        [TestMethod]
        public void ObtenerHospedajePorIdExistente()
        {
            //Preparacion
            var nombreDB = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombreDB);

            contexto.Hospedaje.Add(new Hospedaje() { titulo = "PruebaTest 1" });
            contexto.Hospedaje.Add(new Hospedaje() { titulo = "PruebaTest 2" });
            contexto.SaveChanges();
            var contexto2 = ConstruirContext(nombreDB);

            var controller = new HospedajeController(contexto2);
            var res = controller.Get(1);

            Assert.AreEqual(1, res.id);
        }
        [TestMethod]
        public void CrearHospedaje()
        {
            //Preparacion
            var nombreDB = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombreDB);

            var nuevoHops = new Hospedaje() { titulo = "Nuevo hospedaje" };

            var controller = new HospedajeController(contexto);

            controller.Post(nuevoHops);

            var contexto2 = ConstruirContext(nombreDB);
            var cantidad = contexto2.Hospedaje.Count();
            Assert.AreEqual(1, cantidad);
        }
        //[TestMethod]
        //public void ActualizarHospedaje()
        //{
        //    //Preparacion
        //    var nombreDB = Guid.NewGuid().ToString();
        //    var contexto = ConstruirContext(nombreDB);

        //    contexto.Hospedaje.Add(new Hospedaje() { titulo = "Hospedaje 1" });
        //    contexto.SaveChanges();

        //    var contexto2 = ConstruirContext(nombreDB);
        //    var controller = new HospedajeController(contexto2);

        //    var hosp = new Hospedaje() { titulo = "Nuevo hospedaje" };

        //    controller.Put(1,hosp);

        //    var context3 = ConstruirContext(nombreDB);
        //    var existe = context3.Hospedaje.Any(x => x.titulo == "Nuevo hospedaje");
        //    Assert.IsTrue(existe);
        //}
        [TestMethod]
        public void BorrarHospedajeNoExistente()
        {
            //Preparacion
            var nombreDB = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombreDB);

            var controller = new HospedajeController(contexto);

            controller.Delete(1);
            var contexto2 = ConstruirContext(nombreDB);
            var cantidad = contexto2.Hospedaje.Count();
            Assert.AreEqual(0, cantidad);
        }
        [TestMethod]
        public void BorrarHospedajeExistente()
        {
            //Preparacion
            var nombreDB = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombreDB);

            contexto.Hospedaje.Add(new Hospedaje() { titulo = "PruebaTest 1" });
            contexto.SaveChanges();

            var contexto2 = ConstruirContext(nombreDB);
            var controller = new HospedajeController(contexto2);

            controller.Delete(1);
            var contexto3 = ConstruirContext(nombreDB);
            var cantidad = contexto3.Hospedaje.Count();
            Assert.AreEqual(0, cantidad);
        }
        [TestMethod]
        public void BuscarHospedajeExistente()
        {
            //Preparacion
            var nombreDB = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombreDB);

            contexto.Hospedaje.Add(new Hospedaje() { ubicacion = "Madrid" });
            contexto.SaveChanges();

            var contexto2 = ConstruirContext(nombreDB);
            var controller = new HospedajeController(contexto2);

            var respuesta = controller.SearchByLocation("Madrid");

            var res = respuesta as OkObjectResult;
            Assert.AreEqual(200, res.StatusCode);
        }

    }
}
