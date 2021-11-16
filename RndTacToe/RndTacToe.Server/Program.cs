using Microsoft.AspNetCore.ResponseCompression;
using RndTacToe.Server.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddPolicy("CorsPolicy", o =>
    o.AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins("http://localhost:4200")
));

builder.Services.AddResponseCompression(opts =>
{
    opts.Providers.Add<BrotliCompressionProvider>();
    opts.Providers.Add<GzipCompressionProvider>();
    opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
        new[] { "application/octet-stream" });
});

builder.Services.AddSignalR();

var app = builder.Build();

var env = builder.Environment;

app.UseCors();

app.UseResponseCompression();

app.MapHub<GameHub>("/game-hub");

if (!env.IsDevelopment())
{
    app.UseFileServer();
}

app.Run();