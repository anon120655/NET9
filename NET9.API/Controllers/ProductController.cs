using Microsoft.AspNetCore.Mvc;
using NET9.Application.Interfaces;

namespace NET9.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _productService.GetProductAsync(id);
            if (product == null) return NotFound();
            return Ok(product);
        }

    }

}
