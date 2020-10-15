cd C:\Projects\githubRepos\AspNetCore-React-WebApp\client
docker build -t nishantnepal/reactapp-fe .
docker push nishantnepal/reactapp-fe

cd C:\Projects\githubRepos\AspNetCore-React-WebApp\service
docker build -t nishantnepal/reactapp-be .
docker push nishantnepal/reactapp-be

cd C:\Projects\githubRepos\AspNetCore-React-WebApp\serviceV2
docker build -t nishantnepal/reactapp-be2 .
docker push nishantnepal/reactapp-be2