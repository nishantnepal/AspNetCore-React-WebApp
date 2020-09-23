#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Microsoft.DSX.ProjectTemplate.API/Microsoft.DSX.ProjectTemplate.API.csproj", "Microsoft.DSX.ProjectTemplate.API/"]
COPY ["Microsoft.DSX.ProjectTemplate.Command/Microsoft.DSX.ProjectTemplate.Command.csproj", "Microsoft.DSX.ProjectTemplate.Command/"]
COPY ["Microsoft.DSX.ProjectTemplate.Data/Microsoft.DSX.ProjectTemplate.Data.csproj", "Microsoft.DSX.ProjectTemplate.Data/"]
RUN dotnet restore "Microsoft.DSX.ProjectTemplate.API/Microsoft.DSX.ProjectTemplate.API.csproj"
COPY . .
WORKDIR "/src/Microsoft.DSX.ProjectTemplate.API"
RUN dotnet build "Microsoft.DSX.ProjectTemplate.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Microsoft.DSX.ProjectTemplate.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Microsoft.DSX.ProjectTemplate.API.dll"]