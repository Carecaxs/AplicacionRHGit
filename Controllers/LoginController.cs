using Microsoft.AspNetCore.Mvc;

namespace AplicacionRHGit.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Crear(string tipoUsuario)
        {
            ViewData["Usuario"] = tipoUsuario;
            return View();
        }
    }
}
