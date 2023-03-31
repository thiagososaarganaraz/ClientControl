using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;

namespace ClientController.Models
{
    public class Jwt
    {
        public string Key { get; set; }
        public string Subject { get; set; }

        public readonly DBPRUEBASContext _dbcontext;
        public Jwt(DBPRUEBASContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        // Constructor sin parámetros
        public Jwt()
        {
            Key = "";
            Subject = "";
        }

        public static DBPRUEBASContext Get_dbcontext(DBPRUEBASContext _dbcontext)
        {
            return _dbcontext;
        }

        public static dynamic tokenValidator(ClaimsIdentity identity, DBPRUEBASContext _dbcontext)
        {
            //ASI ME DEVUELVE EL USER
            //var user = _dbcontext.Usuarios.SingleOrDefault(u => u.NombreUsuario == "veralucia");
            //return user;
            try
            {
                //Entra en el primer IF
                if (identity.Claims.Count() == 0) return new Exception("No se encontró claims.");
                var usuario = identity.Claims.FirstOrDefault(u => u.Type == "usuario").Value;

                var user = _dbcontext.Usuarios.SingleOrDefault(u => u.NombreUsuario == usuario);
                if(user == null) return new Exception("No se encontraron usuarios con la claim correspondiente.");

                return "ok";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
