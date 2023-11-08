using Microsoft.AspNetCore.Mvc;

namespace AplicacionRHGit.Controllers
{
    public class MenuPrincipalController : Controller
    {
        public IActionResult MenuAcceso()
        {
            return View();
        }


    }
}
