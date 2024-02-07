using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json.Linq;
using System;
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

        public string Prizes { get; set; }

        public void OnGet()
        {
            var rootPath = _hostingEnvironment.ContentRootPath; //get the root path

            var fullPath = Path.Combine(rootPath, "wwwroot/data.json"); //combine the root path with that of our json file inside mydata directory

            var jsonData = System.IO.File.ReadAllText(fullPath); //read all the content inside the file

            Prizes = jsonData;
        }

        public IActionResult OnPostData(string id, int value)
        {
            var rootPath = _hostingEnvironment.ContentRootPath; //get the root path

            var fullPath = Path.Combine(rootPath, "wwwroot/data.json"); //combine the root path with that of our json file inside mydata directory

            var jsonData = System.IO.File.ReadAllText(fullPath); //read all the content inside the file

            JObject rss = JObject.Parse(jsonData);

            JObject prizes = (JObject)rss["prizes"];

            prizes[id] = value;

            string output = Newtonsoft.Json.JsonConvert.SerializeObject(rss, Newtonsoft.Json.Formatting.Indented);
            System.IO.File.WriteAllText(fullPath, output);
            return new JsonResult(output);
        }

        
    }
}