using AplicacionRHGit.Data;
using AplicacionRHGit.Models;
using AplicacionRHGit.Models.Dimex;
using AplicacionRHGit.Models.Expedientes;
using AplicacionRHGit.Models.InstitucionesEducativas;
using AplicacionRHGit.Models.Ubicaciones;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting.Internal;
using System.Linq;

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
                    ViewBag.identificacion = identification;
                    ViewBag.clave = clave;
                    ViewBag.tipoUsuario = "Oferente";



                    return View();
                }
                else
                {
                    return RedirectToAction("MenuPrincipal", "MenuAcceso");


                }
            }
            else
            {

                return RedirectToAction("MenuPrincipal", "MenuAcceso");

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
                    ViewBag.correo = persona.correo;
                    ViewBag.telefono = persona.telefono;



                    //almacenar en un viewData los grupos profesionales para mostrarlo en un combo
                    OferentesDAO oferentesDAO = new OferentesDAO(_context);
                    List<GrupoProfesional> grupos = oferentesDAO.CargarGruposProfesionales();
                    // Pasar los datos a la vista
                    ViewData["GruposCombo"] = new SelectList(grupos, "idGrupoProfesional", "Codigo");


                    //almacenar en un viewData los grados academicos para mostrarlo en un combo
                    List<Idioma> idiomas = oferentesDAO.CargarIdiomas();
                    // Pasar los datos a la vista
                    ViewData["IdiomasCombo"] = new SelectList(idiomas, "idIdioma", "NombreIdioma");



                    List<Idioma> titulos = oferentesDAO.CargarIdiomaPersona(identification, clave);
                    if (titulos != null)
                    {
                        ViewData["IdiomaPersona"] = new SelectList(titulos, "idIdioma", "NombreIdioma");
                    }




                    return View();
                }
                else
                {
                    return RedirectToAction("MenuPrincipal", "MenuAcceso");

                }
            }
            else
            {
                return RedirectToAction("MenuPrincipal", "MenuAcceso");

            }

        }


        public IActionResult TitulosOferente(string identification, string clave)
        {
            if (!string.IsNullOrEmpty(identification) && !string.IsNullOrEmpty(clave))
            {
                ConsultasGeneralesDAO acceso = new ConsultasGeneralesDAO(_context);
                var persona = acceso.ObtenerDatosPersonaPorCedula(identification, "Oferente", clave);

                if (persona != null)
                {
                    ViewBag.nombre = persona.nombre;
                    ViewBag.identificacion = identification;
                    ViewBag.clave = clave;
                    ViewBag.VistaActual = "TitulosOferente";

                    //almacenar en un viewData los grados academicos para mostrarlo en un combo
                    OferentesDAO oferentesDAO = new OferentesDAO(_context);
                    List<GradoAcademico> grados = oferentesDAO.CargarGradosAcademicos();





                    return View();
                }
                else
                {
                    return RedirectToAction("MenuPrincipal", "MenuAcceso");

                }



            }
            else
            {
                return RedirectToAction("MenuPrincipal", "MenuAcceso");

            }
        }


        public IActionResult ReferenciasOferente(string identification, string clave)
        {
            if (!string.IsNullOrEmpty(identification) && !string.IsNullOrEmpty(clave))
            {
                ConsultasGeneralesDAO acceso = new ConsultasGeneralesDAO(_context);
                var persona = acceso.ObtenerDatosPersonaPorCedula(identification, "Oferente", clave);

                if (persona != null)
                {
                    ViewBag.nombre = persona.nombre;
                    ViewBag.identificacion = identification;
                    ViewBag.clave = clave;
                    ViewBag.VistaActual = "ReferenciasOferente";




                    return View();
                }
                else
                {
                    return RedirectToAction("MenuPrincipal", "MenuAcceso");

                }



            }
            else
            {
                return RedirectToAction("MenuPrincipal", "MenuAcceso");

            }
        }



        public IActionResult ExperienciaOferente(string identification, string clave)
        {
            if (!string.IsNullOrEmpty(identification) && !string.IsNullOrEmpty(clave))
            {
                ConsultasGeneralesDAO acceso = new ConsultasGeneralesDAO(_context);
                var persona = acceso.ObtenerDatosPersonaPorCedula(identification, "Oferente", clave);

                if (persona != null)
                {
                    ViewBag.nombre = persona.nombre;
                    ViewBag.identificacion = identification;
                    ViewBag.clave = clave;
                    ViewBag.VistaActual = "ExperienciaOferente";




                    return View();
                }
                else
                {
                    return RedirectToAction("MenuPrincipal", "MenuAcceso");

                }



            }
            else
            {
                return RedirectToAction("MenuPrincipal", "MenuAcceso");

            }
        }


        public IActionResult BuscarOfertasOferente(string identification, string clave)
        {
            if (!string.IsNullOrEmpty(identification) && !string.IsNullOrEmpty(clave))
            {
                ConsultasGeneralesDAO acceso = new ConsultasGeneralesDAO(_context);
                var persona = acceso.ObtenerDatosPersonaPorCedula(identification, "Oferente", clave);

                if (persona != null)
                {
                    ViewBag.nombre = persona.nombre;
                    ViewBag.identificacion = identification;
                    ViewBag.clave = clave;
                    ViewBag.VistaActual = "BuscarOfertasOferente";


                    return View();
                }
                else
                {
                    return RedirectToAction("MenuPrincipal", "MenuAcceso");
                }



            }
            else
            {
                return RedirectToAction("MenuPrincipal", "MenuAcceso");

            }
        }



        public IActionResult CrearOfertaOferente(string identification="0117860836", string clave="123")
        {
            if (!string.IsNullOrEmpty(identification) && !string.IsNullOrEmpty(clave))
            {
                ConsultasGeneralesDAO acceso = new ConsultasGeneralesDAO(_context);
                var persona = acceso.ObtenerDatosPersonaPorCedula(identification, "Oferente", clave);

                if (persona != null)
                {
                    ViewBag.nombre = persona.nombre;
                    ViewBag.identificacion = identification;
                    ViewBag.clave = clave;
                    ViewBag.VistaActual = "CrearOfertaOferente";


                    return View();
                }
                else
                {
                    return RedirectToAction("MenuPrincipal", "MenuAcceso");

                }



            }
            else
            {
                return RedirectToAction("MenuPrincipal", "MenuAcceso");

            }
        }




        public IActionResult VerOfertasOferente(string identification , string clave )
        {
            if (!string.IsNullOrEmpty(identification) && !string.IsNullOrEmpty(clave))
            {
                ConsultasGeneralesDAO acceso = new ConsultasGeneralesDAO(_context);
                var persona = acceso.ObtenerDatosPersonaPorCedula(identification, "Oferente", clave);

                if (persona != null)
                {
                    ViewBag.nombre = persona.nombre;
                    ViewBag.identificacion = identification;
                    ViewBag.clave = clave;
                    ViewBag.VistaActual = "VerOfertasOferente";


                    return View();
                }
                else
                {
                    return RedirectToAction("MenuPrincipal", "MenuAcceso");

                }



            }
            else
            {
                return RedirectToAction("MenuPrincipal", "MenuAcceso");

            }
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        [HttpPost]
        public JsonResult SubirImagenDimex(IFormCollection formData)
        {
            try
            {
                var foto = formData.Files["fotoDimex"];
                if (foto != null && foto.Length > 0)
                {
                    // Obtener la ruta donde se guardará la imagen (usando el número de cédula como nombre de carpeta)
                    var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();


                    var carpetaDimex = Path.Combine(hostingEnvironment.WebRootPath, "ImagesDimex", formData["identificacion"].FirstOrDefault());


                    // Crear la carpeta si no existe
                    if (!Directory.Exists(carpetaDimex))
                    {
                        Directory.CreateDirectory(carpetaDimex);
                    }

                    // Obtener la extensión del archivo
                    var extension = Path.GetExtension(foto.FileName);

                    string parametroNombreImagen = "dimex";
                    var nombreImagen = $"{parametroNombreImagen}{extension}";

                    // Obtener la ruta completa de la imagen
                    var rutaImagen = Path.Combine(carpetaDimex, nombreImagen);

                    //comprobar si ya hay subida una imagen
                    // Comprobar si existe un archivo con el nombre "dimex" en la carpeta
                    var archivosConNombreDimex = Directory.GetFiles(carpetaDimex, "dimex.*");
                    if (archivosConNombreDimex.Length > 0)
                    {
                        // Eliminar archivos existentes con el nombre "dimex"
                        foreach (var archivoExistente in archivosConNombreDimex)
                        {
                            System.IO.File.Delete(archivoExistente);
                        }

                    }

                    // Guardar la imagen en el servidor
                    using (var stream = new FileStream(rutaImagen, FileMode.Create))
                    {
                        foto.CopyTo(stream);
                    }

                    //actualizar estado a enviado
                    //obtener id del oferente 
                    var idOferente = _context.Oferente
                                .Where(oferente => oferente.identificacion == formData["identificacion"].FirstOrDefault())
                                .Select(oferente => oferente.idOferente)
                                .FirstOrDefault();

                    var verificacionDimex = _context.VerificacionDimex.SingleOrDefault(d => d.idOferente == idOferente);
                    if (verificacionDimex != null)
                    {
                        verificacionDimex.estado = 1;
                        _context.SaveChanges();
                    }


                    return Json(new { exito = true });


                }
                else
                {
                    return Json(new { exito = false });

                }
            }
            catch (Exception ex)
            {
                return Json(new { exito = false });

            }
        }



        [HttpPost]
        public JsonResult SubirFotoPerfil(IFormCollection formData)
        {
            try
            {
                var foto = formData.Files["inputFotoPerfil"];
                if (foto != null && foto.Length > 0)
                {
                    // Obtener la ruta donde se guardará la imagen (usando el número de cédula como nombre de carpeta)
                    var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();


                    var carpetaFotosPerfil = Path.Combine(hostingEnvironment.WebRootPath, "ImagesPerfilExpediente", formData["identificacion"].FirstOrDefault());


                    // Crear la carpeta si no existe
                    if (!Directory.Exists(carpetaFotosPerfil))
                    {
                        Directory.CreateDirectory(carpetaFotosPerfil);
                    }

                    // Obtener la extensión del archivo
                    var extension = Path.GetExtension(foto.FileName);

                    string parametroNombreImagen = "fotoPerfil";
                    var nombreImagen = $"{parametroNombreImagen}{extension}";

                    // Obtener la ruta completa de la imagen
                    var rutaImagen = Path.Combine(carpetaFotosPerfil, nombreImagen);

                    //comprobar si ya hay subida una imagen
                    // Comprobar si existe un archivo con el nombre "dimex" en la carpeta
                    var archivosConNombreDimex = Directory.GetFiles(carpetaFotosPerfil, "fotoPerfil.*");
                    if (archivosConNombreDimex.Length > 0)
                    {
                        // Eliminar archivos existentes con el nombre "dimex"
                        foreach (var archivoExistente in archivosConNombreDimex)
                        {
                            System.IO.File.Delete(archivoExistente);
                        }

                    }

                    // Guardar la imagen en el servidor
                    using (var stream = new FileStream(rutaImagen, FileMode.Create))
                    {
                        foto.CopyTo(stream);
                    }

                    return Json(new { exito = true });


                }
                else
                {
                    return Json(new { exito = false });

                }
            }
            catch (Exception ex)
            {
                return Json(new { exito = false });

            }
        }

        [HttpGet]
        public JsonResult ObtenerUrlImagen(string identificacion)
        {

            try
            {

                var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
                var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesPerfilExpediente", identificacion);


                // Buscar el archivo en el directorio
                string[] archivos = Directory.GetFiles(carpetaCedula, "fotoPerfil.*");

                if (archivos.Length > 0 && System.IO.File.Exists(archivos[0]))
                {
                    // Obtener la URL relativa al archivo
                    var rutaRelativa = Path.Combine("ImagesPerfilExpediente", identificacion, Path.GetFileName(archivos[0]));
                    var urlImagen = Url.Content("~/" + rutaRelativa);

                    // Ahora, urlImagen contiene la URL completa del archivo

                    return Json(new { urlImagen });


                }
                else
                {
                    return Json(new { vacio=true });

                }
            }
            catch (Exception ex)
            {
                return Json(new { error=ex.Message });

            }
        }


        [HttpGet]
        public JsonResult ObtenerEstadoDimex(string identificacion)
        {
            try
            {
                //obtener id del oferente 
                var idOferente = _context.Oferente
                            .Where(oferente => oferente.identificacion == identificacion)
                            .Select(oferente => oferente.idOferente)
                            .FirstOrDefault();

                var estadoVerificacionDimex = _context.VerificacionDimex
                               .Where(verificacion => verificacion.idOferente == idOferente)
                               .Select(verificacion => verificacion.estado)
                               .FirstOrDefault();

                return Json(new { estadoVerificacionDimex });

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

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
        public JsonResult GuardarCambiosDatosPersonalesEx(IFormCollection form)
        {
            try
            {
                OferentesDAO acceso = new OferentesDAO(_context);


                if (acceso.GuardarCambiosDatosPersonalesEx(form) > 0)
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

        [HttpPost]
        public JsonResult AñadirGrupoProfesionalExpediente(string identificacion, int idGrupoProf)
        {
            try
            {
                OferentesDAO acceso = new OferentesDAO(_context);

                int idRegistroAgregado = acceso.AñadirGrupoProfesionalExpediente(identificacion, idGrupoProf);

                if (idRegistroAgregado > 0)
                {
                    //si todo sale bien
                    return Json(new { exito = true });
                }
                else
                {
                    return Json(new { error = "Ya tienes este grupo profesional agregado" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }

        [HttpGet]
        public JsonResult CargarGrupoProfesionalOferente(string identificacion, string clave)
        {
            OferentesDAO oferentesDAO = new OferentesDAO(_context);
            var grupos = oferentesDAO.CargarGrupoProfesionalOferente(identificacion, clave);

            try
            {

                if (grupos != null)
                {
                    return Json(grupos);

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
        public JsonResult EliminarGrupoProfesionalOferente(string idGrupoProf, string identificacion)
        {
            try
            {
                OferentesDAO oferentesDAO = new OferentesDAO(_context);
                if (oferentesDAO.EliminarGrupoProfesionalOferente(idGrupoProf, identificacion) == 1)
                {

                    return Json(new { exito = true });

                }
                else
                {
                    return Json(new { error = "Hubo un problema al eliminar el grupo profesional" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }


        [HttpPost]
        public JsonResult AñadirIdiomaExpediente(string identificacion, int idIdioma)
        {
            try
            {
                OferentesDAO acceso = new OferentesDAO(_context);

                int idRegistroAgregado = acceso.AñadirIdiomaExpediente(identificacion, idIdioma);

                if (idRegistroAgregado > 0)
                {
                    //si todo sale bien
                    return Json(new { exito = true });
                }
                else
                {
                    return Json(new { error = "Ya tienes este idioma agregado" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }




        [HttpGet]
        public JsonResult MostrarIdiomaLista(string identificacion, string clave)
        {
            OferentesDAO oferentesDAO = new OferentesDAO(_context);
            var idioma = oferentesDAO.CargarIdiomaPersona(identificacion, clave);

            try
            {

                if (idioma != null)
                {
                    return Json(idioma);

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
        public JsonResult EliminarIdioma(string idIdioma, string identificacion)
        {
            try
            {
                OferentesDAO oferentesDAO = new OferentesDAO(_context);
                if (oferentesDAO.EliminarIdioma(idIdioma, identificacion) == 1)
                {

                    return Json(new { exito = true });

                }
                else
                {
                    return Json(new { error = "Hubo un problema al eliminar el idioma" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }











        ////////////////////////////////////////////////   seccion titulos ///////////////////////////////////////////////////////
        [HttpPost]
        public JsonResult AgregarTituloSecundaria(IFormCollection formData)
        {

            try
            {
                OferentesDAO acceso = new OferentesDAO(_context);

                int idTitulo = acceso.AgregarTituloSecundaria(formData);

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


        [HttpPost]
        public JsonResult AgregarTituloUniversidad(IFormCollection formData)
        {

            try
            {
                OferentesDAO acceso = new OferentesDAO(_context);

                int idTitulo = acceso.AgregarTituloUniversidad(formData);

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
        public JsonResult CargarTitulos(string identificacion, string clave, int tipo)
        {
            var idOferente = _context.Oferente
                .Where(o => o.identificacion == identificacion && o.clave == clave)
                .Select(o => o.idOferente)
                .FirstOrDefault();

            var idExpediente = _context.Expediente
                .Where(e => e.idOferente == idOferente)
                .Select(e => e.ID_EXPEDIENTE)
                .FirstOrDefault();

            var idTitulo = _context.Titulo
                .Where(t => t.ID_EXPEDIENTE == idExpediente)
                .Select(t => t.ID_TITULO)
                .FirstOrDefault();


            switch (tipo)
            {
                case 1:
                    //consulta para secundaria
                    var titulos = (from detalleTitulo in _context.DetalleTitulo
                                   join institucion in _context.CentrosEducativos on detalleTitulo.ID_INSTITUCION equals institucion.Cod_Presupuestario
                                   join grado in _context.GradoAcademico on detalleTitulo.TIPO_TITULO equals grado.id
                                   where detalleTitulo.TIPO_TITULO == 1
                                   select new
                                   {
                                       idDetalleTitulo = detalleTitulo.ID_DETALLE_TITULOS,
                                       idTitulo = detalleTitulo.ID_TITULO,
                                       especialidad = detalleTitulo.ESPECIALIDAD,
                                       folio = detalleTitulo.FOLIO,
                                       asiento = detalleTitulo.ASIENTO,
                                       estado = detalleTitulo.ESTADO,
                                       tipoTitulo = grado.gradoAcademico,
                                       fechaInicio = detalleTitulo.FECHA_INICIO,
                                       fechaFin = detalleTitulo.FECHA_FIN,
                                       tomo = detalleTitulo.TOMO,
                                       institucion = institucion.Nombre_Institucion,
                                       codPrespuestario=institucion.Cod_Presupuestario
                                   })
                   .GroupBy(t => t.codPrespuestario) // Agrupar por Cod_Presupuestario
                   .Select(group => group.First()) // Seleccionar el primer elemento de cada grupo
                   .ToList();


                    if (titulos != null && titulos.Any())
                    {
                        return Json(titulos);
                    }
                    else
                    {
                        return Json(new { vacio = true });

                    }


                case 2:


                    //consulta para universidades
                    var titulo = (from detalleTitulo in _context.DetalleTitulo
                                  join grado in _context.GradoAcademico on detalleTitulo.TIPO_TITULO equals grado.id
                                  join institutos in _context.u_universidades on detalleTitulo.ID_INSTITUCION.ToString() equals institutos.id_universidad
                                  where (detalleTitulo.TIPO_TITULO == 3 || detalleTitulo.TIPO_TITULO == 4 ||
                                         detalleTitulo.TIPO_TITULO == 5 || detalleTitulo.TIPO_TITULO == 6 || detalleTitulo.TIPO_TITULO == 7)
                                  select new
                                  {
                                      idDetalleTitulo = detalleTitulo.ID_DETALLE_TITULOS,
                                      idTitulo = detalleTitulo.ID_TITULO,
                                      especialidad = detalleTitulo.ESPECIALIDAD,
                                      folio = detalleTitulo.FOLIO,
                                      asiento = detalleTitulo.ASIENTO,
                                      estado = detalleTitulo.ESTADO,
                                      tipoTitulo = grado.gradoAcademico,
                                      fechaInicio = detalleTitulo.FECHA_INICIO,
                                      fechaFin = detalleTitulo.FECHA_FIN,
                                      tomo = detalleTitulo.TOMO,
                                      institucion = institutos.nombre_universidad
                                  }).ToList();



                    if (titulo != null && titulo.Any())
                    {
                        return Json(titulo);
                    }
                    else
                    {
                        return Json(new { vacio = true });

                    }

                case 3:
                    //consulta para diplomados
                    var tituloVarios = (from detalleTitulo in _context.DetalleTitulo
                                  join grado in _context.GradoAcademico on detalleTitulo.TIPO_TITULO equals grado.id
                                  join institutos in _context.u_universidades on detalleTitulo.ID_INSTITUCION.ToString() equals institutos.id_universidad
                                  where (detalleTitulo.TIPO_TITULO == 2)
                                  select new
                                  {
                                      idDetalleTitulo = detalleTitulo.ID_DETALLE_TITULOS,
                                      idTitulo = detalleTitulo.ID_TITULO,
                                      especialidad = detalleTitulo.ESPECIALIDAD,
                                      folio = detalleTitulo.FOLIO,
                                      asiento = detalleTitulo.ASIENTO,
                                      estado = detalleTitulo.ESTADO,
                                      tipoTitulo = grado.gradoAcademico,
                                      fechaInicio = detalleTitulo.FECHA_INICIO,
                                      fechaFin = detalleTitulo.FECHA_FIN,
                                      tomo = detalleTitulo.TOMO,
                                      institucion = institutos.nombre_universidad
                                  }).ToList();



                    if (tituloVarios != null && tituloVarios.Any())
                    {
                        return Json(tituloVarios);
                    }
                    else
                    {
                        return Json(new { vacio = true });

                    }
            }



            return Json(new { vacio = true });



        }



        [HttpPost]
        public JsonResult EliminarTitulo(string idTitulo, string identificacion)
        {
            try
            {
                OferentesDAO oferentesDAO = new OferentesDAO(_context);
                if (oferentesDAO.EliminarTitulo(idTitulo) == 1)
                {
                    //eliminar foto de ese titulo
                    var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
                    var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesTitulos", identificacion);


                    // Buscar el archivo en el directorio
                    string[] archivos = Directory.GetFiles(carpetaCedula, idTitulo + ".*");

                    if (archivos.Length > 0)
                    {
                        if (System.IO.File.Exists(archivos[0]))
                        {
                            // Elimina el archivo
                            System.IO.File.Delete(archivos[0]);

                        }

                    }

                    return Json(new { exito = true });

                }
                else
                {
                    return Json(new { error = "Hubo un problema al eliminar el titulo" });

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
            var titulo = from detalleTitulo in _context.DetalleTitulo
                         where detalleTitulo.ID_DETALLE_TITULOS == int.Parse(idTitulo)
                         select new
                         {
                             idDetalleTitulo = detalleTitulo.ID_DETALLE_TITULOS,
                             idTitulo = detalleTitulo.ID_TITULO,
                             tipoTitulo = detalleTitulo.TIPO_TITULO,
                             idInstituto = detalleTitulo.ID_INSTITUCION,
                             fechaInicio = detalleTitulo.FECHA_INICIO,
                             fechaFin = detalleTitulo.FECHA_FIN,
                             tomo = detalleTitulo.TOMO,
                             folio = detalleTitulo.FOLIO,
                             asiento = detalleTitulo.ASIENTO,
                             estado = detalleTitulo.ESTADO
                         };

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



        [HttpGet]
        public JsonResult CargarGrados()
        {
            OferentesDAO oferentesDAO = new OferentesDAO(_context);
            List<GradoAcademico> grados = oferentesDAO.CargarGradosAcademicos();
            return Json(grados);

        }





        [HttpPost]
        public JsonResult ActualizarTituloSecundaria(IFormCollection formData)
        {
            var fotoTitulo = formData.Files["fotoTitulo"];
            OferentesDAO acceso = new OferentesDAO(_context);

            if (fotoTitulo != null && fotoTitulo.Length > 0)
            {
                //eliminar foto existente y agregar la nueva

                if (acceso.ActualizarTituloSecundaria(formData) == 1)
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
                if (acceso.ActualizarTituloSecundaria(formData) == 1)
                {
                    return Json(new { exito = true });

                }
                else
                {
                    return Json(new { exito = false });

                }
            }



        }



        [HttpPost]
        public JsonResult ActualizarTituloUniversitario(IFormCollection formData)
        {
            var fotoTitulo = formData.Files["fotoTitulo"];
            OferentesDAO acceso = new OferentesDAO(_context);

            if (fotoTitulo != null && fotoTitulo.Length > 0)
            {
                //eliminar foto existente y agregar la nueva

                if (acceso.ActualizarTituloUniversitario(formData) == 1)
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
                if (acceso.ActualizarTituloUniversitario(formData) == 1)
                {
                    return Json(new { exito = true });

                }
                else
                {
                    return Json(new { exito = false });

                }
            }



        }


        //[HttpGet]
        //public JsonResult MostrarInstitutosTecnicos()
        //{
        //    //tecnicos
        //    //no contiene grados
        //    List<string> instituciones = _context.u_parauniversidades
        //                                            .Select(u => u.nombre_parauniversidad)
        //                                            .ToList();

        //    return Json(instituciones);

        //}

        [HttpGet]
        public JsonResult MostrarInstitutosDiplomados()
        {
            using (UtilidadesContext context = new UtilidadesContext())
            {
                //contiene grados: diplomados
                //si contiene nombre de carreras
                List<string> instituciones = context.u_paracarreras
             .Select(c => c.universidad)
             .Distinct()
             .OrderBy(universidad => universidad)
             .ToList();


                return Json(instituciones);
            }


        }




        [HttpGet]
        public JsonResult MostrarCarrerasDiplomados(string instituto)
        {
            using (UtilidadesContext context = new UtilidadesContext())
            {
                List<string> carreras = context.u_paracarreras
                .Where(c => c.universidad == instituto)
                .Select(c => c.nombre_carrera)
                .Distinct()
                .OrderBy(nombreCarrera => nombreCarrera)
                .ToList();


                return Json(carreras);
            }

        }




        [HttpGet]
        public JsonResult MostrarCarreras(string instituto, string grado)
        {
            var gradoConsulta = grado.Split();

            using (UtilidadesContext context = new UtilidadesContext())
            {
                //contiene grados bachillerato-maestria-licenciatura
                //si contiene nombre de carreras

                List<string> carreras = context.u_carreras
                     .Where(c => c.universidad.Contains(instituto) && c.grado.Contains(gradoConsulta[0]))
                     .Select(c => c.nombre_carrera)
                     .Distinct()
                     .OrderBy(nombreCarrera => nombreCarrera)
                     .ToList();



                return Json(carreras);
            }



        }

        [HttpGet]
        public JsonResult MostrarUniversidades()
        {
            //universidades
            //no contiene grados
            var instituciones = _context.u_universidades
              .Distinct()
              .OrderBy(u => u.nombre_universidad)
              .ToList();





            return Json(instituciones);


        }



        [HttpGet]
        public JsonResult MostrarInstitutosSecundaria(int idCanton)
        {

            var instituciones = _context.CentrosEducativos
                           .Where(ce => (idCanton == 0 || ce.Cod_Cant == idCanton) && ce.Tipo_Ins == 3)
                           .Select(ce => new
                           {
                               codInstitucion = ce.Cod_Presupuestario,
                               nombreInstitucion = ce.Nombre_Institucion
                           })
                           .ToList();



            return Json(instituciones);


        }


        //[HttpGet]
        //public JsonResult MostrarInstitutosUniversitarios()
        //{

        //    var instituciones = _context.CentrosEducativos
        //                   .Where(ce => (idCanton == 0 || ce.Cod_Cant == idCanton) && ce.Tipo_Ins == 3)
        //                   .Select(ce => new
        //                   {
        //                       codInstitucion = ce.Cod_Presupuestario,
        //                       nombreInstitucion = ce.Nombre_Institucion
        //                   })
        //                   .ToList();



        //    return Json(instituciones);


        //}

        [HttpGet]
        public JsonResult ObtenerUrlTitulo(string identificacion, int idTitulo)
        {

            try
            {

                var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
                var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesTitulos", identificacion);


                // Buscar el archivo en el directorio
                string[] archivos = Directory.GetFiles(carpetaCedula, idTitulo + ".*");

                if (archivos.Length > 0 && System.IO.File.Exists(archivos[0]))
                {
                    // Obtener la URL relativa al archivo
                    var rutaRelativa = Path.Combine("ImagesTitulos", identificacion, Path.GetFileName(archivos[0]));
                    var urlImagen = Url.Content("~/" + rutaRelativa);

                    // Ahora, urlImagen contiene la URL completa del archivo

                    return Json(new { urlImagen });


                }
                else
                {
                    return Json(new { vacio = true });

                }
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }




        ///////////////////////////////////////////////////////    SECCION REFERENCIAS ////////////////////////////////////////////////////////////////

        [HttpPost]
        public JsonResult AgregarReferecia(IFormCollection formData)
        {

            try
            {
                OferentesDAO acceso = new OferentesDAO(_context);
                int idReferencia = acceso.AgregarReferecia(formData);

                if (idReferencia != -1)
                {
                    var fotoReferencia = formData.Files["fotoReferencia"];
                    if (fotoReferencia != null && fotoReferencia.Length > 0)
                    {
                        // Obtener la ruta donde se guardará la imagen (usando el número de cédula como nombre de carpeta)
                        var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();


                        var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesReferencias", formData["identificacion"].FirstOrDefault());


                        // Crear la carpeta si no existe
                        if (!Directory.Exists(carpetaCedula))
                        {
                            Directory.CreateDirectory(carpetaCedula);
                        }

                        // Obtener la extensión del archivo
                        var extension = Path.GetExtension(fotoReferencia.FileName);

                        // Crear un nombre único para la imagen (id del detalle_titulo)
                        var nombreImagen = $"{idReferencia}{extension}";

                        // Obtener la ruta completa de la imagen
                        var rutaImagen = Path.Combine(carpetaCedula, nombreImagen);

                        // Guardar la imagen en el servidor
                        using (var stream = new FileStream(rutaImagen, FileMode.Create))
                        {
                            fotoReferencia.CopyTo(stream);
                        }

                    }

                    return Json(new { exito = true });


                }
                else
                {
                    return Json(new { error = "Hubo un problema al guardar la referencia" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }



        [HttpGet]
        public JsonResult CargarReferencias(string identificacion, string clave, char tipoReferencia)
        {
            try
            {

                OferentesDAO acceso = new OferentesDAO(_context);

                List<DETALLE_REFERENCIAS> referencias = acceso.CargarReferencias(identificacion, clave, tipoReferencia);

                if (referencias != null && referencias.Any())
                {
                    return Json(referencias);
                }
                else
                {
                    return Json(new { vacio = true });

                }


            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }


        [HttpPost]
        public JsonResult EliminarReferencia(string idReferencia, string identificacion)
        {
            try
            {
                OferentesDAO oferentesDAO = new OferentesDAO(_context);
                if (oferentesDAO.EliminarReferencia(idReferencia) == 1)
                {
                    //eliminar foto de esa refeencia
                    var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
                    var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesReferencias", identificacion);


                    // Buscar el archivo en el directorio
                    string[] archivos = Directory.GetFiles(carpetaCedula, idReferencia + ".*");

                    if (archivos.Length > 0)
                    {
                        if (System.IO.File.Exists(archivos[0]))
                        {
                            // Elimina el archivo
                            System.IO.File.Delete(archivos[0]);

                        }

                    }

                    return Json(new { exito = true });

                }
                else
                {
                    return Json(new { error = "Hubo un problema al eliminar la referencia" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }

        [HttpGet]
        public JsonResult ObtenerUrlEvaluacion(string identificacion, int idReferencia)
        {

            try
            {

                var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
                var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesReferencias", identificacion);


                // Buscar el archivo en el directorio
                string[] archivos = Directory.GetFiles(carpetaCedula, idReferencia+".*");

                if (archivos.Length > 0 && System.IO.File.Exists(archivos[0]))
                {
                    // Obtener la URL relativa al archivo
                    var rutaRelativa = Path.Combine("ImagesReferencias", identificacion, Path.GetFileName(archivos[0]));
                    var urlImagen = Url.Content("~/" + rutaRelativa);

                    // Ahora, urlImagen contiene la URL completa del archivo

                    return Json(new { urlImagen });


                }
                else
                {
                    return Json(new { vacio = true });

                }
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }



        ///////////////////////////////////////////////////////    SECCION EXPERIENCIAS ////////////////////////////////////////////////////////////////

        [HttpPost]
        public JsonResult AgregarExperiencia(IFormCollection formData)
        {

            try
            {
                OferentesDAO acceso = new OferentesDAO(_context);
                int idExperiencia = acceso.AgregarExperiencia(formData);

                if (idExperiencia != -1)
                {
                    var fotoEvaluacion = formData.Files["fotoEvaluacion"];
                    if (fotoEvaluacion != null && fotoEvaluacion.Length > 0)
                    {
                        // Obtener la ruta donde se guardará la imagen (usando el número de cédula como nombre de carpeta)
                        var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();


                        var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesEvaluaciones", formData["identificacion"].FirstOrDefault());


                        // Crear la carpeta si no existe
                        if (!Directory.Exists(carpetaCedula))
                        {
                            Directory.CreateDirectory(carpetaCedula);
                        }

                        // Obtener la extensión del archivo
                        var extension = Path.GetExtension(fotoEvaluacion.FileName);

                        // Crear un nombre único para la imagen (id del detalle_titulo)
                        var nombreImagen = $"{idExperiencia}{extension}";

                        // Obtener la ruta completa de la imagen
                        var rutaImagen = Path.Combine(carpetaCedula, nombreImagen);

                        // Guardar la imagen en el servidor
                        using (var stream = new FileStream(rutaImagen, FileMode.Create))
                        {
                            fotoEvaluacion.CopyTo(stream);
                        }

                    }

                    return Json(new { exito = true });


                }
                else
                {
                    return Json(new { error = "Hubo un problema al guardar la experiencia laboral" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }


        [HttpGet]
        public JsonResult ObtenerUrlExperiencia(string identificacion, int idExperiencia)
        {

            try
            {

                var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
                var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesEvaluaciones", identificacion);


                // Buscar el archivo en el directorio
                string[] archivos = Directory.GetFiles(carpetaCedula, idExperiencia + ".*");

                if (archivos.Length > 0 && System.IO.File.Exists(archivos[0]))
                {
                    // Obtener la URL relativa al archivo
                    var rutaRelativa = Path.Combine("ImagesEvaluaciones", identificacion, Path.GetFileName(archivos[0]));
                    var urlImagen = Url.Content("~/" + rutaRelativa);

                    // Ahora, urlImagen contiene la URL completa del archivo

                    return Json(new { urlImagen });


                }
                else
                {
                    return Json(new { vacio = true });

                }
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }




        [HttpGet]
        public JsonResult CargarExperiencias(string identificacion, string clave)
        {
            try
            {

                OferentesDAO acceso = new OferentesDAO(_context);

                List<DETALLE_EXPERIENCIA> experiencias = acceso.CargarExperiencias(identificacion, clave);

                if (experiencias != null)
                {
                    return Json(experiencias);
                }
                else
                {
                    return Json(new { vacio = true });

                }


            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }




        [HttpPost]
        public JsonResult EliminarExperiencia(string idExperiencia, string identificacion)
        {
            try
            {
                OferentesDAO oferentesDAO = new OferentesDAO(_context);
                if (oferentesDAO.EliminarExperiencia(idExperiencia) == 1)
                {
                    //eliminar foto de esa evaluacion
                    var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
                    var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesEvaluaciones", identificacion);


                    // Buscar el archivo en el directorio
                    string[] archivos = Directory.GetFiles(carpetaCedula, idExperiencia + ".*");

                    if (archivos.Length > 0)
                    {
                        if (System.IO.File.Exists(archivos[0]))
                        {
                            // Elimina el archivo
                            System.IO.File.Delete(archivos[0]);

                        }

                    }

                    return Json(new { exito = true });

                }
                else
                {
                    return Json(new { error = "Hubo un problema al eliminar la referencia" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }





        ///////////////////////////////////////////////////////    SECCION buscar OFERTAS LABORALES ////////////////////////////////////////////////////////////////


        [HttpGet]
        public JsonResult CargarOfertas(int provincia, int canton, int idMateria)
        {
            try
            {


                var consulta = from oferta in _context.Oferta_Laboral
                               join institucion in _context.Institucion on oferta.id_institucion equals institucion.ID_INSTITUCION
                               join materia in _context.Materia on oferta.id_materia equals materia.ID_Materia

                               where (provincia == 0 || institucion.IdProvincia == provincia) &&
                                     (canton == 0 || institucion.IdCanton == canton) &&
                                     (idMateria == 0 || oferta.id_materia == idMateria) &&
                                     (oferta.estado == false) &&
                                     (oferta.cantidadVacantes > 0)
                               orderby oferta.fecha_publicacion descending  // Ordenar por fecha de publicación de mayor a menor
                               select new
                               {
                                   idOferta = oferta.id_oferta,
                                   nombreOferta = oferta.titulo,
                                   descripcionOferta = oferta.descripcion,
                                   publicacionOferta = oferta.fecha_publicacion,
                                   nombreInstitucion = institucion.NOMBRE,
                                   nombreMateria = materia.Nombre
                               };


                if (consulta != null && consulta.Any())
                {
                    return Json(consulta);

                }
                else
                {
                    return Json(new { vacio = true });

                }


            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }

        }


        [HttpGet]
        public JsonResult ObtenerDatosOferta(int idOferta)
        {
            try
            {


                var consulta = (from oferta in _context.Oferta_Laboral
                                join institucion in _context.Institucion on oferta.id_institucion equals institucion.ID_INSTITUCION
                                join materia in _context.Materia on oferta.id_materia equals materia.ID_Materia

                                where (idOferta == 0 || oferta.id_oferta == idOferta)
                                select new
                                {
                                    idOferta = oferta.id_oferta,
                                    nombreOferta = oferta.titulo,
                                    descripcionOferta = oferta.descripcion,
                                    publicacionOferta = oferta.fecha_publicacion,
                                    nombreInstitucion = institucion.NOMBRE,
                                    nombreMateria = materia.Nombre
                                }).FirstOrDefault();


                if (consulta != null)
                {
                    return Json(consulta);

                }
                else
                {
                    return Json(new { vacio = true });

                }


            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }





        }




        [HttpGet]
        public JsonResult CargarMaterias()
        {
            var materias = _context.Materia.ToList();

            if (materias != null && materias.Any())
            {
                return Json(materias);

            }
            else
            {
                return Json(new { vacio = true });

            }
        }



        [HttpPost]
        public JsonResult AgregarPostulacion(int idOferta, string identificacion)
        {
            try
            {
                OferentesDAO oferentesDAO = new OferentesDAO(_context);
                int retorno = oferentesDAO.AgregarPostulacion(idOferta, identificacion);
                if (retorno > 0)
                {
                    //sale bien 
                    return Json(new { exito = true });

                }
                else if (retorno == -2)
                {
                    return Json(new { exito = false, existe = true });

                }
                else
                {
                    return Json(new { exito = false });

                }
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }











        ///////////////////////////////////////////////////////    SECCION crear OFERTAS LABORALES ////////////////////////////////////////////////////////////////

        [HttpPost]
        public JsonResult CrearOferta(IFormCollection form)
        {
            try
            {
 
                string listaUbicacionesJson = form["listaUbicaciones"];

                // Deserializar la cadena JSON a una lista (puedes usar la clase JavaScriptSerializer o Newtonsoft.Json.JsonConvert)
                List<int> listaUbicaciones = Newtonsoft.Json.JsonConvert.DeserializeObject<List<int>>(listaUbicacionesJson);


                string listaGruposJson = form["listaGrupos"];

                // Deserializar la cadena JSON a una lista (puedes usar la clase JavaScriptSerializer o Newtonsoft.Json.JsonConvert)
                List<int> listaGrupos = Newtonsoft.Json.JsonConvert.DeserializeObject<List<int>>(listaGruposJson);



                int idMateria= int.Parse(form["materia"].FirstOrDefault()); 
                string descripcion = form["descripcion"].FirstOrDefault();
                string identificacion = form["identificacion"].FirstOrDefault();

                OferentesDAO oferentesDAO = new OferentesDAO(_context);

                int retorno = oferentesDAO.CrearOferta(identificacion, descripcion, listaUbicaciones, listaGrupos, idMateria);

                if (retorno > 0)
                {
                    return Json(new { exito = true });

                }
                else
                {
                    return Json(new { exito = false });

                }
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }



        [HttpGet]
        public JsonResult CargarGruposProfesionales(string identificacion) {

            var idOferente = _context.Oferente
                     .Where(o => o.identificacion == identificacion)
                     .Select(o => o.idOferente)
                     .FirstOrDefault();

            //consulta el id del expediente de ese oferente
            var idExpediente = _context.Expediente
            .Where(e => e.idOferente == idOferente)
            .Select(e => e.ID_EXPEDIENTE)
            .FirstOrDefault();

            var grupos = (from grupoOferente in _context.GrupoProfesionalOferente
                         where grupoOferente.ID_EXPEDIENTE == idExpediente
                         join gruposProfesionales in _context.GrupoProfesional on grupoOferente.id_grupoProfesional equals gruposProfesionales.idGrupoProfesional
                         select new
                         {
                             idGrupoProfesional = gruposProfesionales.idGrupoProfesional,
                             codigo = gruposProfesionales.Codigo
                         }).ToList();

            //si el oferente tiene registrado ya grupos en su expediente se retorna una lista de los que tiene 
            //y si no contiene ninguno se mostraran todos
            if(grupos != null && grupos.Any())
            {
                return Json(grupos);
            }
            else
            {
                List<GrupoProfesional> grupos2 = _context.GrupoProfesional.ToList();
                return Json(grupos2);
            }

       

        }


        ///////////////////////////////////////////////////////    SECCION ver mis OFERTAS LABORALES ////////////////////////////////////////////////////////////////


        //[HttpGet]
        //public JsonResult CargarMisOfertas(string identificacion)
        //{
        //    try
        //    {

        //        // Obtener el idOferente usando la identificación
        //        var idOferente = _context.Oferente
        //            .Where(o => o.identificacion == identificacion)
        //            .Select(o => o.idOferente)
        //            .FirstOrDefault();


        //        var ofertas = from oferta in _context.Oferta_Creada_Oferente
        //                      where oferta.idOferente == idOferente && oferta.estado == false
        //                      join materiaOferta in _context.Materia_Oferta_Creada_Oferente
        //                      on oferta.id equals materiaOferta.id_Ofertas_Creadas_Oferentes
        //                      join materia in _context.Materia
        //                          on materiaOferta.ID_Materia equals materia.ID_Materia
        //                      join provincia in _context.Provincia on oferta.IdProvincia equals provincia.IdProvincia
        //                      join canton in _context.Canton on oferta.IdCanton equals canton.IdCanton

        //                      select new
        //                      {
        //                          idOferta = oferta.id,
        //                          descripcionOferta = oferta.descripcion,
        //                          publicacionOferta = oferta.fecha_publicacion,
        //                          estadoOferta = oferta.estado,
        //                          materia = materia.Nombre,
        //                          provincia = provincia.NombreProvincia,
        //                          canton = canton.NombreCanton
        //                      };


        //        if (ofertas != null)
        //        {
        //            return Json(ofertas);

        //        }
        //        else
        //        {
        //            return Json(new { vacio = true });

        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { error = ex.Message });


        //    }

        //}








    }

}




