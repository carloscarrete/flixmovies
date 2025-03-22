
# FlixMovies

**FlixMovies** es una aplicación móvil desarrollada con **React Native** que permite a los usuarios explorar películas populares, buscar películas por título, ver detalles de películas, actores y guardar películas favoritas. La aplicación consume la API de **The Movie Database (TMDb)** para obtener información sobre películas y actores.
## Características

- **Explorar películas**: Ver películas populares, próximas estrenos y las mejor valoradas.
- **Búsqueda de películas**: Buscar películas por título.
- **Detalles de películas**: Ver detalles completos de una película, incluyendo sinopsis, reparto, género y duración.
- **Detalles de actores**: Ver información detallada de los actores, incluyendo su biografía y películas en las que han participado.
- **Favoritos**: Guardar películas favoritas para verlas más tarde.
- **Diseño responsive**: Interfaz optimizada para dispositivos móviles.
- **Integración con TMDb**: Uso de la API de TMDb para obtener datos actualizados de películas y actores.

## Tecnologías utilizadas

- **React Native**: Framework para construir aplicaciones móviles multiplataforma.
- **Expo**: Herramienta para desarrollar y desplegar aplicaciones React Native.
- **React Navigation**: Para la navegación entre pantallas.
- **React Query**: Para la gestión de solicitudes y caché de datos.
- **Tailwind CSS**: Para estilos rápidos y consistentes.
- **Axios**: Para realizar solicitudes HTTP a la API de TMDb.
- **AsyncStorage**: Para almacenar películas favoritas localmente.

## Estructura del proyecto

	carloscarrete-flixmovies/
	├── App.tsx
	├── app.json
	├── babel.config.js
	├── eas.json
	├── nativewind-env.d.ts
	├── package.json
	├── tailwind.config.js
	├── tsconfig.json
	├── assets/
	│   └── images/
	├── components/
	│   ├── Cast.tsx
	│   ├── LoadingC.tsx
	│   ├── ModalCheckVersion.tsx
	│   ├── MovieCard.tsx
	│   ├── MovieList.tsx
	│   └── TrendingMovies.tsx
	├── constants/
	│   ├── github.ts
	│   └── movies.ts
	├── hooks/
	│   ├── useCasting.tsx
	│   ├── useInfiniteMovies.tsx
	│   ├── useMovieDetails.tsx
	│   ├── useMovies.tsx
	│   ├── usePeopleCredits.tsx
	│   └── usePerson.tsx
	├── interfaces/
	│   ├── Cast.ts
	│   ├── GitHubVersion.ts
	│   ├── Movies.ts
	│   └── People.ts
	├── navigation/
	│   └── AppNavigation.tsx
	├── screens/
	│   ├── FavoritesScreen.tsx
	│   ├── FilterMoviesScreen.tsx
	│   ├── HomeScreen.tsx
	│   ├── MovieScreen.tsx
	│   ├── PersonScreen.tsx
	│   └── SearchScreen.tsx
	├── services/
	│   ├── actions.ts
	│   └── api/
	│       └── movies.ts
	├── theme/
	│   └── index.js
	├── types/
	│   └── types.ts
	└── utils/
	    └── truncateText.ts

## Instalación
1.  Clona el repositorio:

	    git clone https://github.com/tuusuario/carloscarrete-flixmovies.git
    
2.  Navega al directorio del proyecto:

	    cd flixmovies
    
3.  Instala las dependencias:

	    npm install
    
4.  Crea un archivo  `.env`  en la raíz del proyecto y añade tu clave de API de TMDb:

	    EXPO_PUBLIC_API_MOVIE_TOKEN=tu_clave_de_api_tmdb
    
5.  Inicia el servidor de desarrollo:

	    npm start
    
6.  Escanea el código QR con la aplicación  **Expo Go**  en tu dispositivo móvil o ejecuta la aplicación en un emulador.
    

## Pantallas
### HomeScreen
Muestra las películas populares, próximas estrenos y las mejor valoradas.
![HomeScreen](https://github.com/carloscarrete/flixmovies/blob/main/captures/homescreen.jpg?raw=true)
### SearchScreen
Permite buscar películas por título.
![SearchScreen](https://github.com/carloscarrete/flixmovies/blob/main/captures/searchscreen.jpg?raw=true)

### MovieScreen
Muestra detalles completos de una película, incluyendo sinopsis, reparto, género y duración.
![MovieScreen](https://github.com/carloscarrete/flixmovies/blob/main/captures/screenmovie1.jpg?raw=true)

![MovieScreen2](https://github.com/carloscarrete/flixmovies/blob/main/captures/screenmovie2.jpg?raw=true)

### PersonScreen
Muestra detalles de un actor, incluyendo su biografía y películas en las que ha participado.
![PersonScreen](https://github.com/carloscarrete/flixmovies/blob/main/captures/castscreen.jpg?raw=true)

### FavoritesScreen
Muestra las películas guardadas como favoritas.
![FavoriteScreen](https://github.com/carloscarrete/flixmovies/blob/main/captures/favoritesscreen.jpg?raw=true)

## Contribución
Si deseas contribuir a este proyecto, sigue estos pasos:
1.  Haz un fork del repositorio.    
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).  
3.  Realiza tus cambios y haz commit (`git commit -am 'Añade nueva funcionalidad'`).    
4.  Haz push a la rama (`git push origin feature/nueva-funcionalidad`). 
5.  Abre un Pull Request.
## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo  [LICENSE](https://license/)  para más detalles.