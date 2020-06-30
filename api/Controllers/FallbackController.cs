using System.IO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class FallbackController : Controller
    {
        [AllowAnonymous]
        public IActionResult index()
        {
            return PhysicalFile(Path.Combine(
                Directory.GetCurrentDirectory(),"wwwroot","index.html"),"text/HMTL");
        }
    }
}