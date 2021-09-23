using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Inmueble
    {
        public int InmuebleId { get; set; }
        [Required]
        public string Titulo { get; set; }
        [Required]
        public string Tipo { get; set; }
        [Required]
        public string Ubicacion { get; set; }
        public long Precio { get; set; }
        [Required]
        public int UserId { get; set; }

        public string[] Servicios { get; set; }
    }
}

