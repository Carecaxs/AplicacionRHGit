using AplicacionRHGit.Data;
using AplicacionRHGit.Models;
using AplicacionRHGit.Models.Expedientes;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting.Internal;

namespace AplicacionRHGit.Controllers
{
    public class OferenteController : Controller
    {


        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor httpContextAccessor;

        public OferenteController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            this.httpContextAccessor = httpContextAccessor;
        }


        public IActionResult MenuPrincipalOferente(string identification, string clave)
        {

            identification = identification.Replace("-", "").Replace("_", "");


            if (!string.IsNullOrEmpty(identification) && !string.IsNullOrEmpty(clave))
            {
                ConsultasGeneralesDAO acceso = new ConsultasGeneralesDAO(_context);
                var persona = acceso.ObtenerDatosPersonaPorCedula(identification, "Oferente", clave);


                if (persona != null)
                {
                    ViewBag.nombre = persona.nombre;
                    ViewBag.identificacion = persona.identificacion;
                    ViewBag.clave = clave;
                    ViewBag.tipoUsuario = "Oferente";



                    return View();
                }
                else
                {
                    return NotFound();

                }
            }
            else
            {

                return NotFound();

            }


        }

        public IActionResult DatosPersonalesOferente(string identification, string clave)
        {
            identification = identification.Replace("-", "").Replace("_", "");


            if (!string.IsNullOrEmpty(identification))
            {
                ConsultasGeneralesDAO acceso = new ConsultasGeneralesDAO(_context);
                var persona = acceso.ObtenerDatosPersonaPorCedula(identification, "Oferente", clave);
                if (persona != null)
                {
                    ViewBag.nombre = persona.nombre;
                    ViewBag.identificacion = identification;
                    ViewBag.apellidos = persona.apellido1 + " " + persona.apellido2;
                    ViewBag.VistaActual = "DatosPersonalesOferente";
                    ViewBag.clave = clave;



                    return View();
                }
                else
                {
                    return NotFound();

                }
            }
            else
            {
                return NotFound();

            }

        }


        public IActionResult TitulosOferente(string identification = "0117860836", string clave = "123")
        {
            if (!string.IsNullOrEmpty(identification) && !string.IsNullOrEmpty(clave))
            {
                ConsultasGeneralesDAO acceso = new ConsultasGeneralesDAO(_context);
                var persona = acceso.ObtenerDatosPersonaPorCedula(identification, "Oferente", clave);

                if (persona != null)
                {

                    ViewBag.identificacion = identification;
                    ViewBag.clave = clave;

                    //almacenar en un viewData los grados academicos para mostrarlo en un combo
                    OferentesDAO oferentesDAO = new OferentesDAO(_context);
                    List<GradoAcademico> grados = oferentesDAO.CargarGradosAcademicos();
                    // Pasar los datos a la vista
                    ViewData["Grados"] = new SelectList(grados, "id", "gradoAcademico");



                    List<DETALLE_TITULO> titulos = oferentesDAO.CargarTitulos(identification, clave);
                    if (titulos != null)
                    {
                        ViewData["Titulos"] = new SelectList(titulos, "ID_DETALLE_TITULOS", "ESPECIALIDAD");
                    }



                    return View();
                }
                else
                {
                    return NotFound();

                }



            }
            else
            {
                return NotFound();

            }
        }



