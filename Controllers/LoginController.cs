using AplicacionRHGit.Clases;
using AplicacionRHGit.Data;
using AplicacionRHGit.Models.Mensajeria;
using AplicacionRHGit.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Proyecto.Models;
using System.Diagnostics;
using System.Runtime.Intrinsics.X86;

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


        public ActionResult ConfirmarCodigo(string identificacion)
        {
            ViewBag.id = identificacion;
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


        [HttpPost]
        public JsonResult AgregarUsuario(Usuario usuario, string tipoUsuario)
        {
            LoginDAO DA = new LoginDAO(_context);

            if (tipoUsuario == "Oferente")//si va crear un perfil en oferente se comprueba que no exista y si existe se le vuelve a mandar un correo al gmail y codigo al celular para que valide su cuenta
            {
                bool existe = _context.Oferente.Any(o => o.identificacion == usuario.identificacion);

                if (!existe)
                {
                    try
                    {

                        DA.AgregarUsuario(usuario, tipoUsuario);//se agregar el oferente

                    }
                    catch (SqlException sqlEx)
                    {
                        // Manejo de excepciones de SQL Server
                        return Json(new { exitoso = false, error = "Error en la base de datos: " + sqlEx.Message });
                    }
                    catch (Exception ex)
                    {
                        // Manejo de otras excepciones
                        return Json(new { exitoso = false, error = "Error desconocido: " + ex.Message });
                    }


                }

                
            }
            else
            {
                bool existe = _context.Reclutador.Any(o => o.identificacion == usuario.identificacion);

                if (!existe)
                {
                    try
                    {

                        DA.AgregarUsuario(usuario, tipoUsuario);
                    }
                    catch (SqlException sqlEx)
                    {
                        // Manejo de excepciones de SQL Server
                        return Json(new { exitoso = false, error = "Error en la base de datos: " + sqlEx.Message });
                    }
                    catch (Exception ex)
                    {
                        // Manejo de otras excepciones
                        return Json(new { exitoso = false, error = "Error desconocido: " + ex.Message });
                    }

                    


                }

            }


            //ahora se envia el correo para que confirme la cuenta
            MensajesAutomaticosServices aux = new MensajesAutomaticosServices(_context);

            //creacion del mensaje a enviar
            var url = $"{this.Request.Scheme}://{this.Request.Host}{@Url.Action("ConfirmarCodigo", "Login", new { identificacion = usuario.identificacion })}";
            string mensaje = "Su solicitud de ingreso a la bolsa de empleo se realizó el " + aux.ObtenerFechaCompleta() +
                ". Para finalizar su registro ingrese el código enviado a su celular <a href ='" + url +
                "'>AQUI</a>.<br /><hr />Este correo es generado automaticamente por lo cual no debe de responderlo.<br />RH.CO.CR";

            //envio del correo, si retorna 1 todo salio bien
            if (aux.EnviarCorreo(usuario, mensaje) == 1)
            {
                //ahora vamos a enviar el codigo sms

                //se busca y elimina los codigos enviados anteriormente a ese usuario si hay ya que solo debe de haber uno para cada usuario
                //ya que con eso vamos a confirmar el codigo

                DA.EliminarCodigosAnteriores(usuario.identificacion);

                Notificacion notificacion = aux.EnviarNotificacion(usuario);
                aux.EnviarNotificacionPersona(notificacion, usuario);



                return Json(new { exitoso = true });

            }
            else
            {
                return Json(new { exitoso = false, error = "Hubo un problema al enviar el correo" });

            }


        }




        [HttpGet]
        public JsonResult ConfirmacionCuenta(string identificacion, string codigo)
        {

            LoginDAO acceso = new LoginDAO(_context);
            
            //si retorna true es que si se confirma el codigo
            if(acceso.ConfirmarCuenta(identificacion, codigo))
            {

            }
        
        
        }








    }
}
