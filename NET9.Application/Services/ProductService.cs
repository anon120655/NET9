
using AutoMapper;
using NET9.Application.DTOs;
using NET9.Application.Interfaces;
using NET9.Domain.Entities;

namespace NET9.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
        {
            var products = await _repository.GetAllAsync();

            var productDtos = new List<ProductDto>();

            foreach (var product in products)
            {
                // เรียก Business Logic ที่อยู่ใน Entity
                var discount = product.CalculateDiscount();
                var finalPrice = product.GetFinalPrice();

                // Mapping แล้วใส่ข้อมูลเพิ่ม
                var dto = _mapper.Map<ProductDto>(product);
                dto.Discount = discount;
                dto.FinalPrice = finalPrice;

                productDtos.Add(dto);
            }

            return productDtos;
        }

        public async Task<ProductDto?> GetProductAsync(int id)
        {
            var product = await _repository.GetByIdAsync(id);
            if (product == null) return null;

            // เรียก Business Logic ที่อยู่ใน Entity
            var discount = product.CalculateDiscount();
            var finalPrice = product.GetFinalPrice();

            // Mapping แล้วใส่ข้อมูลเพิ่ม
            var dto = _mapper.Map<ProductDto>(product);
            dto.Discount = discount;
            dto.FinalPrice = finalPrice;

            return dto;
        }

        public async Task<ProductDto> CreateProductAsync(ProductDto dto)
        {
            var entity = _mapper.Map<ProductEntity>(dto);
            var result = await _repository.AddAsync(entity);
            return _mapper.Map<ProductDto>(result);
        }

        public async Task<bool> UpdateProductAsync(int id, ProductDto dto)
        {
            var entity = _mapper.Map<ProductEntity>(dto);
            entity.Id = id;
            return await _repository.UpdateAsync(entity);
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }


    }
}
