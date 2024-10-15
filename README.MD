# Proyecto Final - CoderHouse - Backend

## Descripción del Proyecto

Este proyecto es un sistema de gestión de productos y usuarios, y carritos de compras, desarrollado como parte del curso final de Backend en CoderHouse. Permite a los usuarios crear carritos, agregar productos, realizar compras, gestionar tickets y usuarios, entre otras cosas. Está diseñado con un enfoque en la RESTful API y utiliza MongoDB como base de datos.

## Requisitos Previos

- Node.js (versión mínima recomendada)
- MongoDB (instalado y en funcionamiento)
- npm (instalado)

## Instalacion

1. Clona este repositorio en tu máquina local:

```sh
git clone https://github.com/artemeu/ProyectoFinal-CoderHouse-BackEnd.git
```

2. Instala las dependencias necesarias utilizando npm

```sh
npm install
```

## Ejecución

Se ejecutar el servidor con el siguiente comando:

```sh
npm run start:dev
```

## Utilizacion de los endpoints

Se ingresera al Insomnia y se ejecutara los siguentes metodos para cada seccion:

#### Para los productos

| Metodo | Endpoint                               | Descripcion                                                              |
| ------ | -------------------------------------- | ------------------------------------------------------------------------ |
| GET    | http://localhost:8080/api/products     | Solicitar todos los productos                                            |
| GET    | http://localhost:8080/api/products/:id | Solicitar producto por id                                                |
| POST   | http://localhost:8080/api/products     | Agregar un producto                                                      |
| PUT    | http://localhost:8080/api/products/:id | Se actualizaran las propiedades que se precisa del producto, segun el id |
| DEL    | http://localhost:8080/api/products/:id | Se eliminara el producto con el id indicado                              |

#### JSON

Para poder utilizar cada uno de los metodos es necesario que el producto tenga las siguentes propiedades

{
"title"
"description"
"price"
"thumbnails"
"category"
"code"
"stock"
}

#### Para el carrito

| Método | Endpoint                                         | Descripción                                                 |
| ------ | ------------------------------------------------ | ----------------------------------------------------------- |
| GET    | http://localhost:8080/api/carts                  | Solicitar todos los carritos                                |
| GET    | http://localhost:8080/api/carts/:id              | Solicitar el carrito según su ID específico                 |
| POST   | http://localhost:8080/api/carts                  | Crear un carrito nuevo                                      |
| POST   | http://localhost:8080/api/carts/:id/products/:id | Agregar un producto específico al carrito que tiene otro ID |
| POST   | http://localhost:8080/api/carts/:id/purchase     | Finalizar la compra del carrito                             |
| PUT    | http://localhost:8080/api/carts/:id              | Actualizar el carrito con un array de productos             |
| PUT    | http://localhost:8080/api/carts/:id/products/:id | Actualizar la cantidad del producto en el carrito           |
| DELETE | http://localhost:8080/api/carts/:id              | Eliminar todos los productos del carrito                    |
| DELETE | http://localhost:8080/api/carts/:id/products/:id | Eliminar un producto específico del carrito                 |
| DELETE | http://localhost:8080/api/carts/:id/empty        | Vaciar el carrito especifico                                |

#### Para los usuarios

| Metodo | Endpoint                             | Descripcion                                   |
| ------ | ------------------------------------ | --------------------------------------------- |
| GET    | http://localhost:8080/api/users      | Solicitar todos los usuarios                  |
| GET    | http://localhost:8080/api/users/:id  | Solicitar usuario por ID                      |
| GET    | http://localhost:8080/current        | Muestra los detalles del usuario autenticado  |
| POST   | http://localhost:8080/api/register   | Registrar un nuevo usuario                    |
| POST   | http://localhost:8080/api/login      | Iniciar sesión                                |
| POST   | http://localhost:8080/api/forgotpass | Actualizar la contraseña                      |
| PUT    | http://localhost:8080/api/users/:id  | Actualizar las propiedades del usuario por ID |
| DELETE | http://localhost:8080/api/users/:id  | Eliminar usuario por ID                       |

#### JSON

Para registrar un nuevo usuario, el JSON debe incluir
{
"first_name"
"last_name"
"email"
"age":
"rol":
"password":
}

#### Para los Tickets

| Método | Endpoint                              | Descripción                 |
| ------ | ------------------------------------- | --------------------------- |
| GET    | http://localhost:8080/api/tickets     | Solicitar todos los tickets |
| GET    | http://localhost:8080/api/tickets/:id | Solicitar ticket por ID     |
| POST   | http://localhost:8080/api/tickets     | Crear un nuevo ticket       |
| PUT    | http://localhost:8080/api/tickets/:id | Actualizar un ticket por ID |
| DELETE | http://localhost:8080/api/tickets/:id | Eliminar un ticket por ID   |

### Visualización de Productos

Para ver la lista de productos, accede a:

| Metodo | Endpoint               | Descripcion                                       |
| ------ | ---------------------- | ------------------------------------------------- |
| GET    | http://localhost:8080/ | Renderiza la vista home con la lista de productos |

Para ver la lista de productos en tiempo real y agregar o eliminar productos, accede a:

| Metodo | Endpoint                               | Descripcion                                                                  |
| ------ | -------------------------------------- | ---------------------------------------------------------------------------- |
| GET    | http://localhost:8080/realtimeproducts | Renderiza la vista realTimeProducts con la lista de productos en tiempo real |

### Visualización de Productos en MongoDB

Para vizualizar los productos que se encuentran en la base de datos:

| Metodo | Endpoint                            | Descripcion                                            |
| ------ | ----------------------------------- | ------------------------------------------------------ |
| GET    | http://localhost:8080/products      | Renderiza la vista de productos                        |
| GET    | http://localhost:8080/products/:pid | Renderiza la vista del producto especificado con el ID |
| GET    | http://localhost:8080/carts/:cid    | Renderiza la vista del carrito según el ID             |

### Vista de Login y Registro

| Metodo | Endpoint                         | Descripcion                                      |
| ------ | -------------------------------- | ------------------------------------------------ |
| GET    | http://localhost:8080/login      | Renderiza la vista de inicio de sesión           |
| GET    | http://localhost:8080/register   | Renderiza la vista de registro                   |
| GET    | http://localhost:8080/forgotpass | Renderiza la vista de recuperación de contraseña |
