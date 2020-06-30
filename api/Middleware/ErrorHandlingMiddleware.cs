using System;
using System.Net;
using System.Threading.Tasks;
using BusinessObjects.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace api.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;
        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _logger = logger;
            _next = next;
        }

        public async Task Invoke(HttpContext context){
            try{
                await _next(context);
            }catch(Exception ex){
                await HandleExceptionAsync (context,ex, _logger);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex, ILogger<ErrorHandlingMiddleware> logger)
        {
            object errors = null;

            switch(ex){

                case RestException re:
                    logger.LogDebug(ex, "REST EXCEPTION");
                    errors = re.Errors;
                    context.Response.StatusCode = (int)re.Code;
                break;
                case Exception e:
                    logger.LogDebug(ex, "SERVER EXCEPTION");
                    errors = string.IsNullOrWhiteSpace(e.Message) ? "ERROR" : e.Message; 
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                break;
            }

            context.Response.ContentType = "application/json";
            if(errors != null){
                var result = JsonConvert.SerializeObject(new { 
                    errors
                });

                await context.Response.WriteAsync(result);
            }

        }
    }
}