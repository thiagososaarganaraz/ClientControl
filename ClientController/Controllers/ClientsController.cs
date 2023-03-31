using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ClientController.Models;
using System.Security.Claims;

namespace ClientController.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly DBPRUEBASContext _dbcontext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ClientsController(DBPRUEBASContext context, IHttpContextAccessor httpContextAccessor)
        {
            _dbcontext = context;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            /*
            var authHeader = _httpContextAccessor.HttpContext.Request.Headers["Authorization"];
            if (authHeader.Count > 0 && authHeader[0].StartsWith("Bearer "))
            {
                var token = authHeader[0].Substring("Bearer ".Length);
                var user = _dbcontext.Usuarios.SingleOrDefault(u => u.Password == token);
                if (user == null) return StatusCode(StatusCodes.Status404NotFound, "No se encontró ningun usuario con sus credenciales.");
                List<Cliente> lista = _dbcontext.Clientes.OrderBy(c => c.Vencimiento).ThenBy(c => c.Nombre).ToList();
                return StatusCode(StatusCodes.Status200OK, lista);
            }

            return StatusCode(StatusCodes.Status401Unauthorized, "No posee permisos para realizar la solicitud.");*/

            List<Cliente> lista = _dbcontext.Clientes.OrderBy(c => c.Vencimiento).ThenBy(c => c.Nombre).ToList();
            return StatusCode(StatusCodes.Status200OK, lista);

            //No se están encontrando CLAIMS
            //var identity = HttpContext.User.Identity;
            //return StatusCode(StatusCodes.Status200OK, identity);
            //
            //var rToken = Jwt.tokenValidator(identity, _dbcontext);
            //return StatusCode(StatusCodes.Status200OK, rToken);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Cliente request)
        {
            await _dbcontext.Clientes.AddAsync(request);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Cliente client = _dbcontext.Clientes.Find(id);
            _dbcontext.Clientes.Remove(client);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPut]
        [Route("Modificar/{id:int}")]
        public async Task<IActionResult> Modificar(int id, [FromBody] Cliente clienteNuevo)
        {
            Cliente client = _dbcontext.Clientes.Find(id);
            if (client == null) return NotFound();
            _dbcontext.Entry(client).CurrentValues.SetValues(clienteNuevo);
            await _dbcontext.SaveChangesAsync();
            return Ok(client);
        }
    }
}
