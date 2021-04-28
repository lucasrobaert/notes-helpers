---
title: Anotações importantes sobre mongo
---

### Criar container mongo no docker com parametros de usuario e senha

```sh
docker run -d -p 27017:27017 --name admin -e MONGO_INITDB_ROOT_USERNAME={usuario} -e MONGO_INITDB_ROOT_PASSWORD={senha} mongo
```

### Querys de exemplo

```
  query.collection()
```
