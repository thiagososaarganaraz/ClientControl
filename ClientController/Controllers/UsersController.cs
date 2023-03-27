using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ClientController.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientController.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DBPRUEBASContext _dbcontext;

        public UsersController(DBPRUEBASContext dbcontext)        {
            _dbcontext = dbcontext;
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            List<Usuario> users = _dbcontext.Usuarios.OrderBy(u => u.IdUsuario).ToList();

            return StatusCode(StatusCodes.Status200OK, users);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Usuario request)
        {
            await _dbcontext.Usuarios.AddAsync(request);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Usuario user = _dbcontext.Usuarios.Find(id);
            _dbcontext.Usuarios.Remove(user);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPut]
        [Route("Modificar/{id:int}")]
        public async Task<IActionResult> Modificar(int id, [FromBody] Usuario userNuevo)
        {
            Usuario user = _dbcontext.Usuarios.Find(id);
            if (user == null) return NotFound();
            _dbcontext.Entry(user).CurrentValues.SetValues(userNuevo);
            await _dbcontext.SaveChangesAsync();
            return Ok(user);
        }
    }
}
