FROM mcr.microsoft.com/dotnet/aspnet:6.0-bullseye-slim-amd64 as base

WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM node:16-alpine as build-angular

RUN mkdir /angular-build
WORKDIR /angular-build
COPY ./web .
RUN npm i
RUN npm i -g @angular/cli@13
RUN ng build --prod

FROM mcr.microsoft.com/dotnet/sdk:6.0-bullseye-slim-amd64 AS build

WORKDIR /src
COPY ["RndTacToe/RndTacToe.Server/RndTacToe.Server.csproj", "server/RndTacToe.Server/"]
COPY ["RndTacToe/RndTacToe.ConnectionManager/RndTacToe.ConnectionManager.csproj", "server/RndTacToe.ConnectionManager/"]
# RUN dotnet restore "RndTacToe.ConnectionManager/RndTacToe.ConnectionManager.csproj"
# RUN dotnet restore "RndTacToe.Server/RndTacToe.Server.csproj"
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
