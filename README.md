# Prueba Toolbox - React Native

Aplicación React Native que consume el API de Toolbox y muestra carruseles (thumb y poster). Desarrollada con **Clean Architecture**, **Redux** para el estado global de autenticación.

## Requisitos

- Node >= 22.11.0
- Yarn 3.x
- Xcode (iOS) / Android Studio (Android)
- CocoaPods (iOS)

## Cómo ejecutar

### Instalar dependencias

```bash
yarn install
```

### iOS (incluye soporte de video)

```bash
cd ios && pod install && cd ..
yarn ios
```

### Android

```bash
yarn android
```

### Metro (en otra terminal)

```bash
yarn start
```

## Tests

```bash
yarn test
```

## Estructura del proyecto (Clean Architecture)

```
src/
├── domain/           # Capa de dominio
│   ├── entities/     # AuthToken, Carousel, CarouselItem
│   ├── repositories/ # Contratos (AuthRepository, CarouselRepository)
│   └── useCases/     # LoginUseCase, GetCarouselsUseCase
├── data/             # Capa de datos
│   ├── dataSources/  # API remoto, almacenamiento token
│   ├── mappers/      # API → dominio
│   ├── repositories/ # Implementación de repositorios
│   └── utils/        # JWT (expiración)
├── di/               # Inyección de dependencias (container.js)
├── store/            # Redux: store y slices (auth)
└── presentation/    # Capa de presentación
    ├── components/  # CarouselThumb, CarouselPoster, VideoModal
    ├── screens/     # LoginScreen, CarouselsScreen
    └── styles/      # Estilos en archivos .styles.js separados
```

## Funcionalidades

- **Login**: POST a `/v1/mobile/auth` con `{ "sub": "ToolboxMobileTest" }`. Se guarda token y tipo.
- **Token expirado**: Se comprueba `expireDate` del JWT; si expiró se cierra sesión y se pide login de nuevo.
- **Datos**: GET a `/v1/mobile/data` con header `Authorization: [type] [token]`.
- **Carruseles**: Se renderizan dinámicamente según la respuesta. Tipo **thumb** (horizontal, imagen 640×480) y tipo **poster** (horizontal, imagen 320×480). Se muestra título del carrusel, imagen y título de cada ítem.
- **Imágenes por defecto**: Si la URL de una imagen es incorrecta o falla al cargar, se muestra una imagen placeholder por defecto (SVG en `src/presentation/assets/images/placeholder.svg`), de modo que el ítem no quede vacío.
- **Lazy loading**: Uso de `FlatList` con `initialNumToRender`, `maxToRenderPerBatch`, `windowSize` y `removeClippedSubviews` para imágenes.
- **Video**: Al tocar un ítem se abre un modal: si el ítem tiene `videoUrl` se usa `react-native-video`; si no, se muestra "Video no disponible".

## API

- Base: `https://echo-serv.tbxnet.com`
- Documentación: https://echo-serv.tbxnet.com/explorer/#/Mobile

## Tecnologías

- JavaScript (ES6+).
- Estilos en archivos separados (`.styles.js`) por pantalla/componente
- Clean Architecture (domain, data, presentation + DI)
- Redux para estado global (auth: token, tipo, sub; selectIsLoggedIn con validación JWT)
- Jest para tests unitarios (entidad Carousel y mapper de carruseles)

## Video 

Para habilitar el reproductor de video en el modal:

```bash
yarn add react-native-video
cd ios && pod install && cd ..
```
