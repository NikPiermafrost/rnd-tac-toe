#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-alpine AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0-alpine AS build
WORKDIR /src
COPY ["RndTacToe/Server/RndTacToe.Server.csproj", "RndTacToe/Server/"]
COPY ["RndTacToe/Shared/RndTacToe.Shared.csproj", "RndTacToe/Shared/"]
COPY ["RndTacToe/Client/RndTacToe.Client.csproj", "RndTacToe/Client/"]
RUN dotnet restore "RndTacToe/Server/RndTacToe.Server.csproj"
COPY . .
WORKDIR "/src/RndTacToe/Server"
RUN dotnet build "RndTacToe.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RndTacToe.Server.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RndTacToe.Server.dll"]
