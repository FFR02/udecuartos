using System;
using System.Collections.Generic;
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

        public string[] Servicios { get; set; }
    }
}
