using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NET9.Application.DTOs;
using NET9.Application.Interfaces;
using NET9.Domain.Entities;
using NET9.Infrastructure.Data;
using NET9.Infrastructure.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<ProductEntity?> GetByIdAsync(int id)
        {
            var efProduct = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (efProduct == null) return null;

            return _mapper.Map<ProductEntity?>(efProduct);
        }



    }
}
