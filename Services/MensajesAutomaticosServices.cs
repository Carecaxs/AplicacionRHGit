using AplicacionRHGit.Data;
using AplicacionRHGit.Models;
using Microsoft.EntityFrameworkCore;
using Proyecto.Models;
using System.Net;
using System.Net.Mail;

namespace AplicacionRHGit.Services
{
    public class MensajesAutomaticosServices
    {

        private readonly ApplicationDbContext _context;

        public MensajesAutomaticosServices(ApplicationDbContext context)
        {
            _context = context;
        }

        public int EnviarCorreo(Usuario usuario, string mensaje)
        {
            try
            {
                using (SmtpClient smtpClient = new SmtpClient("smtp.gmail.com"))
                {
                    smtpClient.Port = 587;
                    smtpClient.Credentials = new NetworkCredential("plataformarh0@gmail.com", "tieghnwdhlcwwpae");
                    smtpClient.EnableSsl = true;

                    using (MailMessage mailMessage = new MailMessage
                    {
                        From = new MailAddress("plataformarh0@gmail.com"),
                        Subject = "Registro RH Bolsa de Empleo",
                        Body = MensajeCorreo(usuario, mensaje),
                        IsBodyHtml = false,
                    })
                    {
                        mailMessage.To.Add(usuario.correo);

                        smtpClient.Send(mailMessage);
                        Console.WriteLine("Correo enviado exitosamente");
                        return 1;
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

            return "Bienvenid@ <b>" + nombre_completo + "</b><br>" + mensaje;
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
    }




}
