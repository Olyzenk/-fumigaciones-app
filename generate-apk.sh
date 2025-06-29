#!/bin/bash
# Script para generar APK usando herramientas online

echo "=== Control de Plagas - Generador de APK ==="
echo ""
echo "Métodos disponibles para generar tu APK:"
echo ""
echo "1. VOLTBUILDER (Recomendado - Gratuito)"
echo "   - Ve a: https://voltbuilder.com/"
echo "   - Regístrate gratis"
echo "   - Sube el ZIP del proyecto"
echo "   - Selecciona Android"
echo "   - Descarga APK en 5 minutos"
echo ""
echo "2. COCOON.IO"
echo "   - Ve a: https://cocoon.io/"
echo "   - Crea cuenta gratuita" 
echo "   - Importa proyecto Cordova/Capacitor"
echo "   - Build para Android"
echo ""
echo "3. MONACA (Onsen UI)"
echo "   - Ve a: https://monaca.io/"
echo "   - Registrate gratis"
echo "   - Importa como proyecto Cordova"
echo "   - Compila para Android"
echo ""

# Crear archivo de configuración para build services
cat > config.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8" ?>
<widget xmlns="http://www.w3.org/ns/widgets" 
        xmlns:gap="http://phonegap.com/ns/1.0"
        id="com.pestcontrol.app" 
        version="1.0.0">
    
    <name>Control de Plagas</name>
    <description>Aplicación para gestión de servicios de control de plagas</description>
    <author>Empresa Control de Plagas</author>
    
    <platform name="android">
        <preference name="android-minSdkVersion" value="22" />
        <preference name="android-targetSdkVersion" value="34" />
    </platform>
    
    <icon src="icon.png" />
    <content src="index.html" />
    
    <access origin="*" />
    <allow-intent href="tel:*" />
    <allow-intent href="mailto:*" />
    
    <preference name="Orientation" value="portrait" />
    <preference name="Fullscreen" value="false" />
    
</widget>
EOF

echo "Archivo config.xml creado para build services"
echo ""
echo "Para descargar el proyecto:"
echo "1. En Replit: Menú (...) → Download as ZIP"
echo "2. Sube el ZIP a cualquiera de los servicios arriba"
echo "3. Tu APK estará lista en minutos"