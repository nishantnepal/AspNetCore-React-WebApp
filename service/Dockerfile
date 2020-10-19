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
#RUN dotnet restore "Microsoft.DSX.ProjectTemplate.API/Microsoft.DSX.ProjectTemplate.API.csproj"

COPY ["Microsoft.DSX.ProjectTemplate.Test/Microsoft.DSX.ProjectTemplate.Test.csproj", "Microsoft.DSX.ProjectTemplate.Test/"]
COPY Microsoft.DSX.ProjectTemplate.sln ./
RUN dotnet restore "Microsoft.DSX.ProjectTemplate.sln"

COPY . .

# test
# use the label to identity this layer later
LABEL test=true
# install the report generator tool
RUN dotnet tool install dotnet-reportgenerator-globaltool --tool-path /tools
# run the test and collect code coverage (requires coverlet.msbuild to be added to test project)
# for exclude, use %2c for ,
RUN dotnet test --results-directory /testresults --logger "trx;LogFileName=test_results.xml" /p:CollectCoverage=true /p:CoverletOutputFormat=opencover /p:CoverletOutput=/testresults/coverage/  ./Microsoft.DSX.ProjectTemplate.sln
# generate html reports using report generator tool
RUN /tools/reportgenerator "-reports:/testresults/coverage/coverage.opencover.xml" "-targetdir:/testresults/coverage/reports" "-reporttypes:HTMLInline;HTMLChart"
RUN ls -la /testresults/coverage/reports


WORKDIR "/src/Microsoft.DSX.ProjectTemplate.API"
#RUN dotnet build "Microsoft.DSX.ProjectTemplate.API.csproj" -c Release -o /app/build


FROM build AS publish
RUN dotnet publish "Microsoft.DSX.ProjectTemplate.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Microsoft.DSX.ProjectTemplate.API.dll"]