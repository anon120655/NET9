using Microsoft.EntityFrameworkCore;
using NET9.Application.Interfaces;
using NET9.Application.Mapping;
using NET9.Application.Services;
using NET9.Infrastructure.Data.Context;
using NET9.Infrastructure.Mapping;
using NET9.Infrastructure.Repositories;
using Scalar.AspNetCore;

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

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:60472") // หรือพอร์ตของ Angular
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseCors("AllowAngular");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
