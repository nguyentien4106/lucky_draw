using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.IO;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace LuckyDraw.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private IHostingEnvironment _hostingEnvironment;

       
        public IndexModel(ILogger<IndexModel> logger, IHostingEnvironment _environment)
        {
            _logger = logger;
            _hostingEnvironment = _environment;
        }

        public string OnGet()
        {
            var rootPath = _hostingEnvironment.ContentRootPath; //get the root path

            var fullPath = Path.Combine(rootPath, "mydata/user.json"); //combine the root path with that of our json file inside mydata directory

            var jsonData = System.IO.File.ReadAllText(fullPath); //read all the content inside the file

            return jsonData;
        }

        [HttpPost]
        public void OnPost()
        {

        }
    }
}