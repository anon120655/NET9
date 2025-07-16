using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NET9.Application.DTOs.Products
{
    public class ProductQueryModel
    {
        // Pagination
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;

        // Filters (ตัวอย่าง)
        public string? NameContains { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }

        // Sorting (ถ้ามี)
        public string? SortBy { get; set; }       // e.g. "Name"
        public bool SortDesc { get; set; } = false;
    }
}
