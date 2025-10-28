# NOC - Network Operations Center

Una aplicación Node.js con TypeScript para monitoreo de servicios web implementada con arquitectura limpia.

## 📋 Descripción

Este proyecto es un sistema de monitoreo (NOC - Network Operations Center) que verifica periódicamente la disponibilidad de servicios web. Utiliza tareas programadas para realizar comprobaciones automáticas cada 2 segundos y registra los resultados en archivos de log clasificados por nivel de severidad.

## 🏗️ Arquitectura

El proyecto sigue los principios de **Arquitectura Limpia** con una clara separación de responsabilidades:

```
src/
├── domain/           # Lógica de negocio
│   ├── entities/     # Entidades del dominio
│   ├── use-cases/    # Casos de uso
│   ├── repository/   # Interfaces de repositorios
│   └── datasources/  # Interfaces de datasources
├── infrastructure/   # Implementación concreta
│   ├── datasources/  # Implementación de datasources
│   └── repositories/ # Implementación de repositorios
└── presentation/     # Capa de presentación
    ├── server.ts     # Servidor principal
    └── cron/         # Tareas programadas
```

## 🚀 Características

- ✅ **Monitoreo automático** de servicios web cada 2 segundos
- 📊 **Sistema de logs** clasificado por nivel de severidad (low, medium, high)
- 🏛️ **Arquitectura limpia** con separación de responsabilidades
- ⏰ **Tareas programadas** usando la librería `cron`
- 💾 **Persistencia de logs** en sistema de archivos
- 🔄 **Callbacks** para éxito y error en las comprobaciones

## 📦 Dependencias

### Dependencias principales
- `cron` - Para la programación de tareas

### Dependencias de desarrollo
- `typescript` - Compilador de TypeScript
- `ts-node-dev` - Servidor de desarrollo con recarga automática
- `tsconfig-paths` - Soporte para rutas absolutas en TypeScript
- `rimraf` - Herramienta para limpieza de directorios
- `@types/node` - Tipos de Node.js

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd NOC
```

2. Instala las dependencias:
```bash
npm install
```

## 🏃‍♂️ Uso

### Modo desarrollo
```bash
npm run dev
```

### Compilar a JavaScript
```bash
npm run build
```

### Ejecutar en producción
```bash
npm run build
npm start
```

### Limpiar archivos de compilación
```bash
npm run clean
```

## 📝 Configuración

El servicio está configurado para monitorear `http://localhost:3000` por defecto. Puedes modificar esta URL en el archivo `src/presentation/server.ts`:

```typescript
const url = 'http://localhost:3000'; // Cambia esta URL
```

## 📊 Sistema de Logs

La aplicación genera logs en la carpeta `logs/`:

- `logs/logs-alls.log` - Todos los logs
- `logs/logs-medium.log` - Logs de nivel medio
- `logs/logs-high.log` - Logs de nivel alto

Los logs se crean automáticamente al iniciar la aplicación.

## 🔍 Estructura de Logs

Cada entrada de log tiene el siguiente formato:

```json
{
  "level": "low|medium|high",
  "message": "mensaje del log",
  "timestamp": "YYYY-MM-DD HH:mm:ss"
}
```

## 🎯 Flujo de Trabajo

1. La aplicación inicia el servidor
2. Se crea una tarea programada con `CronService` que se ejecuta cada 2 segundos
3. `CheckService` realiza una petición HTTP a la URL configurada
4. Según el resultado, se genera un log con el nivel apropiado:
   - **Low**: Servicio responde correctamente
   - **High**: Error en la petición o servicio no disponible
5. Los logs se guardan en archivos usando `FileSystemDatasource`
6. Se ejecutan los callbacks correspondientes (éxito/error)

## 🧪 Testing

Actualmente el proyecto no incluye pruebas configuradas. Puedes agregar tests usando frameworks como Jest o Mocha.

## 📄 Licencia



## 🤝 Contribución

Si deseas contribuir a este proyecto, por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📞 Contacto

Para cualquier pregunta o sugerencia, por favor abre un issue en el repositorio.
