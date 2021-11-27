using Microsoft.AspNetCore.ResponseCompression;
using RndTacToe.ConnectionManager;
using RndTacToe.Lobby.DataAccess;
using RndTacToe.Server.Hubs;
using Microsoft.EntityFrameworkCore;
using RndTacToe.Lobby.Core;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddPolicy("CorsPolicy", o =>
    o.AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()
));

builder.Services.AddResponseCompression(opts =>
{
    opts.Providers.Add<BrotliCompressionProvider>();
    opts.Providers.Add<GzipCompressionProvider>();
    opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
        new[] { "application/octet-stream" });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();
// services
builder.Services.AddDbContext<LobbyContext>(options => 
    options.UseInMemoryDatabase(databaseName: "Lobby"));

builder.Services.AddScoped<ILobbyService, LobbyService>();

builder.Services.AddSingleton<IHubGroupManager, HubGroupManager>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (!app.Environment.IsDevelopment())
{
    app.UseFileServer();
}

app.MapHub<GameHub>("/game-hub");

//app.UseAuthorization();

app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();
