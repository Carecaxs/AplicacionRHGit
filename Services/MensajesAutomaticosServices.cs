using AplicacionRHGit.Clases;
using AplicacionRHGit.Data;
using AplicacionRHGit.Models;
using AplicacionRHGit.Models.Mensajeria;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using Proyecto.Models;
using System.Net;
using System.Net.Mail;
using System.Runtime.Intrinsics.X86;

namespace AplicacionRHGit.Services
{
    public class MensajesAutomaticosServices
    {

        private readonly ApplicationDbContext _context;

        public MensajesAutomaticosServices(ApplicationDbContext context)
        {
            _context = context;
        }

        public int EnviarCorreo(Usuario usuario, string mensaje, int tipoCorreo)//tipo correo 1 si es de registro, 2 si es olvidar contraseña
        {
            try
            {
                using (SmtpClient smtpClient = new SmtpClient("smtp.gmail.com"))
                {
                    smtpClient.Port = 587;
                    smtpClient.Credentials = new NetworkCredential("plataformarh0@gmail.com", "tieghnwdhlcwwpae");
                    smtpClient.EnableSsl = true;

                    switch(tipoCorreo)
                    {
                        case 1://en caso de que sea para confirmar la cuenta
                            using (MailMessage mailMessage = new MailMessage
                            {
                                From = new MailAddress("plataformarh0@gmail.com"),
                                Subject = "Registro RH Bolsa de Empleo",
                                Body = MensajeCorreo(usuario, mensaje),
                                IsBodyHtml = true,
                            })
                            {
                                mailMessage.To.Add(usuario.correo);

                                smtpClient.Send(mailMessage);
                                Console.WriteLine("Correo enviado exitosamente");
                                return 1;
                            }

                        case 2: //en caso de que sea para recuperar contraseña

                            using (MailMessage mailMessage = new MailMessage
                            {
                                From = new MailAddress("plataformarh0@gmail.com"),
                                Subject = "Cambio de Contraseña",
                                Body = mensaje,
                                IsBodyHtml = true,
                            })
                            {
                                mailMessage.To.Add(usuario.correo);

                                smtpClient.Send(mailMessage);
                                Console.WriteLine("Correo enviado exitosamente");
                                return 1;
                            }

                        default:
                            return 0;
                    }

                    
                }
            }
            catch (SmtpException ex)
            {
                Console.WriteLine($"Error al enviar el correo: {ex.Message}");
                return -1;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error inesperado: {ex.Message}");
                return -1;
            }

        }


        public string MensajeCorreo(Usuario usuario, string mensaje)
        {
            LoginDAO accesoDatos = new LoginDAO(_context);
            TSE persona = accesoDatos.ObtenerDatosPersonaPorCedula(usuario.identificacion);

            string body = mensaje;
            string apellidos = "";
            string nombre_completo = "";



            if (persona == null)
            {

                return "Bienvenid@<br>" + mensaje;

            }
            else
            {
                apellidos = persona.apellido1 + " " + persona.apellido2;
                nombre_completo = "<b>" + persona.nombre + " " + apellidos + "</b>";

            }
            if (persona.genero == '1')
            {
                return "Bienvenido <b>" + nombre_completo + "</b><br>" + mensaje;
            }
            else
            {
                return "Bienvenida <b>" + nombre_completo + "</b><br>" + mensaje;

            }


        }

        public string ObtenerFechaCompleta()
        {
            string[] meses = { "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre" };

            string dia = DateTime.Now.ToString("dd");
            string mes = DateTime.Now.ToString("MM");
            string anno = DateTime.Now.ToString("yyyy");

            string date_completo = "<b>" + dia + "</b> de <b>" + meses[int.Parse(mes) - 1] + "</b> del <b>" + " " + anno + "</b>";
            string hora = "<b>" + DateTime.Now.ToString("hh:mm tt") + "</b>";

            return date_completo + " a las " + hora;
        }



        public void EnviarNotificacionPersona(Notificacion notificacion, Usuario usuario)
        {

            int celular = int.Parse(usuario.telefono);

            Notificacionxpersona notificacion_persona = new Notificacionxpersona()
            {


                cod_Notificacion = notificacion.cod_Notificacion,
                cedula = usuario.identificacion,
                estado = 0,
                telefono = celular,
                tipo_Usuario = notificacion.tipo_Usuario


            };

            using (MensajeriaContext contextMensajeria = new MensajeriaContext())
            {
                contextMensajeria.Notificacionxpersona.Add(notificacion_persona);
                contextMensajeria.SaveChanges();
            }

        }


        public Notificacion EnviarNotificacion(Usuario usuario)//, string tipoUsuario)
        {
            SMS sms = GenerarNotificacion(usuario);
            Notificacion notificacion = new Notificacion()
            {
                ced_Funcionario = usuario.identificacion,
                asunto = sms.asunto,
                mensaje = sms.mensaje,
                cod_Insti = "1189",
                permiso_Envio = sms.permiso_envio,
                hora_Envio = DateTime.Now,
                hora_Creada = DateTime.Now,
                tipo_Usuario = sms.tipo_usuario

            };

            using (MensajeriaContext db = new MensajeriaContext())
            {
                db.Notificacion.Add(notificacion);
                db.SaveChanges();
            }

            // Agregar el nuevo código a la tabla
            CODIGOS_SMS nuevoCodigo = new CODIGOS_SMS
            {
                identificacion = usuario.identificacion,
                codigo = sms.codigo
            };

            _context.CodigosSms.Add(nuevoCodigo);
            // Guardar los cambios en la base de datos
            _context.SaveChanges();


         


            return notificacion;
        }



        public SMS GenerarNotificacion(Usuario usuario)
        {
            SMS sms = new SMS();
            Guid guid = Guid.NewGuid();
            string codigo_validacion = (guid.ToString()).Substring(0, 6);

            int celular = int.Parse(usuario.telefono);



            sms.asunto = "Registro Bolsa de Empleo";
            sms.codigo = codigo_validacion;
            sms.permiso_envio = 1;
            sms.mensaje = "Su codigo de activacion es: " + sms.codigo;
            sms.tipo_usuario = "Registro";
            sms.hora_creada = DateTime.Today;
            sms.cedula = usuario.identificacion;
            sms.telefono = celular;

            return sms;
        }


    }


  



}
