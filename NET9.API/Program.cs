using Microsoft.EntityFrameworkCore;
using NET9.Application.Interfaces;
using NET9.Application.Mapping;
using NET9.Application.Services;
using NET9.Infrastructure.Repositories;
using NET9.Infrastructure.Mapping;
using NET9.Infrastructure.Data.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();


var _connection = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<NET9DbContext>(options =>
    options.UseSqlServer(_connection));

var AutoMapperAssemblies = new[]
{
    typeof(AutoMapperProfileApp).Assembly,
    typeof(AutoMapperProfileInfra).Assembly
};

builder.Services.AddAutoMapper(AutoMapperAssemblies);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
