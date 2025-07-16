using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NET9.Application.DTOs.Products;
using NET9.Application.Interfaces;
using NET9.Domain.Entities;
using NET9.Infrastructure.Data.Context;
using NET9.Infrastructure.Data.Models;

namespace NET9.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly NET9DbContext _context;
        private readonly IMapper _mapper;

        public ProductRepository(NET9DbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<(IEnumerable<ProductEntity>, int)> GetPagedAsync(ProductQueryModel q)
        {
            var query = _context.Products.AsNoTracking().AsQueryable();

            if (!string.IsNullOrEmpty(q.NameContains))
                query = query.Where(p => p.Name!.Contains(q.NameContains));

            if (q.MinPrice.HasValue)
                query = query.Where(p => p.Price >= q.MinPrice);

            if (q.MaxPrice.HasValue)
                query = query.Where(p => p.Price <= q.MaxPrice);

            var total = await query.CountAsync();

            var items = await query
                .Skip((q.Page - 1) * q.PageSize)
                .Take(q.PageSize)
                .ToListAsync();

            return (_mapper.Map<IEnumerable<ProductEntity>>(items), total);
        }

        public async Task<IEnumerable<ProductEntity>> GetAllAsync()
        {
            var efProducts = await _context.Products.AsNoTracking().ToListAsync();

            return _mapper.Map<IEnumerable<ProductEntity>>(efProducts);
        }

        public async Task<ProductEntity?> GetByIdAsync(int id)
        {
            var efProduct = await _context.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
            if (efProduct == null) return null;

            return _mapper.Map<ProductEntity?>(efProduct);
        }
        public async Task<ProductEntity> AddAsync(ProductEntity entity)
        {
            // Map ProductEntity → EFEntity
            var efEntity = _mapper.Map<Product>(entity);

            _context.Products.Add(efEntity);
            await _context.SaveChangesAsync();

            return _mapper.Map<ProductEntity>(efEntity);
        }

        public async Task<bool> UpdateAsync(ProductEntity entity)
        {
            var efEntity = await _context.Products.FindAsync(entity.Id);
            if (efEntity == null) return false;

            // Map เฉพาะ field ที่อนุญาตให้แก้ไข (ถ้าไม่ใช้ ReverseMap โดยตรง)
            efEntity.Name = entity.Name;
            efEntity.Price = entity.Price;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var efEntity = await _context.Products.FindAsync(id);
            if (efEntity == null) return false;

            _context.Products.Remove(efEntity);
            await _context.SaveChangesAsync();
            return true;
        }


    }
}
