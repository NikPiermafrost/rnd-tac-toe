FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine as base

WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM node:16-alpine as build-angular

RUN mkdir /angular-build
WORKDIR /angular-build
COPY ./web .
RUN npm i --legacy-peer-deps
RUN npm i -g @angular/cli@13
RUN ng build --prod

FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build

WORKDIR /src
COPY ["RndTacToe/RndTacToe.Server/RndTacToe.Server.csproj", "server/RndTacToe.Server/"]
COPY ["RndTacToe/RndTacToe.ConnectionManager/RndTacToe.ConnectionManager.csproj", "server/RndTacToe.ConnectionManager/"]
COPY ["RndTacToe/RndTacToe.Lobby.Core/RndTacToe.Lobby.Core.csproj", "server/RndTacToe.Lobby.Core/"]
COPY ["RndTacToe/RndTacToe.Lobby.DataAccess/RndTacToe.Lobby.DataAccess.csproj", "server/RndTacToe.Lobby.DataAccess/"]
COPY ["RndTacToe/RndTacToe.Models/RndTacToe.Models.csproj", "server/RndTacToe.Models/"]

COPY ./RndTacToe/ ./server
WORKDIR "/src/server"
RUN dotnet build "RndTacToe.Server/RndTacToe.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RndTacToe.Server/RndTacToe.Server.csproj" -c Release -o /app/publish
RUN mkdir /app/publish/wwwroot
COPY --from=build-angular /angular-build/dist/web/* /app/publish/wwwroot/

FROM base as final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RndTacToe.Server.dll"]
