using System;
using System.Collections.Generic;

namespace ClientController.Models
{
    public partial class Cliente
    {
        public int IdCliente { get; set; }
        public string? Nombre { get; set; }
        public DateTime? FechaRegistro { get; set; }
        public int? Deuda { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? Vencimiento { get; set; }
        public string? Descripcion { get; set; }
        public string? Cbu { get; set; }
        public int? Clave { get; set; }
    }
}
