using AplicacionRHGit.Clases;
using AplicacionRHGit.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Proyecto.Models;
using System;

namespace AplicacionRHGit.Data
{
    public class LoginDAO
    {

        private readonly ApplicationDbContext _context;

        public LoginDAO(ApplicationDbContext context)
        {
            _context = context;
        }


        public TSE ObtenerDatosPersonaPorCedula(string cedula)
        {

            var persona = _context.TSE.Where(p => p.cedula == cedula).FirstOrDefault();
            
            if (persona != null) { 
                return persona;
            }
            else
            {
                return null;
            }
        }


        public void AgregarUsuario(Usuario usuario, string tipoUsuario)
        {

            if(tipoUsuario == "Oferente") {


                _context.Database.ExecuteSqlRaw("EXEC SP_AGREGAR_OFERENTE @identificacion, @correo, @telefono, @nombre, @apellido1, @apellido2",
               new SqlParameter("@identificacion", usuario.identificacion.Replace("-", "").Replace("_", "")),
               new SqlParameter("@correo", usuario.correo),
               new SqlParameter("@telefono", usuario.telefono.Replace("-", "")),
               new SqlParameter("@nombre", usuario.nombre),
               new SqlParameter("@apellido1", usuario.apellido1),
               new SqlParameter("@apellido2", usuario.apellido2));
            }
            else
            {

                _context.Database.ExecuteSqlRaw("EXEC SP_AGREGAR_RECLUTADOR @identificacion, @correo, @telefono, @nombre, @apellido1, @apellido2",
               new SqlParameter("@identificacion", usuario.identificacion.Replace("-", "").Replace("_", "")),
               new SqlParameter("@correo", usuario.correo),
               new SqlParameter("@telefono", usuario.telefono.Replace("-", "")),
               new SqlParameter("@nombre", usuario.nombre),
               new SqlParameter("@apellido1", usuario.apellido1),
               new SqlParameter("@apellido2", usuario.apellido2));
            }
           
        }
        
        public void EliminarCodigosAnteriores(string identificacion)
        {
            try
            {
                var codigoSms = _context.CodigosSms.FirstOrDefault(c => c.identificacion == identificacion);
                if (codigoSms != null)
                {
                    // Elimina el registro
                    _context.CodigosSms.Remove(codigoSms);
                    _context.SaveChanges();
                }

            }
            catch (Exception) {

                throw;
            }
        }

        public bool ConfirmarCuenta(string identificacion, string codigo, string tipoUsuario)
        {

            try
            {
                // Verificar si hay algún registro que coincida con la identificación y el código
                bool cuentaConfirmada = _context.CodigosSms.Any(c => c.identificacion == identificacion && c.codigo == codigo);


                if (cuentaConfirmada)
                {
                    if (tipoUsuario == "Oferente")
                    {
                        // Buscar el reclutador por identificación
                        var oferente = _context.Oferente.SingleOrDefault(o => o.identificacion == identificacion);

                        // Actualizar los campos
                        oferente.activo = true;
                        oferente.verificado = true;

                        EXPEDIENTE expediente = new EXPEDIENTE()
                        {
                            idOferente = oferente.idOferente,
                            nacimiento = null,
                            provincia = null,
                            canton = null,
                            distrito = null,
                            direccion = null
                        };

                        //crear el expediente para el oferente
                        _context.Expediente.Add(expediente);


                    }
                    else
                    {
                        // Buscar el reclutador por identificación
                        var reclutador = _context.Reclutador.SingleOrDefault(r => r.identificacion == identificacion);

                        // Actualizar los campos
                        reclutador.activo = true;
                        reclutador.verificado = true;


                    }

                    //guardar cambios
                    _context.SaveChanges();

                }

                return cuentaConfirmada;

            }
            catch (Exception) {
                throw;
            
            }


        }


        public void GuardarContraseña(string identificacion, string clave, string tipoUsuario)
        {
            try
            {
                if (tipoUsuario == "Oferente")
                {
                    // Buscar el reclutador por identificación
                    var oferente = _context.Oferente.SingleOrDefault(o => o.identificacion == identificacion);

                    // Actualizar el campo clave
                    oferente.clave = clave;


                }
                else
                {
                    // Buscar el reclutador por identificación
                    var reclutador = _context.Reclutador.SingleOrDefault(r => r.identificacion == identificacion);

                    // Actualizar el campo clave
                    reclutador.clave = clave;

                }

                //guardar cambios
                _context.SaveChanges();


            }
            catch (Exception)
            {
                throw;
            }

        }

    }
}
