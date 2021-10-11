using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Context
{
    public class AppDbContext: DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options):base(options){ }
        public DbSet<Hospedaje> Hospedaje { get; set; }
        public DbSet<User> User { get; set; }
    }
}
