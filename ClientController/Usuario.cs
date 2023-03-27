using System;
using System.Collections.Generic;

namespace ClientController
{
    public partial class Usuario
    {
        public int IdUsuario { get; set; }
        public string Nombre { get; set; } = null!;
        public string NombreUsuario { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
