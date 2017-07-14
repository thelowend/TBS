# MongoDB (Instrucciones para Windows)
-------

- Bajar MongoDB Community Edition e instalarlo.
- Agregar a las variables de entorno PATH del sistema, la carpeta \bin\ de donde se instaló el programa de MongoDB (En mi caso fue agregar al PATH: "C:\Program Files\MongoDB\Server\3.4\bin").

- Crear una carpeta para almacenar la base de datos en sí. En mi caso creé la siguiente carpeta: "D:\Documents\Proyectos\Seminario1\DB\".
- Dentro de la misma, crear un archivo mongod.conf con el siguiente contenido, modificando las rutas en caso de que sea necesario:

```yaml
storage:
  dbPath: D:\Documents\Proyectos\Seminario1\DB\data\
systemLog:
  destination: file
  path: D:\Documents\Proyectos\Seminario1\DB\log\mongod.log
  logAppend: true
```

- Luego, todavía parados en la raíz \DB\, crear otras dos carpetas, "data" y "log". En la primera se almacenarán los datos de la base y en la segunda un archivo de logs.


## Corriendo la base de datos

- En PowerShell con admin, para correr el servicio, estando aún parado en la carpeta /DB/ que creamos, ejecutar:  
```
mongod -f mongod.conf
```

- Si en lugar de tener la base corriendo en una ventana de powershell, queremos instalar el servicio en background, podemos realizar los siguientes pasos:
- Ejecutamos el comando mongod pero le agregamos --install, y pasamos el path absoluto del archivo de configuración:  
```
mongod -f D:\Documents\Proyectos\Seminario1\DB\mongod.conf --install
```

- El paso anterior tiene que haber registrado un servicio en Windows de nombre por defecto "MongoDB". Si al paso anterior le agrego '--serviceName NombreX' se llamará NombreX.  
```
net start MongoDB
```

- Con el paso anterior quedará corriendo en el background. Para detenerlo:  
```
net stop MongoDB
```

- Para eliminar el servicio (Agregar '--serviceName NombreX' en caso de que se haya utilizado):  
```
mongod --remove
```

## Accediendo a la base de datos

- Una vez que el servicio está corriendo, podemos entrar desde la consola de mongo ejecutando simplemente el comando "mongo":  
```
mongo
```

- Dentro del cliente de Mongo que se ejecutó, selecciono/creo la base de datos con el comando `use <nombre_de_base>`:  
```
> use tbs
> db.createCollection("User");
> db.createCollection("Roles");
> db.createCollection("Tasks");
> db.createCollection("Projects");
> db.createCollection("Clients");
> db.createCollection("Skills");
```

- Con eso quedaría creada la base de datos de nombre "tbs" con las collections User, Roles, Tasks, Projects, Clients y Skills.
