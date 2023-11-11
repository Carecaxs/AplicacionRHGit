using AplicacionRHGit.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Proyecto.Models;
using System.Diagnostics;

namespace AplicacionRHGit.Controllers
{
    public class LoginController : Controller
    {

        private readonly ApplicationDbContext _context;

        public LoginController(ApplicationDbContext context)
        {
            _context = context;
        }


        public IActionResult Crear(string tipoUsuario)
        {
            TempData["Usuario"] = tipoUsuario;
            return View();
        }

      
        public IActionResult Ingresar(string tipoUsuario)
        {
            TempData["Usuario"] = tipoUsuario;
            return View();
        }

        [HttpGet]
        public JsonResult GetPersona(string cedula, string tipoIdentificacion)
        {
         


            if (cedula != null && cedula != "")
            {



                cedula = cedula.Replace("-", "").Replace("_", "");

                if (tipoIdentificacion == "Cédula de Identidad")
                {

                    if (cedula.Length == 9)//si no le agregan el primer 0 se le agrega solo
                    {
                        cedula = "0" + cedula;
                    }
                    else
                    {
                        if (cedula.Length != 10)//si la cedula no es válida
                        {
                            return Json(new { error = "Debes de ingresar una cédula válida" });
                        }

                    }

                }
               

                try
                {

                    LoginDAO DA = new LoginDAO(_context);
                    var persona = DA.ObtenerDatosPersonaPorCedula(cedula);

                    if (persona != null)
                    {

                        return Json(persona);
                    }
                    else
                    {
                        return Json(new { error = "La identificación no existe." });
                    }







                }
                catch (SqlException sqlEx)
                {
                    // Manejo de excepciones de SQL Server
                    return Json(new { error = "Error en la base de datos: " + sqlEx.Message });
                }
                catch (Exception ex)
                {
                    // Manejo de otras excepciones
                    return Json(new { error = "Error desconocido: " + ex.Message });
                }
            }
            else
            {

                return Json(new { error = "Debes de ingresar la cédula" });
            }

        }
    }
}
