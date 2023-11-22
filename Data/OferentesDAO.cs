using AplicacionRHGit.Models;
using AplicacionRHGit.Models.Expedientes;
using AplicacionRHGit.Models.Mensajeria;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

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


        //retorna 1 si todos sale bien , -1 si no sale bien
        public int GuardarCambiosDatosPersonalesEx(string identificacion, string nacimiento, string correo, string telefono, int provincia, int canton, int distrito,
            string direccion)
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
                    expediente.IdDistrito = (distrito == 0 ? null : distrito); ;
                    expediente.direccion = direccion;
                    expediente.CORREO = correo;
                    expediente.TELEFONO = telefono;

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




    }




}

