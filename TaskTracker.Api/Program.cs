using System.Collections.Immutable;
using TaskTracker.Api.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>                         // Adds Cross-Origin Resource Sharing (CORS) services to the application, allowing it to handle requests from different origins. This is essential for enabling communication between the backend API and frontend applications hosted on different domains or ports.
{
    options.AddPolicy("AngularPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()                       // Allows any HTTP header in the request, which is necessary for handling various types of requests from the frontend.
            .AllowAnyMethod();                       // Allows any HTTP method (GET, POST, PUT, DELETE, etc.) in the request, which is necessary for handling different types of operations from the frontend.
    });
});


var app = builder.Build(); // builds the appplication and prepares it to handle incoming HTTP requests. It sets up the middleware pipeline and configures the endpoints defined in the application.//


List<TaskItem> tasks = new List<TaskItem>
{
    new TaskItem
    {
        Id = 1,
        Title = "Learn GET API",
        Summary = "Return task list from backend",
        DueDate = "2025-12-31",
        Completed = false
    }
};


if (app.Environment.IsDevelopment()) 
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AngularPolicy");

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/api/tasks", () =>    // Endpoint to get all tasks
{
    return tasks;   
})
.WithName("GetWeatherForecast");


app.MapGet("/api/tasks/{id}", (int id) =>    // Endpoint to get a task by ID
{   // Endpoint to get a task by ID

    var task = tasks.FirstOrDefault(t => t.Id == id);
    return task;
});

app.MapPost("/api/tasks", (TaskItem newtask) =>  // Endpoint to create a new task
{
    newtask.Id = tasks.Count + 1;
    tasks.Add(newtask);

    return Results.Created($"/api/tasks/{newtask.Id}", newtask); // Return 201 Created response with the location of the new task
});


app.MapPut("/api/tasks/{id}" , (int id , TaskItem updatedTask) =>  // Endpoint to update an existing task
{
    var existingTask = tasks.FirstOrDefault(t => t.Id == id);
    if (existingTask is null)
    {
        return Results.NotFound(); // Return 404 Not Found if the task doesn't exist
    }
    existingTask.Title = updatedTask.Title;
    existingTask.Summary = updatedTask.Summary;
    existingTask.DueDate = updatedTask.DueDate;
    existingTask.Completed = updatedTask.Completed;
    return Results.Created($"/api/tasks/{existingTask.Id}", existingTask); // Return 201 Created response with the location of the updated task
});

app.MapDelete("/api/tasks/{id}", (int id) =>  // Endpoint to delete a task by ID
{
    var task = tasks.FirstOrDefault(t => t.Id == id);
    if (task is null)
    {
        return Results.NotFound(); // Return 404 Not Found if the task doesn't exist
    }
    tasks.Remove(task);
    return Results.NoContent(); // Return 204 No Content to indicate successful deletion
});


app.Run();                              //application entry point, starts the web server and listens for incoming HTTP requests

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
