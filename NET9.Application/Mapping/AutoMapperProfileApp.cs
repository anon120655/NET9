using AutoMapper;
using NET9.Application.DTOs.Products;
using NET9.Domain.Entities;

namespace NET9.Application.Mapping
{
    public class AutoMapperProfileApp : Profile
    {
        public AutoMapperProfileApp()
        {
            // Domain → DTO
            CreateMap<ProductEntity, ProductDto>().ReverseMap();
        }
    }
}
