using Microsoft.EntityFrameworkCore;
using TodoApi;
using Microsoft.OpenApi.Models; // הוספת הפניה זו עבור Swagger


var builder = WebApplication.CreateBuilder(args);


//swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Configure the DbContext
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql("server=localhost;user=root;password=aA1795aA;database=ToDoDB", 
    Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.35-mysql")));

// הוסף את הגדרת CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin() // אפשר כל מקור
                   .AllowAnyMethod() // אפשר כל שיטה (GET, POST, PUT, DELETE)
                   .AllowAnyHeader(); // אפשר כל כותרת
        });
});

var app = builder.Build();

// השתמש במדיניות CORS
app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "ToDo API V1");
        c.RoutePrefix = string.Empty; // Set Swagger UI at the app's root
    });
}
// Route to get all tasks
app.MapGet("/items", async (ToDoDbContext db) =>
{
    return await db.Items.ToListAsync();
});

// Route to add a new task
app.MapPost("/items", async (Item item, ToDoDbContext db) =>
{
    db.Items.Add(item);
    await db.SaveChangesAsync();
    return Results.Created($"/items/{item.Id}", item);
});

// Route to update a task
app.MapPut("/items/{id}", async (int id, Item updatedItem, ToDoDbContext db) =>
{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();

    item.Name = updatedItem.Name;
    item.IsComplete = updatedItem.IsComplete;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

// Route to delete a task
app.MapDelete("/items/{id}", async (int id, ToDoDbContext db) =>
{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();

    db.Items.Remove(item);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapGet("/", () => "Welcome to the ToDo API!");
app.Run();
