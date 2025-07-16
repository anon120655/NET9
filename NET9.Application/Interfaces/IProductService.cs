using NET9.Application.DTOs.Products;
using NET9.Application.DTOs.Shared;

namespace NET9.Application.Interfaces
{
    public interface IProductService
    {
        Task<PaginationView<IEnumerable<ProductDto>>> GetProductsPagedAsync(ProductQueryModel q);
        Task<IEnumerable<ProductDto>> GetAllProductsAsync();
        Task<ProductDto?> GetProductAsync(int id);
        Task<ProductDto> CreateProductAsync(ProductDto dto);
        Task<bool> UpdateProductAsync(int id, ProductDto dto);
        Task<bool> DeleteProductAsync(int id);
    }
}
