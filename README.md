![Main logo](blob/master/img/clipoon.png)
# Clipoon

> Proyecto de red social que relaciona gente del sector audiovisual entre sí, dando a conocer sus diversos trabajos y proyectos en los que se involucran y con posibilidad de participar en otros proyectos, conocer gente del sector, o buscar un determinado rol del sector mediante búsquedas personalizadas.

* Sistema de usuarios
* Interacción entre usuarios
* Utilización de base de datos no relacional con **Firestore**, de *Google*
* Sistema de proyectos: creación, participación, edición, privacidad...
* Perfiles de usuarios públicos
* ~~Chat entre usuarios~~

Desarrollado con **Node** y **Vue** y utilizando Firestore como base de datos.

## Imagenes
![Pagina principal](blob/master/img/clipoon3.png)
![Gestion de proyectos](blob/master/img/clipoon1.png)
![Visualización de proyectos](blob/master/img/clipoon2.png)
![Interacción entre usuarios](blob/master/img/clipoon4.png)

## Build Setup
firebaseConfig.js - A rellenar utilizando los datos de un proyecto de Firebase
```javascript
export default {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
}
```

``` bash
# Dependencias
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
