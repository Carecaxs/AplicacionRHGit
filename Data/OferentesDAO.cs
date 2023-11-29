using AplicacionRHGit.Clases;
using AplicacionRHGit.Models;
using AplicacionRHGit.Models.Expedientes;
using AplicacionRHGit.Models.Mensajeria;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Text.RegularExpressions;

namespace AplicacionRHGit.Data
{
    public class OferentesDAO
    {
        private readonly ApplicationDbContext _context;

        public OferentesDAO(ApplicationDbContext context)
        {
            _context = context;
        }



        //metodo que retorna la informacion del expediente del usuario
        public EXPEDIENTE ObtenerDatosPersonalesEx(string identificacion)
        {
            try
            {
                //consulta el id del oferente con la cedula dada
                var idOferente = _context.Oferente
                .Where(o => o.identificacion == identificacion)
                .Select(o => o.idOferente)
                .FirstOrDefault();


                var expediente = _context.Expediente.Where(e => e.idOferente == idOferente).FirstOrDefault();

                if(expediente != null)
                {

                    return expediente;
                }
                else
                {
                    return null;
                }




            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //retornar una lista de los grados academicos almacenados en la BD
        public List<Idioma> CargarIdiomas()
        {
            List<Idioma> idiomas = _context.Idioma.ToList();

            return idiomas;
        }
        
        //retornar una lista de los grupos profesionales almacenados en la BD
        public List<GrupoProfesional> CargarGruposProfesionales()
        {
            List<GrupoProfesional> grupos = _context.GrupoProfesional.ToList();

            return grupos;
        }






        //retorna 1 si todos sale bien , -1 si no sale bien
        public int GuardarCambiosDatosPersonalesEx(string identificacion, string nacimiento, int genero, int provincia, int canton, int distrito,
            string direccion, int grupoP)
        {
            try
            {
                //consulta el id del oferente con la cedula dada
                var idOferente = _context.Oferente
                .Where(o => o.identificacion == identificacion)
                .Select(o => o.idOferente)
                .FirstOrDefault();

                //invocar al expediente que se va modificar
                var expediente = _context.Expediente
                .Where(e => e.idOferente == idOferente)
                .FirstOrDefault();

                //realizar los cambios 
                if (expediente != null)
                {
 
                    // Convierte la fecha al formato 'YYYY-MM-DD' antes de insertarla en la base de datos
                    expediente.nacimiento = DateTime.Parse(nacimiento);
                    expediente.IdProvincia = (provincia==0 ? null : provincia);
                    expediente.IdCanton = (canton == 0 ? null : canton); ;
                    expediente.IdDistrito = (distrito == 0 ? null : distrito); 
                    expediente.direccion = direccion;
                    expediente.genero = genero;
                    expediente.grupoProfesional = grupoP;


                    // Realiza el cambio en la base de datos
                    _context.SaveChanges();


                    return 1;
                }
                else
                {
                    return -1;
                }


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //cargar lista de idiomas por personas
        public List<Idioma> CargarIdiomaPersona(string identificacion, string clave)
        {

            var idOferente = _context.Oferente
              .Where(o => o.identificacion == identificacion && o.clave == clave)
              .Select(o => o.idOferente)
              .FirstOrDefault();

            //consulta el id del expediente de ese oferente
            var idExpediente = _context.Expediente
            .Where(e => e.idOferente == idOferente)
            .Select(e => e.ID_EXPEDIENTE)
            .FirstOrDefault();



            var idiomas = (from oi in _context.OferenteIdioma
                           join i in _context.Idioma on oi.idIdioma equals i.idIdioma
                           where oi.ID_EXPEDIENTE == idExpediente
                           select i).ToList();

            return idiomas;

        }



        //retorna el id del registro agregado si sale bien, -1 si no
        public int AñadirIdiomaExpediente(string identificacion, int idIdioma)
        {
            try
            {

                var idOferente = _context.Oferente
                .Where(o => o.identificacion == identificacion)
                .Select(o => o.idOferente)
                .FirstOrDefault();

                //consulta el id del expediente de ese oferente
                var idExpediente = _context.Expediente
                .Where(e => e.idOferente == idOferente)
                .Select(e => e.ID_EXPEDIENTE)
                .FirstOrDefault();


                //verificar que no tenga el idioma agregado
                bool tieneIdioma = _context.OferenteIdioma
                .Any(oi => oi.ID_EXPEDIENTE == idExpediente && oi.idIdioma==idIdioma);

                if (!tieneIdioma)
                {
                    OFERENTE_IDIOMA agregar = new OFERENTE_IDIOMA()
                    {
                        idIdioma = idIdioma,
                        ID_EXPEDIENTE = idExpediente
                    };

                    _context.OferenteIdioma.Add(agregar);
                    _context.SaveChanges();

                    return agregar.id;
                }
                else
                {
                    return -1;
                }
  
                
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }



        public int EliminarIdioma(string idIdioma, string identificacion)
        {
            try
            {
                var idOferente = _context.Oferente
                .Where(o => o.identificacion == identificacion)
                .Select(o => o.idOferente)
                .FirstOrDefault();

                //consulta el id del expediente de ese oferente
                var idExpediente = _context.Expediente
                .Where(e => e.idOferente == idOferente)
                .Select(e => e.ID_EXPEDIENTE)
                .FirstOrDefault();

                var idioma = _context.OferenteIdioma
                  .FirstOrDefault(x => x.ID_EXPEDIENTE ==idExpediente && x.idIdioma == int.Parse(idIdioma));


                if (idioma != null)
                {
                    _context.OferenteIdioma.Remove(idioma);
                    _context.SaveChanges();
                    return 1;
                }
                else
                {
                    // Manejar el caso en que la referencia no se encontró
                    return -1;
                }
            }
            catch (Exception ex)
            {
                throw;

            }
        }








        //titulos


        //retorna el id del tetilo añadido si todos sale bien , -1 si no sale bien
        public int AgregarTitulo(IFormCollection form)
        {
            int retorno = -1;
            var identificacion = form["identificacion"].FirstOrDefault();
            var clave= form["clave"].FirstOrDefault();
 

            try
            {
                //consulta el id del oferente con la identificacion y clave dada
                var idOferente = _context.Oferente
                .Where(o => o.identificacion == identificacion && o.clave == clave)
                .Select(o => o.idOferente)
                .FirstOrDefault();

                //consulta el id del expediente de ese oferente
                var idExpediente = _context.Expediente
                .Where(e => e.idOferente == idOferente)
                .Select(e => e.ID_EXPEDIENTE)
                .FirstOrDefault();

                //consulta el id del expediente de ese oferente
                var idTitulo = _context.Titulo
                .Where(t => t.ID_EXPEDIENTE == idExpediente)
                .Select(t => t.ID_TITULO)
                .FirstOrDefault();


                DETALLE_TITULO datosTitulo = new DETALLE_TITULO()
                {
                    ID_TITULO = idTitulo,
                    TIPO_TITULO = int.Parse(form["nivelEducacion"].FirstOrDefault()),
                    ESPECIALIDAD = form["titulo"].FirstOrDefault(),
                    NOMBRE_INSTITUCION = form["institucion"].FirstOrDefault(),
                    FECHA_OBTENCION = DateTime.Parse(form["fechaObtenido"].FirstOrDefault()),
                    FOLIO = int.Parse(form["folio"].FirstOrDefault()),
                    ASIENTO = int.Parse(form["asiento"].FirstOrDefault()),
                    ESTADO = 'P'
                };

                _context.DetalleTitulo.Add(datosTitulo);
                _context.SaveChanges();

                retorno = datosTitulo.ID_DETALLE_TITULOS;

                return retorno;



            }
            catch (Exception)
            {
                throw;
            }



        }



        //retornar una lista de los grados academicos almacenados en la BD
        public List<GradoAcademico> CargarGradosAcademicos()
        {
            List<GradoAcademico> grados = _context.GradoAcademico.ToList();

            return grados;
        }

        public List<DETALLE_TITULO> CargarTitulos(string identificacion, string clave)
        {

            var idOferente = _context.Oferente
              .Where(o => o.identificacion == identificacion && o.clave == clave)
              .Select(o => o.idOferente)
              .FirstOrDefault();

            //consulta el id del expediente de ese oferente
            var idExpediente = _context.Expediente
            .Where(e => e.idOferente == idOferente)
            .Select(e => e.ID_EXPEDIENTE)
            .FirstOrDefault();

            //consulta el id del expediente de ese oferente
            var idTitulo = _context.Titulo
            .Where(t => t.ID_EXPEDIENTE == idExpediente)
            .Select(t => t.ID_TITULO)
            .FirstOrDefault();

            //filtrar en una lista los titulos por id
            List<DETALLE_TITULO> titulos = _context.DetalleTitulo
            .Where(t => t.ID_TITULO == idTitulo)
            .ToList();

            if (titulos.Any())
            {
                return titulos;
            }

            return null;
        }


        public int EliminarTitulo(string idTitulo)
        {
            try
            {
                var titulo = _context.DetalleTitulo.Find(int.Parse(idTitulo));

                if (titulo != null)
                {
                    _context.DetalleTitulo.Remove(titulo);
                    _context.SaveChanges();
                    return 1;
                }
                else
                {
                    // Manejar el caso en que la referencia no se encontró
                    return -1;
                }
            }
            catch (Exception ex)
            {
                throw;

            }
        }


        public DETALLE_TITULO MostrarTitulo(string idTitulo)
        {
            try
            {
                var titulo = _context.DetalleTitulo.Find(int.Parse(idTitulo));

                if (titulo != null)
                {

                    return titulo;
                }
                else
                {
                    return  null;
                }
            }
            catch (Exception ex)
            {
                throw;

            }
        }


        //este metodo actualiza los datos del titulo
        public int ActualizarTitulo(IFormCollection form)
        {
            var idDetalleTitulo = form["idTitulo"].FirstOrDefault();

            var detalleTitulo = _context.DetalleTitulo.Find(int.Parse(idDetalleTitulo));

            if (detalleTitulo != null)
            {
                // Modificar las propiedades
                detalleTitulo.TIPO_TITULO = int.Parse(form["nivelEducacion"].FirstOrDefault());
                detalleTitulo.ESPECIALIDAD = form["titulo"].FirstOrDefault();
                detalleTitulo.NOMBRE_INSTITUCION = form["institucion"].FirstOrDefault();
                detalleTitulo.FECHA_OBTENCION = DateTime.Parse(form["fechaObtenido"].FirstOrDefault());
                detalleTitulo.FOLIO = int.Parse(form["folio"].FirstOrDefault());
                detalleTitulo.ASIENTO = int.Parse(form["asiento"].FirstOrDefault());

                // Guardar los cambios
                _context.SaveChanges();
                return 1;
            }
            else
            {
                return -1;
            }

            

          
        }




        ///////////////////////////////////////////////////// seccion de referencias ////////////////////////////////////////////////////////////////
        

        //retorna el id de la referencia agregada si todo sale bien, retorna -1 si sale mal
        public int AgregarReferecia(IFormCollection form)
        {

            int retorno = -1;
            var identificacion = form["identificacion"].FirstOrDefault();
            var clave = form["clave"].FirstOrDefault();


            try
            {
                //consulta el id del oferente con la identificacion y clave dada
                var idOferente = _context.Oferente
                .Where(o => o.identificacion == identificacion && o.clave == clave)
                .Select(o => o.idOferente)
                .FirstOrDefault();

                //consulta el id del expediente de ese oferente
                var idExpediente = _context.Expediente
                .Where(e => e.idOferente == idOferente)
                .Select(e => e.ID_EXPEDIENTE)
                .FirstOrDefault();

                //consulta el id de la referencia donde contenga ese id de expediente
                var idReferencia = _context.Referencia
                .Where(t => t.ID_EXPEDIENTE == idExpediente)
                .Select(t => t.ID_REFERENCIA)
                .FirstOrDefault();


                int tipoReferencia=int.Parse(form["tipoReferencia"].FirstOrDefault());

                DETALLE_REFERENCIAS datosReferencia = new DETALLE_REFERENCIAS()
                {
                    ID_REFERENCIA = idReferencia,
                    TIPO = (tipoReferencia == 1 ? '1' : '2'),
                    NOMBRE_EMPRESA= (tipoReferencia == 1 ? "" : form["nombreEmpresa"].FirstOrDefault()),
                    NOMBRE_APELLIDOS= (tipoReferencia == 2 ? "" : form["nombrePersonaRefiere"].FirstOrDefault()),
                    CONTACTO= Regex.Replace(form["contacto"].FirstOrDefault(), @"\D", ""),
                    ESTADO=false
                };

                _context.DetalleReferencia.Add(datosReferencia);
                _context.SaveChanges();

                retorno = datosReferencia.ID_DETALLE_REFERENCIA;

                return retorno;



            }
            catch (Exception)
            {
                throw;
            }

        }



        public List<DETALLE_REFERENCIAS> CargarReferenciasPersonales(string identificacion, string clave)
        {

            var idOferente = _context.Oferente
              .Where(o => o.identificacion == identificacion && o.clave == clave)
              .Select(o => o.idOferente)
              .FirstOrDefault();

            //consulta el id del expediente de ese oferente
            var idExpediente = _context.Expediente
            .Where(e => e.idOferente == idOferente)
            .Select(e => e.ID_EXPEDIENTE)
            .FirstOrDefault();

            //consulta el id de la referencia donde contenga ese id de expediente
            var idReferencia = _context.Referencia
            .Where(t => t.ID_EXPEDIENTE == idExpediente)
            .Select(t => t.ID_REFERENCIA)
            .FirstOrDefault();

            //filtrar en una lista los titulos por id
            List<DETALLE_REFERENCIAS> referencias = _context.DetalleReferencia
            .Where(r => r.ID_REFERENCIA == idReferencia)
            .ToList();

            if (referencias.Any())
            {
                return referencias;
            }

            return null;
        }



        public int EliminarReferencia(string idReferencia)
        {
            try
            {
                var referencia = _context.DetalleReferencia.Find(int.Parse(idReferencia));

                if (referencia != null)
                {
                    _context.DetalleReferencia.Remove(referencia);
                    _context.SaveChanges();
                    return 1;
                }
                else
                {
                    // Manejar el caso en que la referencia no se encontró
                    return -1;
                }
            }
            catch (Exception ex)
            {
                throw;

            }
        }




        /////////////////////////////////////////////////// SECCIÓN DE EXPERIENCIAS ///////////////////////////////////////////////
        //retorna el id del tetilo añadido si todos sale bien , -1 si no sale bien
        public int AgregarExperiencia(IFormCollection form)
        {
            int retorno = -1;
            var identificacion = form["identificacion"].FirstOrDefault();
            var clave = form["clave"].FirstOrDefault();


            try
            {
                //consulta el id del oferente con la identificacion y clave dada
                var idOferente = _context.Oferente
                .Where(o => o.identificacion == identificacion && o.clave == clave)
                .Select(o => o.idOferente)
                .FirstOrDefault();

                //consulta el id del expediente de ese oferente
                var idExpediente = _context.Expediente
                .Where(e => e.idOferente == idOferente)
                .Select(e => e.ID_EXPEDIENTE)
                .FirstOrDefault();

                //consulta el id de la experiencia
                var idExperiencia = _context.Experiencia
                .Where(e => e.ID_EXPEDIENTE == idExpediente)
                .Select(e => e.ID_EXPERIENCIA)
                .FirstOrDefault();

                DETALLE_EXPERIENCIA datosExperiencia = new DETALLE_EXPERIENCIA()
                {
                    ID_EXPERIENCIA=idExperiencia,
                    NOMBRE_EMPRESA= form["nombreEmpresa"].FirstOrDefault(),
                    DESCRIPCION_LABORES= form["labores"].FirstOrDefault(),
                    inicio = int.Parse(form["inicio"].FirstOrDefault()),
                    fin = int.Parse(form["fin"].FirstOrDefault()),
                    TELEFONO= Regex.Replace(form["contacto"].FirstOrDefault(), @"\D", "")
                };


                _context.DetalleExperiencia.Add(datosExperiencia);
                _context.SaveChanges();

                retorno = datosExperiencia.ID_DETALLE_EXPERIENCIA;

                return retorno;



            }
            catch (Exception)
            {
                throw;
            }



        }




        public List<DETALLE_EXPERIENCIA> CargarExperiencias(string identificacion, string clave)
        {

            var idOferente = _context.Oferente
              .Where(o => o.identificacion == identificacion && o.clave == clave)
              .Select(o => o.idOferente)
              .FirstOrDefault();

            //consulta el id del expediente de ese oferente
            var idExpediente = _context.Expediente
            .Where(e => e.idOferente == idOferente)
            .Select(e => e.ID_EXPEDIENTE)
            .FirstOrDefault();

            //consulta el id de la experiencia
            var idExperiencia = _context.Experiencia
            .Where(e => e.ID_EXPEDIENTE == idExpediente)
            .Select(e => e.ID_EXPERIENCIA)
            .FirstOrDefault();

            //filtrar en una lista los experiencias por id
            List<DETALLE_EXPERIENCIA> experiencias = _context.DetalleExperiencia
            .Where(e => e.ID_EXPERIENCIA == idExperiencia)
            .ToList();

            if (experiencias.Any())
            {
                return experiencias;
            }

            return null;
        }



        //retorna 1 si se elimina, -1 si algo sale mal
        public int EliminarExperiencia(string idExperiencia)
        {
            try
            {
                var experiencia = _context.DetalleExperiencia.Find(int.Parse(idExperiencia));

                if (experiencia != null)
                {
                    _context.DetalleExperiencia.Remove(experiencia);
                    _context.SaveChanges();
                    return 1;
                }
                else
                {
                    // Manejar el caso en que la referencia no se encontró
                    return -1;
                }
            }
            catch (Exception ex)
            {
                throw;

            }
        }













    }




}