        [HttpGet]
        public JsonResult ObtenerDatosPersonalesEx(string identificacion)
        {
            try
            {
                OferentesDAO acceso = new OferentesDAO(_context);

                var expediente = acceso.ObtenerDatosPersonalesEx(identificacion);
                if (expediente != null)
                {
                    return Json(expediente);

                }
                else
                {
                    return Json(new { error = "Error al cargar expediente" });

                }
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }






        [HttpPost]
        public JsonResult GuardarCambiosDatosPersonalesEx(string identificacion, string nacimiento, string correo, string telefono, int provincia, int canton, int distrito,
            string direccion)
        {
            try
            {
                OferentesDAO acceso = new OferentesDAO(_context);


                if (acceso.GuardarCambiosDatosPersonalesEx(identificacion, nacimiento, correo, telefono, provincia, canton, distrito, direccion) > 0)
                {
                    //si todo sale bien
                    return Json(new { mensaje = "Expediente actualizado exitosamente" });
                }
                else
                {
                    return Json(new { error = "Hubo un problema al actualizar el expediente" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }




        //seccion titulos
        [HttpPost]
        public JsonResult AgregarTitulo(IFormCollection formData)
        {

            try
            {
                OferentesDAO acceso = new OferentesDAO(_context);
                int idTitulo = acceso.AgregarTitulo(formData);

                if (idTitulo != -1)
                {
                    var fotoTitulo = formData.Files["fotoTitulo"];
                    if (fotoTitulo != null && fotoTitulo.Length > 0)
                    {
                        // Obtener la ruta donde se guardará la imagen (usando el número de cédula como nombre de carpeta)
                        var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();


                        var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesTitulos", formData["identificacion"].FirstOrDefault());


                        // Crear la carpeta si no existe
                        if (!Directory.Exists(carpetaCedula))
                        {
                            Directory.CreateDirectory(carpetaCedula);
                        }

                        // Obtener la extensión del archivo
                        var extension = Path.GetExtension(fotoTitulo.FileName);

                        // Crear un nombre único para la imagen (id del detalle_titulo)
                        var nombreImagen = $"{idTitulo}{extension}";

                        // Obtener la ruta completa de la imagen
                        var rutaImagen = Path.Combine(carpetaCedula, nombreImagen);

                        // Guardar la imagen en el servidor
                        using (var stream = new FileStream(rutaImagen, FileMode.Create))
                        {
                            fotoTitulo.CopyTo(stream);
                        }

                    }

                    return Json(new { exito = true });


                }
                else
                {
                    return Json(new { error = "Hubo un problema al guardar el titulo" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }


        [HttpGet]
        public JsonResult CargarTitulos(string identificacion, string clave)
        {
            OferentesDAO oferentesDAO = new OferentesDAO(_context);
            var titulos = oferentesDAO.CargarTitulos(identificacion, clave);

            return Json(titulos);
        }



        [HttpPost]
        public JsonResult EliminarTitulo(string idTitulo)
        {
            try
            {
                OferentesDAO oferentesDAO = new OferentesDAO(_context);
                if (oferentesDAO.EliminarTitulo(idTitulo) == 1)
                {
                    return Json(new { exito = true });

                }
                else
                {
                    return Json(new { error = "Hubo un problema al guardar el titulo" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }

        [HttpGet]
        public JsonResult MostrarTitulo(string idTitulo, string identificacion)
        {
            OferentesDAO oferentesDAO = new OferentesDAO(_context);
            var titulo = oferentesDAO.MostrarTitulo(idTitulo);

            try
            {

                if (titulo != null)
                {
                    return Json(titulo);

                }
                else
                {
                    return Json(new { error = true });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }


       



        [HttpPost]
        public JsonResult ActualizarTitulo(IFormCollection formData)
        {
            var fotoTitulo = formData.Files["fotoTitulo"];
            OferentesDAO acceso = new OferentesDAO(_context);

            if (fotoTitulo != null && fotoTitulo.Length > 0)
            {
                //eliminar foto existente y agregar la nueva

                if (acceso.ActualizarTitulo(formData) == 1)
                {
                    var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
                    var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesTitulos", formData["identificacion"].FirstOrDefault());


                    // Buscar el archivo en el directorio
                    string[] archivos = Directory.GetFiles(carpetaCedula, formData["idTitulo"].FirstOrDefault() + ".*");

                    if (archivos.Length > 0)
                    {
                        if (System.IO.File.Exists(archivos[0]))
                        {
                            // Elimina el archivo
                            System.IO.File.Delete(archivos[0]);

                        }

                    }


                    //ahora vamos agregar la nueva imagen
                    var extension = Path.GetExtension(fotoTitulo.FileName);

                    // Crear un nombre único para la imagen (id del detalle_titulo)
                    var nombreImagen = $"{formData["idTitulo"].FirstOrDefault()}{extension}";

                    // Obtener la ruta completa de la imagen
                    var rutaImagen = Path.Combine(carpetaCedula, nombreImagen);

                    // Guardar la imagen en el servidor
                    using (var stream = new FileStream(rutaImagen, FileMode.Create))
                    {
                        fotoTitulo.CopyTo(stream);
                    }


                    return Json(new { exito = true });

                }
                else
                {
                    return Json(new { exito = false });

                }
            }
            else
            {
                //se actualizan los datos sin cambiar la imagen
                if (acceso.ActualizarTitulo(formData) == 1)
                {
                    return Json(new { exito = true });

                }
                else
                {
                    return Json(new { exito = false });

                }
            }



        }




    }
}




