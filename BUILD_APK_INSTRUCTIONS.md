# Instrucciones para Generar APK - Control de Plagas

## Estado del Proyecto
✅ Aplicación nativa configurada con Capacitor
✅ Diseño profesional oscuro completado (estilo Fumigaciones Gemar)
✅ Archivos Android generados y sincronizados
✅ Configuración de permisos y manifest lista

## Opción 1: Usar Capacitor Live (Recomendado - Más Fácil)

1. **Instala Capacitor Live en tu teléfono:**
   - Android: https://play.google.com/store/apps/details?id=io.ionic.caplivereload
   - iOS: https://apps.apple.com/app/capacitor-live/id1512805020

2. **Ejecuta en Replit:**
   ```bash
   npx cap run android --livereload --external
   ```

3. **Escanea el código QR** que aparece para probar la app inmediatamente

## Opción 2: Compilar APK Localmente con Android Studio

1. **Descarga el proyecto completo** desde Replit usando el botón "Download as ZIP"

2. **Instala Android Studio:**
   - Descarga desde: https://developer.android.com/studio

3. **Abre el proyecto:**
   - Abre Android Studio
   - Selecciona "Open an existing project"
   - Navega a la carpeta `android` dentro del proyecto descargado

4. **Compila la APK:**
   - En Android Studio: Build → Build Bundle(s) / APK(s) → Build APK(s)
   - La APK se generará en: `android/app/build/outputs/apk/debug/`

## Opción 3: Usar Servicio de Build Online (Appflow)

1. **Crea cuenta en Ionic Appflow:**
   - Ve a: https://ionic.io/appflow
   - Regístrate gratis

2. **Sube tu proyecto:**
   - Conecta con GitHub o sube directamente
   - Selecciona la carpeta completa del proyecto

3. **Configura el build:**
   - Tipo: Android
   - Build Type: Debug APK
   - Platform: Capacitor

4. **Descarga la APK** una vez completado el build

## Archivos del Proyecto Listos

### Estructura actual:
```
proyecto/
├── android/                    # Proyecto Android nativo
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   └── assets/public/index.html
│   │   └── build.gradle
│   ├── gradle.properties
│   └── build.gradle
├── dist/public/               # Aplicación web compilada
│   └── index.html            # App con diseño profesional oscuro
├── capacitor.config.ts       # Configuración Capacitor
└── package.json
```

### Características de la App:

✅ **Diseño Profesional Oscuro**
- Colores: Negro (#0f0f0f), Gris oscuro (#1a1a1a)
- Gradientes y efectos de cristal
- Tipografía moderna

✅ **Funcionalidades**
- Dashboard con estadísticas
- Navegación inferior nativa
- Estadísticas destacadas (2400+ clientes, 15 años, 99% efectividad)
- Botones de acción rápida
- Responsive para móviles

✅ **Configuración Android**
- Package: com.pestcontrol.app
- Nombre: Control de Plagas
- Permisos: Internet, Cámara, Ubicación, Llamadas
- Target SDK: 34 (Android 14)
- Min SDK: 22 (Android 5.1)

## Próximos Pasos Recomendados

1. **Prueba inmediata**: Usar Capacitor Live (Opción 1)
2. **APK para distribución**: Android Studio (Opción 2)
3. **Build automático**: Appflow (Opción 3)

## Soporte

Si necesitas ayuda con alguno de estos métodos, puedo guiarte paso a paso con el que prefieras usar.

**Nota**: La aplicación ya está completamente funcional con el diseño que solicitaste basado en "Fumigaciones Gemar".