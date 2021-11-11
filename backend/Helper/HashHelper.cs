using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace backend.Helper
{
    public class HashHelper
    {
        //Crea el hash de la contraseña
        public static HashedPassword Hash(string password)
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            return new HashedPassword() { Password = hashed, Salt = Convert.ToBase64String(salt) };
        }

        //Compara el hash para el inicio de sesion 
        //                                 clave ingresada  hash de la bd   salt de la bd
        public static bool CheckHash(string attemptedPassword, string hash, string salt)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                 password: attemptedPassword,
                 salt: Convert.FromBase64String(salt),
                 prf: KeyDerivationPrf.HMACSHA256,
                 iterationCount: 10000,
                 numBytesRequested: 256 / 8));
            //se compara el hash de la bd con el hash que se acaba de ingresar
            return hash == hashed;
        }

        public static byte[] GetHash(string password, string salt)
        {
            byte[] unhashedBytes = Encoding.Unicode.GetBytes(string.Concat(salt, password));
            SHA256Managed sha256 = new SHA256Managed();
            byte[] hashedBytes = sha256.ComputeHash(unhashedBytes);
            return hashedBytes;
        }
    }

    public class HashedPassword
    {
        public string Password { get; set; }
        public string Salt { get; set; }
    }
}
