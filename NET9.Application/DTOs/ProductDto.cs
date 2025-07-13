using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NET9.Application.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal? Price { get; set; }

        public decimal Discount { get; set; }      // ส่วนลดที่คำนวณแล้ว
        public decimal FinalPrice { get; set; }    // ราคาสุดท้ายหลังลด

    }
}
