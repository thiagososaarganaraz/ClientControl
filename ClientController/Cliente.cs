using System;
using System.Collections.Generic;

namespace ClientController
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
        public DateTime? FechaCobro { get; set; }
        public DateTime? FechaPrestamo { get; set; }
        public int? Interes { get; set; }
        public string? Tarjeta { get; set; }
        public int? Cuotas { get; set; }
        public int? Resto { get; set; }
    }
}
