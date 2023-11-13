using AplicacionRHGit.Clases;
using AplicacionRHGit.Models.Mensajeria;
using AplicacionRHGit.Services;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.Intrinsics.X86;

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
