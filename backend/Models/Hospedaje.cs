using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Hospedaje
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Tipo { get; set; }
        public string Direccion { get; set; }
        public string Ubicacion { get; set; }
        public long Precio { get; set; }
        public int UserId { get; set; }
        public string[] Servicios { get; set; }
        public string Imagen { get; set; }
    }
}
