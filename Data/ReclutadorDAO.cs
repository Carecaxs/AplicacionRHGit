using AplicacionRHGit.Models.InstitucionesEducativas;
using AplicacionRHGit.Models.OfertasLaborales;
using AplicacionRHGit.Models.Ubicaciones;
using Microsoft.EntityFrameworkCore.Storage;

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
                    cantidadVacantes = int.Parse(form["numVacantes"].FirstOrDefault())
                };

                _context.Oferta_Laboral.Add(oferta);
                _context.SaveChanges();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void ActualizarOferta(string titulo, string descripcion, int cantidadVacantes, int idOferta)
        {
            try
            {
                var oferta=_context.Oferta_Laboral.SingleOrDefault(o=>o.id_oferta==idOferta);
                if (oferta != null)
                {
                    oferta.titulo = titulo;
                    oferta.descripcion = descripcion;
                    oferta.cantidadVacantes = cantidadVacantes;
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
