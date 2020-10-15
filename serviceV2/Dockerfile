#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Microsoft.DSX.ProjectTemplate.API.V2/Microsoft.DSX.ProjectTemplate.API.V2.csproj", "Microsoft.DSX.ProjectTemplate.API.V2/"]
RUN dotnet restore "Microsoft.DSX.ProjectTemplate.API.V2/Microsoft.DSX.ProjectTemplate.API.V2.csproj"
COPY . .
WORKDIR "/src/Microsoft.DSX.ProjectTemplate.API.V2"
RUN dotnet build "Microsoft.DSX.ProjectTemplate.API.V2.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Microsoft.DSX.ProjectTemplate.API.V2.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Microsoft.DSX.ProjectTemplate.API.V2.dll"]