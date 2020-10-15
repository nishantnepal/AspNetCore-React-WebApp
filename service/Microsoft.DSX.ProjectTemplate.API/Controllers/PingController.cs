using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Microsoft.DSX.ProjectTemplate.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PingController : ControllerBase
    {
        private IHttpClientFactory _clientFactory;
        private IConfiguration _configuration;

        public PingController(IHttpClientFactory clientFactory, IConfiguration configuration)
        {
            _clientFactory = clientFactory;
            _configuration = configuration;
        }
        public IActionResult Get()
        {
            return Ok();
        }

        [HttpGet]
        [Route("ready")]
        public IActionResult Ready()
        {
            return Ok();
        }

        [HttpGet]
        [Route("weather-from-external-service")]
        public async Task<IActionResult> GetWeatherFromAnotherService()
        {
            var url = _configuration["WeatherServiceBaseUrl"];
            var request = new HttpRequestMessage(HttpMethod.Get,
                $"{url}/weatherforecast");

            var client = _clientFactory.CreateClient();

            var response = await client.SendAsync(request);
            var responseString = "";

            if (response.IsSuccessStatusCode)
            {
                responseString = await response.Content.ReadAsStringAsync();

            }
            else
            {
                responseString = "Error";
            }
            return Ok(responseString);
        }

        [HttpGet]
        [Route("envvars")]
        public async Task<IActionResult> GetEnvironmentVariables()
        {
            var variables = new List<KeyValuePair<string, string>>();
            foreach (DictionaryEntry de in Environment.GetEnvironmentVariables())
            {
                variables.Add(new KeyValuePair<string, string>(de.Key.ToString(), de.Value.ToString()));
            }

            variables = variables.OrderBy(v => v.Key).ToList();
            return Ok(variables);
        }
    }
}
