

using NET9.Domain.Entities;

namespace NET9.Application.Interfaces
{
    public interface IProductRepository
    {
        Task<ProductEntity?> GetByIdAsync(int id);
    }
}
