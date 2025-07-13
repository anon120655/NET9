
using AutoMapper;
using NET9.Application.DTOs;
using NET9.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

    }
}
