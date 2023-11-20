# RepertorioMusica
Código del proyecto “Repertorio de Música” realizado con Angular, Typescript y NodeJS, el gestor de bases de datos utilizado fue MySQL. Para la Base de Datos se utilizaron vistas asi como procedimientos almacenados y funciones.

https://github.com/RaulGeronimo/RepertorioMusica/assets/94584093/46a4aebc-fce5-41f1-a24e-010d8968674b

Esta es una aplicación web básica para administrar grupos de música, asi como sus álbumes y sus canciones utilizando tecnologías como Angular, Node, TypeScript y MySQL. Es la segunda versión del proyecto 'Música Angular'.

### Tecnologias utilizadas: 
- Angular
- TypeScript
- NodeJS
- Base de Datos MySQL

![2023-06-12_13h17_21](https://github.com/RaulGeronimo/RepertorioMusica/assets/94584093/9304fb14-f530-4eae-aede-53e4a80b4b73)

### Instalación
```sh
git clone https://github.com/RaulGeronimo/RepertorioMusica.git
cd RepertorioMusica

cd Servidor # Modulos del Servidor
npm i

cd appMusica # Modulos de la aplicación
npm i
```

### Ejecución
```sh
cd Servidor # Ejecutar el Servidor
npm run start

cd appMusica # Ejecutar la aplicacion
ng serve --open
```

> Necesitas tener la base de datos en el gestor de bases de datos, asi como actualizar la conexion que se encuentra en el archivo `Servidor/data.ts`, la base de datos se encuentra dentro de la carpeta `BD`.

> Demo: https://repertorio-musica.web.app/
