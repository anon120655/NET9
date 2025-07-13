using NET9.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NET9.Application.Interfaces
{
    public interface IProductService
    {
        Task<ProductDto?> GetProductAsync(int id);
    }
}
