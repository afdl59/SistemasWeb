# Captcha de Plataforma - Super Mach Op

## Características Implementadas

### Gráficos y Texturas
- ✅ Texturas dibujadas en canvas para todos los elementos (bloques, personaje, enemigos, monedas)
- ✅ Bloques de ladrillo (marrón) con bordes definidos
- ✅ Bloques de pregunta (amarillo con "?") que cambian a bloques usados (gris)
- ✅ Tuberías verdes con detalles visuales
- ✅ Personaje rojo estilo Mario con gorra y overol
- ✅ Enemigos marrones tipo Goomba con ojos y expresión
- ✅ Monedas doradas con círculo brillante
- ✅ Bandera verde y blanca al final del nivel

### Mecánicas de Juego

#### Bloques de Pregunta
- Golpear desde abajo libera 1 moneda
- El bloque cambia de textura a "usado" después del primer golpe
- Animación de rebote del bloque
- La moneda aparece con animación flotante

#### Sistema de Enemigos
- Los enemigos patrullan horizontalmente
- **Stomp mechanic**: Saltar sobre un enemigo lo mata (sprite aplastado)
- Tocar un enemigo por el lado mata al jugador
- Los enemigos muertos desaparecen después de un momento

#### Físicas y Movimiento
- Gravedad realista (1000 Y)
- Salto responsivo con SPACE o flechas arriba
- Velocidad de movimiento: 160 px/s
- Altura de salto ajustada para alcanzar bloques
- Colisiones precisas entre jugador, enemigos, bloques y terreno

#### Sistema de Victoria/Derrota
- **Objetivo**: Recoger mínimo 3 monedas y llegar a la bandera en 60 segundos
- **Muerte por**: Caída al vacío, tiempo agotado, o colisión lateral con enemigo
- Al morir, el juego reinicia y debes volver a ingresar credenciales
- Al ganar, se navega a /landing

### Nivel Determinista (Réplica 1-1)
- Ancho del mundo: 212 tiles (6784 px)
- 3 gaps (huecos) en posiciones fijas
- 4 tuberías de diferentes alturas
- Múltiples bloques de pregunta distribuidos
- Plataformas flotantes
- Escalera al final del nivel
- Sin RNG: cada partida es idéntica

## Controles
- **←→**: Mover izquierda/derecha
- **SPACE**: Saltar
- **ESC**: No disponible (forzar completar captcha)

## Flujo de Autenticación
1. Ingresa usuario: `admin`, contraseña: `12345`
2. Aparece modal con el juego
3. Completa el nivel (3+ monedas, < 60s, llegar a bandera)
4. Si fallas o mueres → página recarga (reingresar credenciales)
5. Si pasas → navegas a /landing

## Archivos Principales
- `frontend/src/game/platformer/assets.js` - Generador de texturas embebidas
- `frontend/src/game/platformer/scenes/BootScene.js` - Carga de assets
- `frontend/src/game/platformer/scenes/GameScene.js` - Lógica del juego y mecánicas
- `frontend/src/game/platformer/config.js` - Configuración de Phaser
- `frontend/src/views/PlatformerCaptcha.jsx` - Componente React wrapper
- `frontend/src/views/Login.jsx` - Integración del captcha en login

## Tecnologías
- **Phaser 3** - Motor de juego 2D
- **React 19** - UI framework
- **Vite 7** - Build tool y dev server

## Comandos
```powershell
# Instalar dependencias
cd frontend
npm install

# Iniciar servidor de desarrollo
npm start

# Visitar login
http://localhost:5174/login

# Visitar captcha directo (testing)
http://localhost:5174/captcha
```

## Requisitos del Captcha
- Tiempo límite: 60 segundos
- Monedas mínimas: 3
- Tocar la bandera al final del nivel
- Sin muertes (opcional, pero reinicia nivel)

## Próximas Mejoras Opcionales
- Sprites animados (caminar, saltar)
- Sonidos (salto, moneda, muerte, victoria)
- Más enemigos y power-ups
- Bloques destructibles
- Partículas al recoger monedas
