using NET9.Application.DTOs;

namespace NET9.Application.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDto>> GetAllProductsAsync();
        Task<ProductDto?> GetProductAsync(int id);
        Task<ProductDto> CreateProductAsync(ProductDto dto);
        Task<bool> UpdateProductAsync(int id, ProductDto dto);
        Task<bool> DeleteProductAsync(int id);
    }
}
