using api.Middleware;
using BusinessObjects.Properties;
using DatabaseObjects;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(opt =>{

                //opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
                opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));

            });
            //services.AddControllers();
            services.AddCors(opt =>{
                opt.AddPolicy("CorsPolicy",policy =>{
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });
            //This is defined just for one. The rest will work 
            //because they will be using the same Library
            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddMvc(option => option.EnableEndpointRouting = false)
                .AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssemblyContaining<Create>());
                //.SetCompatibilityVersion(CompatibilityVersion.Version_3_0);  
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();

            if (env.IsDevelopment())
            { 
                //app.UseDeveloperExceptionPage();
            }else
            {
                app.UseHsts();
            }
            app.UseMvc();
            //app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseCors("CorsPolicy");
            app.UseRouting();
            //app.UseMvc(routes =>
            //{
              // routes.MapSpaFallbackRoute(
              //     name:"spa-fallback",
               //    defaults: new {
               //         controller="Fallback", Action="index"
               //    }
               // );
            //});
           //app.UseAuthorization();

           app.UseEndpoints(endpoints =>
           {
              //endpoints.MapControllers();
              endpoints.MapFallbackToController("index","Fallback");
            });
        }
    }
}
