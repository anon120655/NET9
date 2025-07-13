using NET9.Domain.Entities;

namespace NET9.Application.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<ProductEntity>> GetAllAsync();
        Task<ProductEntity?> GetByIdAsync(int id);
        Task<ProductEntity> AddAsync(ProductEntity entity);
        Task<bool> UpdateAsync(ProductEntity entity);
        Task<bool> DeleteAsync(int id);
    }
}
