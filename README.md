# Task Manager API

Task Manager API es una API RESTful diseñada para gestionar tareas. Esta API permite a los usuarios autenticarse mediante JWT y realizar operaciones CRUD en tareas como creación, actualización, eliminación y consulta. Además, la API está documentada con Swagger para una navegación y uso más sencillo.

---

## Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Características](#características)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Instalación](#instalación)
5. [Uso de la API](#uso-de-la-api)
6. [Estructura del Proyecto](#estructura-del-proyecto)
7. [Endpoints Documentados](#endpoints-documentados)
8. [Swagger UI](#swagger-ui)
9. [Autenticación](#autenticación)
10. [Contribuciones](#contribuciones)

---

## Descripción General

Esta API permite a los usuarios gestionar tareas con las siguientes características:

- Crear tareas con título obligatorio y descripción opcional.
- Actualizar tareas, incluyendo su estado (`completed` o `pending`).
- Eliminar tareas por su ID.
- Consultar todas las tareas o filtrarlas por estado.

---

## Características

- **CRUD Completo:** Crear, leer, actualizar y eliminar tareas.
- **Autenticación con JWT:** Solo los usuarios autenticados pueden interactuar con la API.
- **Filtros:** Consultar tareas completadas o pendientes mediante un parámetro.
- **Documentación con Swagger:** Acceso interactivo a la documentación de los endpoints.

---

## Tecnologías Utilizadas

- **Node.js**: Motor de ejecución para JavaScript.
- **Express.js**: Framework para construir APIs.
- **MongoDB**: Base de datos NoSQL.
- **Mongoose**: ODM para MongoDB.
- **JSON Web Tokens (JWT)**: Autenticación segura.
- **Swagger**: Documentación de API.

---

## Instalación

### Prerrequisitos

- Tener [Node.js](https://nodejs.org/) instalado (v14 o superior).
- Tener una base de datos MongoDB, como [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Pasos de Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/task-manager-api.git
   cd task-manager-api
