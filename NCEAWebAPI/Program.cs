using Microsoft.AspNetCore.Authentication;
using NCEAWebRepo.Data;
using NCEAWebRepo.Data.Auth;
using NCEAWebRepo.Data.KudosData;
using NCEAWebRepo.Data.Notes;
using NCEAWebRepo.Data.Standards;
using NCEAWebRepo.Data.Subjects;
using NCEAWebRepo.Data.Users;
using NCEAWebRepo.Handler;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//services cors
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.Configure<IdentityOptions>(options => options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier);
builder.Services.AddHttpContextAccessor();
builder.Services
    .AddAuthentication()
    .AddScheme<AuthenticationSchemeOptions, UserHandler>("UserAuth", null)
    .AddScheme<AuthenticationSchemeOptions, AdminHandler>("AdminAuthentication", null);
builder.Services.AddDbContext<NCEAWebRepoDBContext>();
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<ISubjectRepo, SubjectRepo>();
builder.Services.AddScoped<IStandardRepo, StandardRepo>();
builder.Services.AddScoped<IKudosRepo, KudosRepo>();
builder.Services.AddScoped<INoteRepo, NoteRepo>();
builder.Services.AddScoped<IAuthRepo, AuthRepo>();
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireClaim("admin"));
    options.AddPolicy("UserOnly", policy => policy.RequireClaim("email"));
});


var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("corsapp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
