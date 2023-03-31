using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ClientController.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ClientController.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly DBPRUEBASContext _dbcontext;
        public UsersController(DBPRUEBASContext dbcontext, IConfiguration configuration)        {
            _dbcontext = dbcontext;
            _configuration = configuration;
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            List<Usuario> users = _dbcontext.Usuarios.OrderBy(u => u.IdUsuario).ToList();
            return StatusCode(StatusCodes.Status200OK, users);
        }

        /*
        [HttpPost]
        [Route("SignUp")]
        public async Task<IActionResult> SignUp([FromBody] Usuario request)
        {
            Usuario user = _dbcontext.Usuarios.SingleOrDefault(u => u.NombreUsuario == request.NombreUsuario);
            if (user != null) return StatusCode(StatusCodes.Status302Found, "El usuario ya existe.");
            request.Password = Encrypt.GetSHA256(request.Password);
            await _dbcontext.Usuarios.AddAsync(request);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }
        */

        [HttpGet]
        [Route("Login/{NombreUsuario}/{Password}")]
        public ActionResult<List<Usuario>> LogIn(string NombreUsuario, string Password)
        {
            string ePassword = Encrypt.GetSHA256(Password);
            Usuario user = _dbcontext.Usuarios.SingleOrDefault(u => u.NombreUsuario == NombreUsuario && u.Password == ePassword);
            if (user == null) return StatusCode(StatusCodes.Status401Unauthorized, "Datos incorrectos");

            return Ok(user.Password);

            /*var jwt = _configuration.GetSection("Jwt").Get<Jwt>();

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("usuario", user.NombreUsuario)
            };

            var claimsIdentity = new ClaimsIdentity(claims);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                claims: claimsIdentity.Claims,
                expires: DateTime.Now.AddDays(3),
                signingCredentials: signIn
            );

            return StatusCode(StatusCodes.Status200OK, new JwtSecurityTokenHandler().WriteToken(token));*/
        }
    }
}
