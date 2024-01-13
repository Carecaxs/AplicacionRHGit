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
using System.Linq.Expressions;
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
            ViewBag.VistaActual = "Crear";
            ViewBag.tipoUsuario = tipoUsuario;
            return View();
        }

      
        public IActionResult Ingresar(string tipoUsuario)
        {
            ViewBag.VistaActual = "Ingresar";
            ViewBag.tipoUsuario = tipoUsuario;

            return View();
        }


        public ActionResult ConfirmarCodigo(string identificacion, string tipoUsuario)
        {
            LoginDAO acceso = new LoginDAO(_context);

            if(!acceso.IsVerificado(identificacion, tipoUsuario))
            {
                ViewBag.id = identificacion;
                ViewBag.tipoUsuario = tipoUsuario;



                return View();
            }

            return NotFound(); 

        }


        public ActionResult RestablecerContraseña(string identificacion, string tipoUsuario )
        {
            ViewBag.VistaActual = "Restablecer Clave";
            ViewBag.id = identificacion;
            ViewBag.tipoUsuario = tipoUsuario;

            return View();


        }

        [HttpGet]
        public JsonResult GetPersona(string identificacion, string tipoIdentificacion)
        {
         


            if (identificacion != null && identificacion != "")
            {



                identificacion = identificacion.Replace("-", "").Replace("_", "");

                if (tipoIdentificacion == "Cedula")
                {

                    if (identificacion.Length == 9)//si no le agregan el primer 0 se le agrega solo
                    {
                        identificacion = "0" + identificacion;
                    }
                    else
                    {
                        if (identificacion.Length != 10)//si la cedula no es válida
                        {
                            return Json(new { error = "Debes de ingresar una cédula válida" });
                        }

                    }

                }
               

                try
                {

                    LoginDAO DA = new LoginDAO(_context);
                    var persona = DA.ObtenerDatosPersonaPorCedula(identificacion);

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
                var persona = _context.Oferente.FirstOrDefault(u => u.identificacion == usuario.identificacion);

                if (persona==null)
                {
                    try
                    {
                        //si el correo existe entra al if
                        if(DA.CorreoExiste(usuario.correo, tipoUsuario))
                        {
                            return Json(new { exitoso = false, error = "Correo ya existe" });

                        }

                        if ( _context.Oferente.Any(o => o.telefono == usuario.telefono )){

                            return Json(new { exitoso = false, error = "Telefono ya se encuentra registrado" });
                        }


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
                else
                {
                    if (persona.verificado == true)
                    {
                        return Json(new { exitoso = false, error = "Usuario ya existe" });
                    }
                    

                }


            }
            else
            {
                var persona = _context.Reclutador.FirstOrDefault(u => u.identificacion == usuario.identificacion);


                if (persona== null)
                {
                    try
                    {
                        //si el correo existe entra al if
                        if (DA.CorreoExiste(usuario.correo, tipoUsuario))
                        {
                            return Json(new { exitoso = false, error = "Correo ya existe" });

                        }

                        if (_context.Reclutador.Any(r => r.telefono == usuario.telefono))
                        {

                            return Json(new { exitoso = false, error = "Telefono ya se encuentra registrado" });
                        }

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
                else
                {
                    if (persona.verificado == true)
                    {
                        return Json(new { exitoso = false, error = "Usuario ya existe" });
                    }


                }

            }


            //ahora se envia el correo para que confirme la cuenta
            MensajesAutomaticosServices aux = new MensajesAutomaticosServices(_context);

            //creacion del mensaje a enviar
            var url = $"{this.Request.Scheme}://{this.Request.Host}{@Url.Action("ConfirmarCodigo", "Login", new { identificacion = usuario.identificacion, tipoUsuario=tipoUsuario })}";
            string mensaje = "Su solicitud de ingreso a la bolsa de empleo se realizó el " + aux.ObtenerFechaCompleta() +
                ". Para finalizar su registro ingrese el código enviado a su celular <a href ='" + url +
                "'>AQUI</a>.<br /><hr />Este correo es generado automaticamente por lo cual no debe de responderlo.<br />RH.CO.CR";

            //envio del correo, si retorna 1 todo salio bien
            if (aux.EnviarCorreo(usuario, mensaje, 1) == 1)
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
        public JsonResult ConfirmacionCuenta(string identificacion, string codigo, string tipoUsuario)
        {

            LoginDAO acceso = new LoginDAO(_context);

            try
            {
                //si retorna true es que si se confirma el codigo
                if (acceso.ConfirmarCuenta(identificacion, codigo, tipoUsuario))
                {
                    return Json(new { exitoso = true });

                }
                else
                {
                    return Json(new { exitoso = false, mensaje = "Codigo incorrecto" });

                }

            }
            catch(Exception ex)
            {
                return Json(new { exitoso = false, mensaje = ex.Message });

            }


        }




        [HttpPost]
        public JsonResult GuardarContraseña(string identificacion, string clave, string tipoUsuario)
        {

            LoginDAO acceso = new LoginDAO(_context);

            try
            {
                acceso.GuardarContraseña(identificacion, clave, tipoUsuario);
                return Json(new { exitoso = true });


            }
            catch (Exception ex)
            {
                return Json(new { exitoso = false, mensaje = ex.Message });

            }


        }


        [HttpPost]
        public JsonResult OlvidarContraseña(string correo, string tipoUsuario)
        {
            Usuario usuario= new Usuario();
            //buscar cuenta por correo
            if (tipoUsuario == "Oferente")
            {
                var oferente = _context.Oferente.SingleOrDefault(o => o.correo == correo);

                if (oferente != null)
                {
                    if (oferente.verificado == true)//verificar que tenga la cuenta verificada
                    {
                        usuario.identificacion = oferente.identificacion;
                        usuario.correo = oferente.correo;
                    }
                    else
                    {
                        return Json(new { exitoso = false, error = "No tiene la cuenta verificada" });
                    }

                }
                else
                {
                    return Json(new { exitoso = false, error = "No existe oferente con ese correo" });

                }

            }
            else
            {
                var reclutador = _context.Reclutador.SingleOrDefault(r => r.correo == correo);
                if (reclutador != null)
                {
                    if (reclutador.verificado == true)//verificar que tenga la cuenta verificada
                    {
                        usuario.identificacion = reclutador.identificacion;
                        usuario.correo = reclutador.correo;

                    }
                    else
                    {
                        return Json(new { exitoso = false, error = "No tiene la cuenta verificada" });
                    }
                }
                else
                {
                    return Json(new { exitoso = false, error = "No existe reclutador con ese correo" });

                }

            }

            //ahora se envia el correo para que confirme la cuenta
            MensajesAutomaticosServices aux = new MensajesAutomaticosServices(_context);

            //creacion del mensaje a enviar
            var url = $"{this.Request.Scheme}://{this.Request.Host}{@Url.Action("RestablecerContraseña", "Login", new { identificacion = usuario.identificacion, tipoUsuario = tipoUsuario })}";
            string mensaje = "Ingrese al siguiente link para cambiar su contraseña <a href ='" + url +
                "'>AQUI</a>.<br /><hr />Este correo es generado automaticamente por lo cual no debe de responderlo.<br />RH.CO.CR";


            //envio del correo, si retorna 1 todo salio bien
            if (aux.EnviarCorreo(usuario, mensaje, 2) == 1)
            {
                return Json(new { exitoso = true });

            }
            else
            {
                return Json(new { exitoso = false, error = "Hubo un problema al enviar el correo" });

            }
        }



        [HttpPost]
        public JsonResult CambiarVerificadoFalse (string identificacion, string tipoUsuario)
        {
            LoginDAO acceso = new LoginDAO(_context);

            try
            {
                acceso.CambiarVerificadoFalse(identificacion, tipoUsuario);
                return Json(new { exitoso = true });


            }
            catch (Exception ex)
            {
                return Json(new { exitoso = false, mensaje = ex.Message });

            }

        }


        [HttpGet]
        public JsonResult IniciarSesion(string identificacion, string clave, string tipoUsuario)
        { 
         
            LoginDAO acceso = new LoginDAO(_context);

            try
            {
                int resultado = acceso.InicioSesion(identificacion, clave, tipoUsuario);

                switch (resultado)
                {
                    case 1://todo salio bien
                        return Json(new { exitoso = true });

                    case 2:
                        return Json(new { exitoso = false, mensaje = "El usuario no existe" });

                    case 3:
                        return Json(new { exitoso = false, mensaje = "Contraseña incorrecta" });

                    default:
                        return Json(new { exitoso = false });

                }

            }
            catch(Exception ex)
            {
                return Json(new { exitoso = false, mensaje = ex.Message });

            }


        }





    }
}
