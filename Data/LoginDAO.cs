using AplicacionRHGit.Clases;
using AplicacionRHGit.Models.Dimex;
using AplicacionRHGit.Models.Expedientes;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Proyecto.Models;
using System;
using System.Globalization;

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
            using (UtilidadesContext context = new UtilidadesContext())
            {
                var persona = context.TSE.Where(p => p.cedula == cedula).FirstOrDefault();
                if (persona != null)
                {
                    return persona;
                }
                else
                {
                    return null;
                }
            }
                
            
     
        }


        public void AgregarUsuario(Usuario usuario, string tipoUsuario)
        {

            if (tipoUsuario == "Oferente")
            {



                OFERENTE agregarOferente = new OFERENTE()
                {
                    identificacion = usuario.identificacion.Replace("-", "").Replace("_", ""),
                    correo = usuario.correo,
                    telefono = usuario.telefono.Replace("-", ""),
                    nombre = usuario.nombre,
                    apellido1 = usuario.apellido1,
                    apellido2 = usuario.apellido2,
                    activo = false,
                    clave = "0",
                    verificado = false
                };

                _context.Oferente.Add(agregarOferente);
                _context.SaveChanges();



                EXPEDIENTE expediente = new EXPEDIENTE()
                {
                    idOferente = agregarOferente.idOferente,
                    nacimiento = DateTime.ParseExact(usuario.nacimiento, "dd/MM/yyyy", CultureInfo.InvariantCulture),
                    IdProvincia = null,
                    IdCanton = null,
                    IdDistrito = null,
                    direccion = null,
                    genero = usuario.sexo,
                    correoOpcional = "",
                    telefonoOpcional = ""
                };

                //crear el expediente para el oferente
                _context.Expediente.Add(expediente);
                _context.SaveChanges();



                //ahora a ese expediente lo relacionamos con tabla titulos, refrencias, experiencias

                TITULO titulo = new TITULO()
                {
                    ID_EXPEDIENTE = expediente.ID_EXPEDIENTE
                };

                REFERENCIA refrencia = new REFERENCIA()
                {
                    ID_EXPEDIENTE = expediente.ID_EXPEDIENTE
                };



                EXPERIENCIA experiencia = new EXPERIENCIA()
                {
                    ID_EXPEDIENTE = expediente.ID_EXPEDIENTE
                };


                //comprobar si es cedula o dimex
                //si es dimex agreagamos un registro a la tabla verificacionDimex para poder validar mas adelante el dimex de la persona
                if (agregarOferente.identificacion.Length != 10)
                {
                    VerificacionDimex dimex = new VerificacionDimex()
                    {
                        idOferente = agregarOferente.idOferente,
                        estado = 0
                    };
                    _context.VerificacionDimex.Add(dimex);
                }

                _context.Titulo.Add(titulo);
                _context.Referencia.Add(refrencia);
                _context.Experiencia.Add(experiencia);

                _context.SaveChanges();

            }
            else
            {

                RECLUTADOR agregarReclutador = new RECLUTADOR()
                {
                    identificacion = usuario.identificacion.Replace("-", "").Replace("_", ""),
                    correo = usuario.correo,
                    telefono = usuario.telefono.Replace("-", ""),
                    nombre = usuario.nombre,
                    apellido1 = usuario.apellido1,
                    apellido2 = usuario.apellido2,
                    activo = false,
                    clave = "0",
                    verificado = false
                };

                _context.Reclutador.Add(agregarReclutador);
                _context.SaveChanges();

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


                        _context.SaveChanges();



                    }
                    else
                    {
                        // Buscar el reclutador por identificación
                        var reclutador = _context.Reclutador.SingleOrDefault(r => r.identificacion == identificacion);

                        // Actualizar los campos
                        reclutador.activo = true;
                        reclutador.verificado = true;

                        //guardar cambios
                        _context.SaveChanges();
                    }



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


        //funcion retorna true si el usuario esta verificado
        public bool IsVerificado(string identificacion, string tipoUsuario) {

            bool verificado;

            if (tipoUsuario == "Oferente")
            {
                verificado = _context.Oferente
                .Where(o => o.identificacion == identificacion)
                .Select(o => o.verificado)
                .FirstOrDefault();
            }
            else
            {
                verificado = _context.Reclutador
                .Where(r => r.identificacion == identificacion)
                .Select(r => r.verificado)
                .FirstOrDefault();

          
            }

            return verificado;

        }

        //retorna true si el correo existe
        public bool CorreoExiste(string correo, string tipoUsuario) {

            

            if (tipoUsuario == "Oferente")
            {
                var usuario = _context.Oferente.FirstOrDefault(o => o.correo == correo);
                if(usuario != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                var usuario = _context.Reclutador.FirstOrDefault(r => r.correo == correo);
                if (usuario != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }


        public void CambiarVerificadoFalse(string identificacion, string tipoUsuario)
        {

            if (tipoUsuario == "Oferente")
            {
                var oferente = _context.Oferente.SingleOrDefault(o => o.identificacion == identificacion);

                // Verifica si se encontró el oferente.
                if (oferente.verificado != false)
                {
                    // Actualiza el estado 'verificado' a false.
                    oferente.verificado = false;

                    // Guarda los cambios en la base de datos.
                    _context.SaveChanges();
                }

            }
            else
            {
                var reclutador = _context.Reclutador.SingleOrDefault(r => r.identificacion == identificacion);
                // Verifica si se encontró el oferente.
                if (reclutador.verificado != false)
                {
                    // Actualiza el estado 'verificado' a false.
                    reclutador.verificado = false;

                    // Guarda los cambios en la base de datos.
                    _context.SaveChanges();
                }
            }
        }   



        //funcion retorna 1 si todo salio bien, 2 si no existe usuario, 3 si la contraseña es incorrecta
        public int InicioSesion(string identificacion, string clave, string tipoUsuario) {

            try
            {
                if (tipoUsuario == "Oferente")
                {
                    var usuario = _context.Oferente.FirstOrDefault(o => o.identificacion == identificacion);
                    if (usuario != null)
                    {
                        if (usuario.clave == clave)
                        {
                            return 1;//todo salio bien
                        }
                        else
                        {
                            return 3;//contraseña no coincide
                        }

                    }
                    else
                    {
                        return 2;//no se encontro el usuario
                    }
                }
                else
                {
                    var usuario = _context.Reclutador.FirstOrDefault(r => r.identificacion == identificacion);
                    if (usuario != null)
                    {
                        if (usuario.clave == clave)
                        {
                            return 1;//todo salio bien
                        }
                        else
                        {
                            return 3;//contraseña no coincide
                        }

                    }
                    else
                    {
                        return 2;//no se encontro el usuario
                    }
                }

            }
            catch (Exception ex) {
                throw ex;
            }
        }




    }
}
