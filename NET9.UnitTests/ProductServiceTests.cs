using AutoMapper;
using Moq;
using NET9.Application.DTOs.Products;
using NET9.Application.Interfaces;
using NET9.Application.Services;
using NET9.Domain.Entities;
using Xunit;

namespace NET9.UnitTests
{
    public class ProductServiceTests
    {
        private readonly Mock<IProductRepository> _mockRepo;
        private readonly IMapper _mapper;
        private readonly ProductService _service;

        public ProductServiceTests()
        {
            // Mock Repository
            _mockRepo = new Mock<IProductRepository>();

            // Configure AutoMapper
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ProductEntity, ProductDto>().ReverseMap();
            });
            _mapper = config.CreateMapper();

            // Inject mock + mapper
            _service = new ProductService(_mockRepo.Object, _mapper);
        }

        //ทดสอบกรณี "ปกติ" → ข้อมูลมีอยู่จริง → คืนข้อมูลได้ถูกต้อง
        [Fact]
        public async Task GetProductAsync_Returns_Product_When_Found()
        {
            // Arrange เตรียมข้อมูล, Mock, ตัวแปรจำเป็น
            var productId = 1;
            var productEntity = new ProductEntity
            {
                Id = productId,
                Name = "Test Product",
                Price = 1000
            };

            //.Setup(...).ReturnsAsync(...) = การตั้งค่า mock method ว่าถ้าเรียก → ให้คืนค่าอะไร
            _mockRepo.Setup(r => r.GetByIdAsync(productId))
                     .ReturnsAsync(productEntity);

            // Act เรียก method ที่ต้องการทดสอบ
            var result = await _service.GetProductAsync(productId);

            // Assert ตรวจสอบผลลัพธ์
            Assert.NotNull(result); //มีการคืนค่าจาก service จริง
            Assert.Equal(productId, result!.Id); //	Id ตรงกับที่เราต้องการ
            Assert.Equal("Test Product", result.Name); //ตรวจว่า Name ของ product ที่คืนมา ต้องตรงกับค่าที่เราจำลองไว้
        }

        //ทดสอบกรณี "ข้อมูลไม่พบ" → method ต้องไม่ throw error, แต่คืน null อย่างถูกต้อง
        [Fact]
        public async Task GetProductAsync_Returns_Null_When_NotFound()
        {
            // Arrange 
            var productId = 99;
            _mockRepo.Setup(r => r.GetByIdAsync(productId))
                     .ReturnsAsync((ProductEntity?)null);

            // Act 
            var result = await _service.GetProductAsync(productId);

            // Assert 
            Assert.Null(result);
        }

        //ในระบบมีสินค้า → GetAllProductsAsync() ต้องคืน List ของ ProductDto กลับมา
        [Fact]
        public async Task GetAllProductsAsync_Returns_ProductList_When_DataExists()
        {
            // Arrange
            var productList = new List<ProductEntity>
            {
                new ProductEntity { Id = 1, Name = "Product A", Price = 1000 },
                new ProductEntity { Id = 2, Name = "Product B", Price = 2000 }
            };

            _mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(productList);

            // Act
            var result = await _service.GetAllProductsAsync();

            // Assert
            Assert.NotNull(result); //คืน List ไม่เป็น null
            Assert.Equal(2, result.Count()); //	มีจำนวนสินค้าตามที่ mock repo จำลองไว้

            var productArray = result.ToArray();
            Assert.Equal("Product A", productArray[0].Name); //	ข้อมูล Mapping ชื่อสินค้าถูกต้อง
            Assert.Equal("Product B", productArray[1].Name); //	ข้อมูล Mapping ชื่อสินค้าถูกต้อง
        }


    }
}
