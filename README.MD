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

| Metodo | Endpoint                             | Descripcion                                                              |
| ------ | ------------------------------------ | ------------------------------------------------------------------------ |
| GET    | http://localhost:8080/api/products   | Solicitar todos los productos                                            |
| GET    | http://localhost:8080/api/products/1 | Solicitar producto por id                                                |
| POST   | http://localhost:8080/api/products   | Agregar un producto                                                      |
| PUT    | http://localhost:8080/api/products/1 | Se actualizaran las propiedades que se precisa del producto, segun el id |
| DEL    | http://localhost:8080/api/products/1 | Se eliminara el producto con el id indicado                              |

#### JSON

Para poder utilizar cada uno de los metodos es necesario que el producto tenga las siguentes propiedades

{
"title",
"description",
"price",
"thumbnails",
"category",
"code",
"stock"
}

#### Para el carrito

| Metodo | Endpoint                                      | Descripcion                                                          |
| ------ | --------------------------------------------- | -------------------------------------------------------------------- |
| GET    | http://localhost:8080/api/carts/172           | Solicitar el carrito segun su id espesifico                          |
| POST   | http://localhost:8080/api/carts               | Crea un carrito con su id especifico                                 |
| POST   | http://localhost:8080/api/carts/172/product/4 | Agrega un producto especifico con su id al carrito que tiene otro id |

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

| Metodo | Endpoint                                 | Descripcion                                            |
| ------ | ---------------------------------------- | ------------------------------------------------------ |
| GET    | http://localhost:8080/products           | Renderiza la vista de productos                        |
| GET    | http://localhost:8080/products/172371263 | Renderiza la vista del producto especificado con el id |
| GET    | http://localhost:8080/carts/123124       | Renderiza la vista del carrito segun el id             |


###Variables de entorno

PORT=8080

MONGODB_URI=mongodb+srv://artemeu1:fbvjSFu91cXHPgUC@coderback.0uqebpv.mongodb.net/?retryWrites=true&w=majority&appName=CoderBack
