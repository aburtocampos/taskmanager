const request = require("supertest");
const app = require("../app");
const connectDB = require("../config/db");
const mongoose = require("mongoose");
const Task = require("../models/Task");

let token;

beforeAll(async () => {
    await connectDB();

    try {
        await request(app)
            .post("/api/auth/register")
            .send({
                username: "testuser",
                password: "1234",
            });
    } catch (err) {
        if (err.response?.status !== 409) throw err;
    }

    const loginRes = await request(app)
        .post("/api/auth/login")
        .send({
            username: "testuser",
            password: "1234",
        });

    token = loginRes.body.token;
}, 20000);

afterAll(async () => {
    await mongoose.connection.close();
});

afterEach(async () => {
    await Task.deleteMany({}); // Limpia las tareas después de cada prueba para evitar errores
});

describe("POST /api/tasks", () => {
    it("should create a new task", async () => {
        const newTask = {
            title: "Unique Task for Creation",
            description: "This is a test task",
        };

        const res = await request(app)
            .post("/api/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send(newTask);

        console.log("Respuesta del POST /api/tasks (creación):", res.body); 
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject({
            title: newTask.title,
            description: newTask.description,
            completed: false, 
        });
    });

    it("should not allow duplicate tasks with the same title", async () => {
        const duplicateTask = {
            title: "Unique Task for Creation",
            description: "This is a duplicate test task",
        };

        await request(app)
            .post("/api/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send(duplicateTask);

        const res = await request(app)
            .post("/api/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send(duplicateTask);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error", "The Title already exist");
    });

    it("should return an error if title is missing", async () => {
        const res = await request(app)
            .post("/api/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send({
                description: "Missing title",
            });
    
        expect(res.statusCode).toBe(400); 
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors[0]).toMatchObject({
            msg: "Title is required",
            location: "body",
        });
    });

});


describe("DELETE /api/tasks/:id", () => {
    it("should delete a task using taskId", async () => {
        // Primero, crear una tarea
        const newTask = await Task.create({
            title: "Task to Delete",
            description: "This task will be deleted",
        });

        // Intentar eliminarla usando taskId
        const res = await request(app)
            .delete(`/api/tasks/${newTask.taskId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200); // Código de éxito
        expect(res.body).toMatchObject({
            message: "Task deleted successfully",
        });

        // Verificar que la tarea ya no existe
        const taskInDB = await Task.findOne({ taskId: newTask.taskId });
        expect(taskInDB).toBeNull();
    });

    it("should return an error if the task does not exist", async () => {
        const fakeTaskId = 999999; // Crear un taskId falso

        const res = await request(app)
            .delete(`/api/tasks/${fakeTaskId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(404); // Código para "No encontrado"
        expect(res.body).toMatchObject({
            error: "Task not found",
        });
    });

});

describe("GET /api/tasks/:id", () => {
    it("should return a specific task", async () => {
        // Crear una tarea para la prueba
        const task = await Task.create({
            title: "Specific Task",
            description: "This is a specific task",
        });

        const res = await request(app)
        .get(`/api/tasks/${task.taskId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("title", "Specific Task");
        expect(res.body).toHaveProperty("description", "This is a specific task");

        console.log("Respuesta de GET /api/tasks/:id:", res.body);
    });

    it("should return an error if the task does not exist", async () => {
        const fakeTaskId = 999999; // Usar un taskId inexistente
    
        const res = await request(app)
            .get(`/api/tasks/${fakeTaskId}`)
            .set("Authorization", `Bearer ${token}`);
    
        expect(res.statusCode).toBe(404); // Código para "No encontrado"
        expect(res.body).toMatchObject({
            error: "Task not found",
        });
    });
    

    it("should return an error if the ID is invalid", async () => {
        const invalidId = "12345r6"; // ID no válido

        const res = await request(app)
            .get(`/api/tasks/${invalidId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(400); // Código para "ID inválido"
        expect(res.body).toMatchObject({
            error: "Invalid task ID",
        });
    });

});

describe("PUT /api/tasks/:id", () => {
    it("should update an existing task", async () => {
        // Crear una tarea para la prueba
        const task = await Task.create({
            title: "Task to Update",
            description: "This is the original description",
        });

        // Datos para la actualización
        const updatedData = {
            title: "Updated Task",
            description: "This is the updated description",
        };

        // Enviar la solicitud PUT
        const res = await request(app)
            .put(`/api/tasks/${task.taskId}`) // Usar taskId
            .set("Authorization", `Bearer ${token}`)
            .send(updatedData);

        // Validar la respuesta
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("title", "Updated Task");
        expect(res.body).toHaveProperty("description", "This is the updated description");

        // Verificar que la tarea fue actualizada en la base de datos
        const updatedTask = await Task.findOne({ taskId: task.taskId });
        expect(updatedTask).toMatchObject(updatedData);
    });

    it("should return an error if the task does not exist", async () => {
        const fakeTaskId = 999999; // Usar un taskId inexistente

        const updatedData = {
            title: "Non-existent Task",
            description: "This task does not exist",
        };

        const res = await request(app)
            .put(`/api/tasks/${fakeTaskId}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updatedData);

        expect(res.statusCode).toBe(404);
        expect(res.body).toMatchObject({
            error: "Task not found",
        });
    });

    it("should return an error if title is missing", async () => {
        // Crear una tarea para la prueba
        const task = await Task.create({
            title: "Task to Update",
            description: "This is the original description",
        });

        const invalidData = {
            description: "This is an updated description without a title",
        };

        const res = await request(app)
            .put(`/api/tasks/${task.taskId}`)
            .set("Authorization", `Bearer ${token}`)
            .send(invalidData);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors[0]).toMatchObject({
            msg: "Title is required", // Ajustar según el mensaje de error en tu backend
        });
    });
});

