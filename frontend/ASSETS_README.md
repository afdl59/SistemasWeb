# Assets del Juego Mario

Para que el juego funcione correctamente, necesitas colocar los siguientes archivos de sprites en la carpeta `public/assets/sprites/`:

## Archivos Requeridos

1. **spritesheet.png** - Contiene todos los sprites de Mario, enemigos, monedas, etc.
2. **tileset_gutter.png** - Contiene los tiles del suelo, bloques, tuberías, etc.
3. **mountain.png** - Sprite de montañas de fondo
4. **clouds.png** - Sprites de nubes
5. **castle.png** - Sprite del castillo al final

## Dónde Obtener los Sprites

Puedes obtener los sprites originales de varias fuentes:

### Opción 1: Desde el repositorio de referencia
```
https://github.com/tylerreichle/mario_js/tree/main/assets/sprites
```

Descarga los archivos directamente desde:
- https://github.com/tylerreichle/mario_js/blob/main/assets/sprites/spritesheet.png
- https://github.com/tylerreichle/mario_js/blob/main/assets/sprites/tileset_gutter.png
- https://github.com/tylerreichle/mario_js/blob/main/assets/sprites/mountain.png
- https://github.com/tylerreichle/mario_js/blob/main/assets/sprites/clouds.png
- https://github.com/tylerreichle/mario_js/blob/main/assets/sprites/castle.png

### Opción 2: The Spriters Resource
```
https://www.spriters-resource.com/nes/supermariobros/
```

### Opción 3: Usar wget/curl (PowerShell)
```powershell
# Navega a la carpeta public/assets
cd frontend\public\assets
mkdir sprites
cd sprites

# Descarga los archivos
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/tylerreichle/mario_js/main/assets/sprites/spritesheet.png" -OutFile "spritesheet.png"
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/tylerreichle/mario_js/main/assets/sprites/tileset_gutter.png" -OutFile "tileset_gutter.png"
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/tylerreichle/mario_js/main/assets/sprites/mountain.png" -OutFile "mountain.png"
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/tylerreichle/mario_js/main/assets/sprites/clouds.png" -OutFile "clouds.png"
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/tylerreichle/mario_js/main/assets/sprites/castle.png" -OutFile "castle.png"
```

## Audio (Opcional)

Los sonidos están desactivados por defecto en esta implementación para evitar problemas de carga. Si quieres activarlos:

1. Descarga los archivos de audio del repositorio original
2. Colócalos en `public/assets/audio/sounds/` y `public/assets/audio/music/`
3. Los archivos se cargarán automáticamente

## Estructura Final

```
frontend/
└── public/
    └── assets/
        ├── sprites/
        │   ├── spritesheet.png
        │   ├── tileset_gutter.png
        │   ├── mountain.png
        │   ├── clouds.png
        │   └── castle.png
        └── audio/ (opcional)
            ├── sounds/
            │   ├── jump.wav
            │   ├── coin.wav
            │   ├── stomp.wav
            │   ├── powerup.wav
            │   ├── powerdown.wav
            │   ├── bump.wav
            │   ├── break_block.wav
            │   └── mario_death.wav
            └── music/
                ├── mario_theme.mp3
                └── level_complete.mp3
```

## Nota Legal

Los sprites y sonidos de Super Mario Bros son propiedad de Nintendo. Este proyecto es solo para fines educativos y de demostración. No debe usarse comercialmente.
