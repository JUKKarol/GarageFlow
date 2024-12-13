using GarageFlow.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GarageFlow.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext<AppUser>(options)
{
    public DbSet<Brand> Brands { get; set; }
    public DbSet<Car> Cars { get; set; }
    public DbSet<Model> Models { get; set; }
    public DbSet<Repair> Repairs { get; set; }
    public DbSet<AppConfig> AppConfig { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Repair>(entity =>
        {
            entity.HasKey(r => r.Id);

            entity.Property(r => r.Price).IsRequired();

            //entity.HasOne(r => r.Car)
            //    .WithMany(c => c.Repairs)
            //    .HasForeignKey(r => r.CarId)
            //    .OnDelete(DeleteBehavior.NoAction);
            entity.HasMany(r => r.Users)
               .WithMany(e => e.Repairs);
        });

        modelBuilder.Entity<AppUser>(entity =>
        {
            entity.HasMany(c => c.Repairs)
                .WithMany(r => r.Users);
        });

        modelBuilder.Entity<Car>(entity =>
        {
            entity.HasKey(c => c.Id);

            entity.Property(c => c.Engine).IsRequired();
            entity.Property(c => c.Vin).IsRequired();
            entity.Property(c => c.yearOfProduction).IsRequired();
            entity.Property(c => c.ModelId).IsRequired();

            entity.HasOne(c => c.Model)
                .WithMany(m => m.Cars)
                .HasForeignKey(c => c.ModelId)
                .OnDelete(DeleteBehavior.NoAction);
            //entity.HasMany(c => c.Repairs)
            //   .WithOne(r => r.Car)
            //   .HasForeignKey(r => r.CarId)
            //   .OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<Brand>(entity =>
        {
            entity.HasKey(b => b.Id);

            entity.Property(b => b.Name).IsRequired();

            entity.HasMany(b => b.Models)
                .WithOne(m => m.Brand)
                .HasForeignKey(m => m.BrandId)
                .OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<Model>(entity =>
        {
            entity.HasKey(m => m.Id);

            entity.Property(m => m.Name).IsRequired();

            entity.HasOne(m => m.Brand)
                .WithMany(b => b.Models)
                .HasForeignKey(m => m.BrandId)
                .OnDelete(DeleteBehavior.NoAction);
            entity.HasMany(m => m.Cars)
                .WithOne(c => c.Model)
                .HasForeignKey(c => c.ModelId)
                .OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<AppConfig>(entity =>
        {
            entity.Property(e => e.Id)
                .ValueGeneratedNever();
        });

        base.OnModelCreating(modelBuilder);
    }
}