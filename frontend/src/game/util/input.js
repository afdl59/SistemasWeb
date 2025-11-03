const input = {
  init(data) {
    window.addEventListener('keydown', (e) => {
      if ((e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') && data.userControl) {
        data.entities.mario.direction = 'left';
        if (data.entities.mario.bigMario) {
          data.entities.mario.currentState = data.entities.mario.states.bigWalking;
        } else {
          data.entities.mario.currentState = data.entities.mario.states.walking;
        }
      }
      if ((e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') && data.userControl) {
        data.entities.mario.direction = 'right';
        if (data.entities.mario.bigMario) {
          data.entities.mario.currentState = data.entities.mario.states.bigWalking;
        } else {
          data.entities.mario.currentState = data.entities.mario.states.walking;
        }
      }
      if ((e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp' || e.key === ' ') && data.userControl) {
        if (data.entities.mario.bigMario) {
          data.entities.mario.currentState = data.entities.mario.states.bigJumping;
        } else {
          data.entities.mario.currentState = data.entities.mario.states.jumping;
        }
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      if ((e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') && data.userControl) {
        if (data.entities.mario.bigMario) {
          data.entities.mario.currentState = data.entities.mario.states.bigStanding;
        } else {
          data.entities.mario.currentState = data.entities.mario.states.standing;
        }
      }
      if ((e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') && data.userControl) {
        if (data.entities.mario.bigMario) {
          data.entities.mario.currentState = data.entities.mario.states.bigStanding;
        } else {
          data.entities.mario.currentState = data.entities.mario.states.standing;
        }
      }
    });
  },
};

export { input as default };
