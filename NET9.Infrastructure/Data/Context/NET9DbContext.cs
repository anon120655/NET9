using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using NET9.Infrastructure.Data.Models;

namespace NET9.Infrastructure.Data.Context;

public partial class NET9DbContext : DbContext
{
    public NET9DbContext(DbContextOptions<NET9DbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("Thai_CS_AI");

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Product__3214EC07FC99ED37");

            entity.ToTable("Product");

            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Price).HasColumnType("money");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
