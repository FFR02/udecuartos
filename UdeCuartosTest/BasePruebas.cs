using backend.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace UdeCuartosTest
{
    public class BasePruebas
    {
        protected AppDbContext ConstruirContext(string nombreDb)
        {
            var opciones = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(nombreDb).Options;

            var dbContext = new AppDbContext(opciones);
            return dbContext;
        }
        
    }
}
