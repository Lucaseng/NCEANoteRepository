using Microsoft.EntityFrameworkCore;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data
{
    public class NCEAWebRepoDBContext : DbContext
    {
        public NCEAWebRepoDBContext(DbContextOptions<NCEAWebRepoDBContext> options) : base(options) { }
        public DbSet<User> User { get; set; }

        public DbSet<Subject> Subject { get; set; }

        public DbSet<Standard> Standard { get; set; }

        static readonly string connectionString = Environment.GetEnvironmentVariable("ASPNETCORE_CONNECTIONSTRING");

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }

    }
}
