using AplicacionRHGit.Models.InstitucionesEducativas;
using AplicacionRHGit.Models.Ubicaciones;

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
    }
}
