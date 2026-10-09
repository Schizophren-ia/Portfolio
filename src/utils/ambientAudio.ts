// Subtle analog cinematic ambience synthesizer using Web Audio API
// Completely self-contained, no external mp3 assets required.

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isRunning: boolean = false;

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isRunning;
  }

  private start() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);
      this.masterGain.connect(this.ctx.destination);

      // Warm cinematic sub-harmonic drone (55Hz / 110Hz)
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110, this.ctx.currentTime); // A2

      oscGain.gain.setValueAtTime(0.4, this.ctx.currentTime);

      osc1.connect(oscGain);
      osc2.connect(oscGain);

      // Lowpass filter for warm, dark cinematic tone
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, this.ctx.currentTime);
      filter.Q.setValueAtTime(3, this.ctx.currentTime);

      oscGain.connect(filter);
      filter.connect(this.masterGain);

      osc1.start();
      osc2.start();

      this.isRunning = true;
    } catch {
      this.isRunning = false;
    }
  }

  private stop() {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      setTimeout(() => {
        try {
          this.ctx?.close();
        } catch {
          // ignore
        }
        this.ctx = null;
        this.isRunning = false;
      }, 1000);
    } else {
      this.isRunning = false;
    }
  }
}

export const ambientSound = new AmbientSoundEngine();
