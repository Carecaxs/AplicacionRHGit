using AplicacionRHGit.Services;
using Microsoft.AspNetCore.Mvc;

namespace AplicacionRHGit.Controllers
{
    public class MenuPrincipalController : Controller
    {
        public IActionResult MenuAcceso()
        {
            MensajesAutomaticosServices emailService = new EmailService();
            return View();
        }


    }
}
