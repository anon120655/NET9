using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NET9.Domain.Entities
{
    public class ProductEntity
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal? Price { get; set; }

        /// <summary>
        /// คำนวณส่วนลดตามราคาสินค้า
        /// </summary>
        public decimal CalculateDiscount()
        {
            if (!Price.HasValue)
                return 0;

            var price = Price.Value;

            if (price >= 10000)
                return price * 0.20m; // ลด 20%
            else if (price >= 5000)
                return price * 0.10m; // ลด 10%
            else if (price >= 1000)
                return price * 0.05m; // ลด 5%
            else
                return 0;
        }

        /// <summary>
        /// คืนราคาหลังหักส่วนลด
        /// </summary>
        public decimal GetFinalPrice()
        {
            if (!Price.HasValue)
                return 0;

            return Price.Value - CalculateDiscount();
        }


    }
}
