using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.SignalR;
using server.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddPolicy("CorsPolicy", o =>
  o.AllowAnyHeader()
  .AllowAnyMethod()
  .WithOrigins("http://localhost:4200")
));

builder.Services.AddResponseCompression(opts => 
{
    opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
        new[] { "application/octet-stream" });
});

builder.Services.AddSignalR();

var app = builder.Build();

app.UseCors();

app.MapHub<GridHub>("/game-hub");

app.Run();
