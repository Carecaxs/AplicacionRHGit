﻿using AplicacionRHGit.Clases;
using AplicacionRHGit.Models;
using AplicacionRHGit.Models.Expedientes;
using AplicacionRHGit.Models.Mensajeria;
using AplicacionRHGit.Models.OfertasLaborales;
using Azure.Core;
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
                    FECHA_OBTENCION = DateTime.Parse(form["fechaObtenido"].FirstOrDefault()),
                    ESTADO = 'P'
                };

                if (!string.IsNullOrEmpty(form["titulo"].FirstOrDefault()))
                {
                    // El título existe, puedes asignarlo a ESPECIALIDAD
                    datosTitulo.ESPECIALIDAD = form["titulo"].FirstOrDefault();
                }
                else
                {
                    datosTitulo.ESPECIALIDAD = form["carreras"].FirstOrDefault();
                }


                if (!string.IsNullOrEmpty(form["institucion"].FirstOrDefault()))
                {
                    // El título existe, puedes asignarlo a ESPECIALIDAD
                    datosTitulo.NOMBRE_INSTITUCION = form["institucion"].FirstOrDefault();
                }
                else
                {
                    datosTitulo.NOMBRE_INSTITUCION = form["instituto"].FirstOrDefault();
                }

                if (!string.IsNullOrEmpty(form["folio"].FirstOrDefault()))
                {
                    datosTitulo.FOLIO = int.Parse(form["folio"].FirstOrDefault());
                }
                else
                {
                    datosTitulo.FOLIO = 0;
                }


                if (!string.IsNullOrEmpty(form["asiento"].FirstOrDefault()))
                {
                    datosTitulo.ASIENTO = int.Parse(form["asiento"].FirstOrDefault());
                }
                else
                {
                    datosTitulo.ASIENTO = 0;
                }



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
            .OrderByDescending(t => t.FECHA_OBTENCION)
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
                detalleTitulo.FECHA_OBTENCION = DateTime.Parse(form["fechaObtenido"].FirstOrDefault());
                detalleTitulo.FOLIO = int.Parse(form["folio"].FirstOrDefault());
                detalleTitulo.ASIENTO = int.Parse(form["asiento"].FirstOrDefault());


                if (!string.IsNullOrEmpty(form["titulo"].FirstOrDefault()))
                {
                    // El título existe, puedes asignarlo a ESPECIALIDAD
                    detalleTitulo.ESPECIALIDAD = form["titulo"].FirstOrDefault();
                }
                else
                {
                    detalleTitulo.ESPECIALIDAD = form["carreras"].FirstOrDefault();
                }


                if (!string.IsNullOrEmpty(form["institucion"].FirstOrDefault()))
                {
                    // El título existe, puedes asignarlo a ESPECIALIDAD
                    detalleTitulo.NOMBRE_INSTITUCION = form["institucion"].FirstOrDefault();
                }
                else
                {
                    detalleTitulo.NOMBRE_INSTITUCION = form["instituto"].FirstOrDefault();
                }


                if (!string.IsNullOrEmpty(form["folio"].FirstOrDefault()))
                {
                    detalleTitulo.FOLIO = int.Parse(form["folio"].FirstOrDefault());
                }
                else
                {
                    detalleTitulo.FOLIO = 0;
                }


                if (!string.IsNullOrEmpty(form["asiento"].FirstOrDefault()))
                {
                    detalleTitulo.ASIENTO = int.Parse(form["asiento"].FirstOrDefault());
                }
                else
                {
                    detalleTitulo.ASIENTO = 0;
                }

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



        public List<DETALLE_REFERENCIAS> CargarReferencias(string identificacion, string clave, char tipoReferencia)
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
            .Where(r => r.ID_EXPEDIENTE == idExpediente)
            .Select(r => r.ID_REFERENCIA)
            .FirstOrDefault();

            //filtrar en una lista los titulos por id
            List<DETALLE_REFERENCIAS> referencias = _context.DetalleReferencia
            .Where(r => r.ID_REFERENCIA == idReferencia && r.TIPO==tipoReferencia)
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
                    ID_EXPERIENCIA = idExperiencia,
                    NOMBRE_EMPRESA = form["nombreEmpresa"].FirstOrDefault(),
                    DESCRIPCION_LABORES = form["labores"].FirstOrDefault(),
                    inicio = int.Parse(form["inicio"].FirstOrDefault()),
                    fin = int.Parse(form["fin"].FirstOrDefault()),
                    TELEFONO = Regex.Replace(form["contacto"].FirstOrDefault(), @"\D", "")
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
            .OrderByDescending(e => e.fin)
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





        ///////////////////////////////////////////////////// seccion de ver ofertas ////////////////////////////////////////////////////////////////

        //retorna id del registro agregado si sale bien, -1 si algo sale mal, -2 si ya existe la postulacion de ese oferente
        public int AgregarPostulacion(int idOferta, string identificacion)
        {
            try
            {
                int retorno = -1;

                // Obtener el idOferente usando la identificación
                var idOferente = _context.Oferente
                    .Where(o => o.identificacion == identificacion)
                    .Select(o => o.idOferente)
                    .FirstOrDefault();

                // Verificar si ya existe una postulación para la oferta y el oferente
                bool postulacionExistente = _context.Postulaciones_Oferente
                    .Any(p => p.id_oferta == idOferta && p.idOferente == idOferente);

                if (!postulacionExistente)
                {
                    // Si no existe, agregar la nueva postulación
                    Postulaciones_Oferente postulacion = new Postulaciones_Oferente()
                    {
                        id_oferta = idOferta,
                        idOferente = idOferente,
                        estado = false
                    };

                    _context.Postulaciones_Oferente.Add(postulacion);
                    _context.SaveChanges();

                    retorno = postulacion.id;
                }
                else
                {
                    // Puedes manejar la lógica si la postulación ya existe
                    // En este ejemplo, simplemente se asigna -2 como indicador de que ya existe.
                    retorno = -2;
                }

                return retorno;
            }
            catch (Exception ex)
            {
                // Manejar la excepción según tus necesidades
                throw;
            }
        }




        ///////////////////////////////////////////////////// seccion de crear oferta ////////////////////////////////////////////////////////////////

        public int CrearOferta(string identificacion, int idProvincia, int idCanton, string descripcion, List<int> listaMaterias)
        {

            try
            {
                int idOfertaCreada = -1;

                // Obtener el idOferente usando la identificación
                var idOferente = _context.Oferente
                    .Where(o => o.identificacion == identificacion)
                    .Select(o => o.idOferente)
                    .FirstOrDefault();

                Oferta_Creada_Oferente ofertaCreada = new Oferta_Creada_Oferente()
                {
                    idOferente = idOferente,
                    estado = false,
                    descripcion = descripcion,
                    fecha_publicacion = DateTime.Now,
                    IdCanton = idCanton,
                    IdProvincia = idProvincia
                };

                // Agregar la oferta principal a la base de datos
                _context.Oferta_Creada_Oferente.Add(ofertaCreada);
                _context.SaveChanges();

                // Obtener el id de la oferta creada
                idOfertaCreada = ofertaCreada.id;

                // Insertar las materias asociadas a la oferta creada
                foreach (int idMateria in listaMaterias)
                {
                    Materia_Oferta_Creada_Oferente materiaOferta = new Materia_Oferta_Creada_Oferente()
                    {
                        ID_Materia = idMateria,
                        id_Ofertas_Creadas_Oferentes = idOfertaCreada
                    };

                    // Agregar la relación materia-oferta a la base de datos
                    _context.Materia_Oferta_Creada_Oferente.Add(materiaOferta);
                }

                // Guardar los cambios en la base de datos
                _context.SaveChanges();
                return idOfertaCreada;

            }
            catch(Exception ex) 
            {
                throw;
            }
        }


    }




}

