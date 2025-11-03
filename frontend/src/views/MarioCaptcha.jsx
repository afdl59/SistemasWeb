import { useEffect, useRef } from 'react';
import Game from '../game/game';

export default function MarioCaptcha({ onSuccess, onFailure }) {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const handleComplete = (result) => {
      if (result.success && result.coins >= 3) {
        onSuccess?.(result);
      } else {
        onFailure?.(result);
      }
    };

    const game = new Game(canvasRef.current, handleComplete);
    gameRef.current = game;
    game.init();

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy();
      }
    };
  }, [onSuccess, onFailure]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      backgroundColor: '#000',
      padding: '20px',
      borderRadius: '8px',
    }}>
      <canvas
        ref={canvasRef}
        width={760}
        height={600}
        style={{
          border: '4px solid #333',
          imageRendering: 'pixelated',
          backgroundColor: '#63adff',
        }}
      />
      <div style={{ color: '#FFF', fontFamily: 'monospace', fontSize: '14px', textAlign: 'center' }}>
        <p>Controles: A/D o ←/→ para mover, W/↑/Espacio para saltar</p>
        <p>Objetivo: Llega a la bandera. Recoge 3+ monedas para pasar el captcha.</p>
      </div>
    </div>
  );
}
