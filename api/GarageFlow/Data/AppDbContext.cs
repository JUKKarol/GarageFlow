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
    public DbSet<RepairDetail> RepairDetails { get; set; }
    public DbSet<RepairHistory> RepairHistory { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Repair>(entity =>
        {
            entity.HasKey(r => r.Id);

            entity.HasOne(r => r.Car)
                .WithMany(c => c.Repairs)
                .HasForeignKey(r => r.CarId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.NoAction);
            entity.HasMany(r => r.Users)
               .WithMany(e => e.Repairs);
            entity.HasMany(r => r.RepairDetails)
               .WithOne(rd => rd.Repair)
               .HasForeignKey(m => m.RepairId)
                .OnDelete(DeleteBehavior.NoAction);
            entity.HasMany(r => r.RepairHistory)
               .WithOne(rd => rd.Repair)
               .HasForeignKey(m => m.RepairId)
                .OnDelete(DeleteBehavior.NoAction);
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
            entity.Property(c => c.YearOfProduction).IsRequired();
            entity.Property(c => c.ModelId).IsRequired(false);

            entity.HasOne(c => c.Model)
                .WithMany(m => m.Cars)
                .HasForeignKey(c => c.ModelId)
                .OnDelete(DeleteBehavior.SetNull);
            entity.HasMany(c => c.Repairs)
               .WithOne(r => r.Car)
               .HasForeignKey(r => r.CarId)
               .OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<Brand>(entity =>
        {
            entity.HasKey(b => b.Id);

            entity.Property(b => b.Name).IsRequired();

            entity.HasMany(b => b.Models)
                .WithOne(m => m.Brand)
                .HasForeignKey(m => m.BrandId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Model>(entity =>
        {
            entity.HasKey(m => m.Id);

            entity.Property(m => m.Name).IsRequired();

            entity.HasOne(m => m.Brand)
                .WithMany(b => b.Models)
                .HasForeignKey(m => m.BrandId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasMany(m => m.Cars)
                .WithOne(c => c.Model)
                .HasForeignKey(c => c.ModelId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<AppConfig>(entity =>
        {
            entity.Property(e => e.Id)
                .ValueGeneratedNever();
        });

        modelBuilder.Entity<RepairDetail>(entity =>
        {
            entity.HasKey(rd => rd.Id);

            entity.Property(rd => rd.Name).IsRequired();
            entity.Property(rd => rd.Price).IsRequired();

            entity.HasOne(rd => rd.Repair)
                .WithMany(r => r.RepairDetails)
                .HasForeignKey(rd => rd.RepairId)
                .OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<RepairHistory>(entity =>
        {
            entity.HasKey(rh => rh.Id);

            entity.Property(rh => rh.Status).IsRequired();
            entity.Property(rh => rh.RepairId).IsRequired();

            entity.HasOne(rd => rd.Repair)
                .WithMany(r => r.RepairHistory)
                .HasForeignKey(m => m.RepairId)
                .OnDelete(DeleteBehavior.NoAction);
        });

        base.OnModelCreating(modelBuilder);
    }
}