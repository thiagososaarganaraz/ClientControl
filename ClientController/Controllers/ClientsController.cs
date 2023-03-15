using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ClientController.Models;

namespace ClientController.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly DBPRUEBASContext _dbcontext;

        public ClientsController(DBPRUEBASContext context)
        {
            _dbcontext = context;
        }
        
        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Cliente> lista = _dbcontext.Clientes.OrderBy(c => c.Vencimiento).ThenBy(c => c.Nombre).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
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
