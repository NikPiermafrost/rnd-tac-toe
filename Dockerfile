FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine as base

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

FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build

WORKDIR /src
COPY ["RndTacToe/RndTacToe.Server/RndTacToe.Server.csproj", "server/"]
RUN dotnet restore "./server/RndTacToe.Server.csproj"
COPY ./RndTacToe/RndTacToe.Server/* ./server/
WORKDIR "/src/server"
RUN dotnet build "RndTacToe.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RndTacToe.Server.csproj" -c Release -o /app/publish
RUN mkdir /app/publish/wwwroot
COPY --from=build-angular /angular-build/dist/web/* /app/publish/wwwroot/

FROM base as final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RndTacToe.Server.dll"]
