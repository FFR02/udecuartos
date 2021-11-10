using backend.Controllers;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
namespace UdeCuartosTest.PruebasUnitarias
{
    [TestClass]
    public class UserControllerTest : BasePruebas
    {
        [TestMethod]
        public void ObtenerTodosLosUsuarios()
        {
            //Preparacion
            var nombreDB = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombreDB);

            contexto.User.Add(new User() { nombre = "Nombre 1" });
            contexto.User.Add(new User() { nombre = "Nombre 2" });
            contexto.SaveChanges();

            var contexto2 = ConstruirContext(nombreDB);

            //Prueba
            var controller = new UserController(contexto2);
            var res = controller.Get();
            //Verifiacacion
            Console.WriteLine(res);
            Assert.AreEqual(2, res.Count());
        }
        [TestMethod]
        public void ObtenerUsuarioPorIdNoExistente()
        {
            //Preparacion
            var nombreDB = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombreDB);

            var controller = new UserController(contexto);
            var res = controller.Get(1);
            Assert.AreEqual(null, res);
        }
        [TestMethod]
        public void ObtenerUsuarioPorIdExistente()
        {
            //Preparacion
            var nombreDB = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombreDB);

            contexto.User.Add(new User() { nombre = "Nombre 1" });
            contexto.User.Add(new User() { nombre = "Nombre 2" });
            contexto.SaveChanges();
            var contexto2 = ConstruirContext(nombreDB);

            var controller = new UserController(contexto2);
            var res = controller.Get(1);

            Assert.AreEqual(1, res.id);
        }
        [TestMethod]
        public void CrearUsuario()
        {
            //Preparacion
            var nombreDB = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombreDB);

            var nuevoUser = new User() { nombre = "Nuevo usuario",
            cedula=1, clave="123", correo="pruebas@correo.com" };

            var controller = new UserController(contexto);

            controller.Post(nuevoUser);

            var contexto2 = ConstruirContext(nombreDB);
            var cantidad = contexto2.User.Count();
            Assert.AreEqual(1, cantidad);
        }
        [TestMethod]
        public void ActualizarUsuario()
        {
            //Preparacion
            var nombreDB = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombreDB);

            contexto.User.Add(new User() { id = 1, nombre = "Usuario 1" });
            contexto.SaveChanges();

            var contexto2 = ConstruirContext(nombreDB);
            var controller = new UserController(contexto2);

            var nuevoUser = new User() { id = 1, nombre = "Nuevo usuario" };

            controller.Put(1, nuevoUser);
            var context3 = ConstruirContext(nombreDB);
            var existe = context3.User.Any(x => x.nombre == "Nuevo usuario");
            Assert.IsTrue(existe);
        }
        [TestMethod]
        public void BorrarUserNoExistente()
        {
            //Preparacion
            var nombreDB = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombreDB);

            var controller = new UserController(contexto);

            controller.Delete(1);
            var contexto2 = ConstruirContext(nombreDB);
            var cantidad = contexto2.User.Count();
            Assert.AreEqual(0, cantidad);
        }
        [TestMethod]
        public void BorrarUserExistente()
        {
            //Preparacion
            var nombreDB = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombreDB);

            contexto.User.Add(new User() { nombre = "Nuevo user 1" });
            contexto.SaveChanges();

            var contexto2 = ConstruirContext(nombreDB);
            var controller = new UserController(contexto2);

            controller.Delete(1);
            var contexto3 = ConstruirContext(nombreDB);
            var cantidad = contexto3.User.Count();
            Assert.AreEqual(0, cantidad);
        }
    }
}
