using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    [Table("Hospedaje", Schema = "public")]
    public class Hospedaje
    {
        [Key]
        public int id { get; set; }
        public string titulo { get; set; }
        public string tipo { get; set; }
        public string direccion { get; set; }
        public string ubicacion { get; set; }
        public long precio { get; set; }
        public int iduser { get; set; }
        //String[] da error de casteo
        public string servicios { get; set; }
        public string imagen { get; set; }
    }
}
