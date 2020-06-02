using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Properties;
using DatabaseObjects;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

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
            services.AddMvc();//.SetCompatibilityVersion(CompatibilityVersion.Version_3_0);  
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //app.UseMvc();
            //app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");
            app.UseRouting();

           //app.UseAuthorization();

           app.UseEndpoints(endpoints =>
           {
              endpoints.MapControllers();
            });
        }
    }
}
