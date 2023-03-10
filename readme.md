# ONESTIC BACKEND

## PARTE OBLIGATORIA
El primer reto que encuentré leyendo el enunciado es trabajar con archivos csv, cuyo formato era nuevo para mi. Para familiarizarme con ellos, busqué información en sitios como https://www.howtogeek.com/348960/what-is-a-csv-file-and-how-do-i-open-it/.
El siguiente paso fue encontrar una libreria que me permitiera trabajar con este tipo de archivos. Opté por usar csv-parse, ya que permitia de forma sencilla y con pocas lineas obtener un array con los objetos de los archivos. Tuve que hacer una pequeña adaptación en las importaciones para usar la variante sincrona de esta libreria.

Después, me puse manos a la obra con los algoritmos que calcularan los datos requeridos.
Para el primer archivo tenía que calcular el total de cada pedido. Esto lo conseguí iterando a través de cada pedido y sustituyendo con la función "map" el id por el precio. Luego tan solo había que usar la función "reduce" para obtener la suma total. No encontré mayor problema en este ejercicio.

En el segundo algoritmo tuve dudas sobre que tabla iterar primero, si productos o pedidos. Para verlo con más claridad hice un pequeño boceto de los dos algoritmos en papel y ví claro que era mucho más sencillo iterar sobre los productos primero y luego añadir los clientes que los han comprado.

Por último, para el tercer algoritmo mi idea era usar los datos obtenidos en el primero para sumar el coste de todos los pedidos de cada cliente. Encontré el problema de que además necesitaba usar la tabla "orders" para obtener la id del cliente del pedido. Esto supondría aumentar la complejidad ya que después obtener el pedido tendría que buscar su id en la tabla de pedidos. Se me ocurrió que sería más rápido añadir la columna de clientes en el primer algoritmo de forma que no tuviera que recurrir a otra tabla. Con está información, ya solo tenía que iterar las dos tablas e ir sumando los valores, y finalmente ordenar los clientes con un "sort".

Tan solo quedaba generar los archivos con los resultados. Al igual que al principio busqué una librería que me permitiera convertir un JSON a csv. Encontré la libreria json2csv la cual permitia también formatear fácilmente el string, así que aproveché para configurarla de forma que no se imprimiera el campo "customer" del primer ejercicio el cuál había añadido en el ejercicio anterior. Tuve un pequeño problema dado que por defecto los campos se imprimian con los caracteres "". Buscando en la documentación de la librería encontré que usando el parametro quote en la configuración se podían eliminar. Tan solo quedaba generar los archivos usando "fs".

## EXTRAS

### TESTING
En la fase del testing el objetivo era encontrar algún fallo, primero en los algoritmos a nivel unitario, y después el funcionamiento de la API.
Usé la librería "Jest" para hacer las validaciones.

En los tests del primer algoritmo comprobé que no faltara ningun dato y que la suma del precio de los productos fuese la correcta. Una vez finalizados no encontré ningún fallo.
En el segundo algoritmo quise comprobar primero que si un producto no había sido comprado se devolviese una respuesta adecuada, y después que la lista de clientes por cada producto fuese la correcta.
Para el último testee que si un cliente no tenía ningún pedido su total fuera 0, después que la suma fuera la correcta, y por último que el orden de los clientes fuera el apropiado.

Para testear la API decidí usar la librería "supertest". Primero hice algún test basico como que la respuesta fuera en JSON, o que los tres campos que luego se convertirán a CSV están presentes.
Luego, probé como reacciona el servidor a inputs inesperados. Aquí descubrí que ante una llamada con cuerpo vacio, el servidor devolvía un error interno. Esto lo arreglé añadiendo un middleware que comprobaba el formato del input y devolvia una respuesta con el código 400 y un mensaje informando del error. A su vez, también se proporciona un mensaje de error si se utiliza un método diferente a POST, o si surge un error porque los archivos contienen un formato defectuoso. Finalmente, me di cuenta de que algunos errores en el formato no lanzaban excepción pero generaban ficheros corruptos, por lo que añadí algunas comprobaciones que lanzaran errores.
Los tests pueden ser ejecutados con npm run test.

### FRONTEND & API

Para convertir la aplicación por comandos en una API usé el framework Express. Esto fue sencillo ya que solo tuve que crear un endpoint para la ruta '/' con el método POST. A partir de ahí, se extraía y procesaba la información igual que antes. 
En cuanto al frontend, vi que había dos opciones: subir los archivos de forma múltiple o creando un selector para cada archivo. Aun que la opción de archivos múltiples es más rápida, depende del nombre del archivo para identificar a cada uno, pudiendo llevar a errores. Por ello, decidí que usar un selector para cada uno haría que no dependiese de que el nombre del archivo estuviese escrito de forma correcta, o de comprobar los valores internos del archivo. También decidí hacer un pequeño refactor y mover la parte que convertía el CSV a JSON al principio al frontend, ya que la comunicación era mucho más sencilla. De esta forma, la petición solo tendría un JSON, al igual que la respuesta. Luego, la información de este JSON sería transformada de nuevo en archivos CSV y devueltos al usuario.

### DOCKER

Para hacer el despliegue, primero creé una versión de producción haciendo un build de la aplicación frontend, y luego haciendo que el backend la proporcionara cuando se reciviera una petición GET. De esta forma no es necesario crear dos servicios con Docker. Después, solo tuve que crear el Dockerfile que sirviera para crear la imagen y luego un docker-compose.yaml que creara los contenedores usando el comando 'docker-compose up', con el cual se puede ejecutar la aplicación en local.