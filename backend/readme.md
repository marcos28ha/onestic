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