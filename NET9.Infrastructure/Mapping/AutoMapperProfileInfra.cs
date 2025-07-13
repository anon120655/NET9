using AutoMapper;
using NET9.Application.DTOs;
using NET9.Domain.Entities;
using NET9.Infrastructure.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NET9.Infrastructure.Mapping
{
    public class AutoMapperProfileInfra : Profile
    {
        public AutoMapperProfileInfra()
        {
            // EF → Domain
            CreateMap<Product, ProductEntity>().ReverseMap();
        }
    }
}
