using AplicacionRHGit.Clases;
using AplicacionRHGit.Models;
using AplicacionRHGit.Models.InstitucionesEducativas;
using AplicacionRHGit.Models.OfertasLaborales;
using AplicacionRHGit.Models.Ubicaciones;
using Microsoft.EntityFrameworkCore.Storage;
using System.Globalization;

namespace AplicacionRHGit.Data
{
    public class ReclutadorDAO
    {

        private readonly ApplicationDbContext _context;

        public ReclutadorDAO(ApplicationDbContext context)
        {
            _context = context;
        }


        ///metodo para agregar la institucion por parte del reclutador
        public void AgregarInstitucion(IFormCollection form)
        {
            try
            {
                int idInstituto = int.Parse(form["institucion"].FirstOrDefault());




                //consulta el id del oferente con la cedula dada
                 var idReclutador = _context.Reclutador
                .Where(o => o.identificacion == form["identificacion"].FirstOrDefault())
                .Select(o => o.idReclutador)
                .FirstOrDefault();
       
                RECLUTADOR_INSTITUCION ReclutadorInstitucion = new RECLUTADOR_INSTITUCION()
                {
                    ID_RECLUTADOR=idReclutador,

                    ID_INSTITUCION=idInstituto,
                    DIRECCION= form["direccion"].FirstOrDefault()
                };
                _context.Reclutador_Institucion.Add(ReclutadorInstitucion);

                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        //metodos para la secccion de administrar materias
        public void AgregarMateriaInstitucion(int idMateria, int idReclutadorInstitucion)
        {
            try
            {
                Materia_Institucion agregarMateria = new Materia_Institucion()
                {
                    ID_Materia = idMateria,
                    id_reclutador_institucion = idReclutadorInstitucion
                };

                _context.Materia_Institucion.Add(agregarMateria);
                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public void EliminarMateriaInstitucion(int idMateria, string identificacion)
        {
            try
            {
                //consulta el id del oferente con la cedula dada
                var idReclutador = _context.Reclutador
               .Where(o => o.identificacion == identificacion)
               .Select(o => o.idReclutador)
               .FirstOrDefault();

                var idReclutadorInstitucion = _context.Reclutador_Institucion.Where(r => r.ID_RECLUTADOR == idReclutador)
                     .Select(r => r.ID_RECLUTADOR_INSTITUCION).FirstOrDefault();

                var materia = _context.Materia_Institucion.Where(m => m.id_reclutador_institucion == idReclutadorInstitucion && m.ID_Materia == idMateria)
                    .SingleOrDefault();

                _context.Materia_Institucion.Remove(materia);
                _context.SaveChanges();
                
               
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //metodos para la secccion de reclutamiento
        public void CrearOferta(IFormCollection form)
        {
            try
            {
                //consulta el id del oferente con la cedula dada
                var idReclutador = _context.Reclutador
               .Where(o => o.identificacion == form["identificacion"].FirstOrDefault())
               .Select(o => o.idReclutador)
               .FirstOrDefault();

                var idReclutadorInstitucion=_context.Reclutador_Institucion
                    .Where(r => r.ID_RECLUTADOR == idReclutador)
                    .Select(r=>r.ID_RECLUTADOR_INSTITUCION)
                    .SingleOrDefault();

                Oferta_Laboral oferta = new Oferta_Laboral()
                {
                    titulo= form["titulo"].FirstOrDefault(),
                    descripcion= form["descripcion"].FirstOrDefault(),
                    fecha_publicacion= DateTime.Now,
                    estado=false,
                    idOferente=null,
                    id_reclutador_institucion=idReclutadorInstitucion,
                    id_materia= int.Parse(form["materias"].FirstOrDefault()),
                    idGrupoProf = int.Parse(form["grupoProfesional"].FirstOrDefault()),
                    cantidadVacantes = int.Parse(form["numVacantes"].FirstOrDefault()),
                    horario = int.Parse(form["horario"].FirstOrDefault())
                };

                _context.Oferta_Laboral.Add(oferta);
                _context.SaveChanges();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void ActualizarOferta(string titulo, string descripcion, int cantidadVacantes, int idOferta, int horario)
        {
            try
            {
                var oferta=_context.Oferta_Laboral.SingleOrDefault(o=>o.id_oferta==idOferta);
                if (oferta != null)
                {
                    oferta.titulo = titulo;
                    oferta.descripcion = descripcion;
                    oferta.cantidadVacantes = cantidadVacantes;
                    oferta.horario = horario;
                }

                _context.SaveChanges();                    

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //metodos seccion agregarEditarEmpleados

        public void AgregarEmpleado(IFormCollection form)
        {
            try
            {
                var idReclutador = _context.Reclutador
                     .Where(o => o.identificacion == form["identificacionReclutador"].FirstOrDefault().Replace("-", ""))
                     .Select(o => o.idReclutador)
                     .FirstOrDefault();

                var idInstitucion =_context.Reclutador_Institucion
                    .Where(r => r.ID_RECLUTADOR == idReclutador)
                    .Select(r => r.ID_INSTITUCION)
                    .SingleOrDefault();


                string[] arregloApellidos = form["apellidos"].FirstOrDefault().Split(' ');
                EmpleadoExterno empleadoExterno = new EmpleadoExterno()
                {
                    identificacion= form["identificacion"].FirstOrDefault().Replace("-", ""),
                    nombre= form["nombre"].FirstOrDefault(),
                    apellido1 = arregloApellidos[0],
                    apellido2 = arregloApellidos[1],
                    genero = char.Parse(form["genero"].FirstOrDefault()),
                    fechaNacimiento = DateTime.ParseExact(form["nacimiento"].FirstOrDefault(), "dd/MM/yyyy", CultureInfo.InvariantCulture),
                    telefono = form["telefono"].FirstOrDefault().Replace("-", ""),
                    correo = form["correo"].FirstOrDefault(),
                    idProvincia = int.Parse(form["provincias"].FirstOrDefault()),
                    idCanton = int.Parse(form["cantones"].FirstOrDefault()),
                    idDistrito = int.Parse(form["distritos"].FirstOrDefault()),
                    direccion = form["direccion"].FirstOrDefault(),
                    tipoEmpleado = form["tipoEmpleado"].FirstOrDefault(),
                    estado = true,
                    ID_INSTITUCION=idInstitucion
                };
         
                _context.EmpleadoExterno.Add(empleadoExterno);

                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public void EditarEmpleado(IFormCollection form)
        {
            try
            {
                var idReclutador = _context.Reclutador
                 .Where(o => o.identificacion == form["identificacionReclutador"].FirstOrDefault().Replace("-", ""))
                 .Select(o => o.idReclutador)
                 .FirstOrDefault();

                var idInstitucion = _context.Reclutador_Institucion
                    .Where(r => r.ID_RECLUTADOR == idReclutador)
                    .Select(r => r.ID_INSTITUCION)
                    .SingleOrDefault();

                string identificacionEmpleado = form["identificacion"].FirstOrDefault().Replace("-", "");
                int estado= int.Parse(form["estado"].FirstOrDefault());

                var empleado = _context.EmpleadoExterno
                    .Where(e => e.identificacion.Equals(identificacionEmpleado) && e.ID_INSTITUCION.Equals(idInstitucion)).SingleOrDefault();

                if(empleado != null) {

                    empleado.telefono = form["telefono"].FirstOrDefault().Replace("-", "");
                    empleado.correo = form["correo"].FirstOrDefault();
                    empleado.idProvincia = int.Parse(form["provincias"].FirstOrDefault());
                    empleado.idCanton = int.Parse(form["cantones"].FirstOrDefault());
                    empleado.idDistrito = int.Parse(form["distritos"].FirstOrDefault());
                    empleado.direccion = form["direccion"].FirstOrDefault();
                    empleado.tipoEmpleado = form["tipoEmpleado"].FirstOrDefault();
                    empleado.estado = estado==1 ? true:false;
                }

                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
