# Proyecto Final - CoderHouse - Backend

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

| Metodo | Endpoint                                        | Descripcion                                                          |
| ------ | ----------------------------------------------- | -------------------------------------------------------------------- |
| GET    | http://localhost:8080/api/carts/:id             | Solicitar el carrito segun su id espesifico                          |
| POST   | http://localhost:8080/api/carts                 | Crea un carrito con su id especifico                                 |
| POST   | http://localhost:8080/api/carts/:id/product/:id | Agrega un producto especifico con su id al carrito que tiene otro id |

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
