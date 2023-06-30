using NCEAWebRepo.Data;
using NCEAWebRepo.Data.KudosData;
using NCEAWebRepo.Data.Notes;
using NCEAWebRepo.Data.Standards;
using NCEAWebRepo.Data.Subjects;
using NCEAWebRepo.Data.Users;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<NCEAWebRepoDBContext>();
//builder.Services.AddScoped<INCEAWebRepo, DBNCEAWebRepo>();
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<ISubjectRepo, SubjectRepo>();
builder.Services.AddScoped<IStandardRepo, StandardRepo>();
builder.Services.AddScoped<IKudosRepo, KudosRepo>();
builder.Services.AddScoped<INoteRepo, NoteRepo>();

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
