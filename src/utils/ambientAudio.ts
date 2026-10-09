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

  public playShutterSound(volume: number = 0.05) {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = this.ctx || new AudioCtx();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const now = audioCtx.currentTime;

      // 1. Soft mechanical optic click: bandpass noise burst
      const bufferSize = Math.floor(audioCtx.sampleRate * 0.03); // 30ms
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1600, now);
      filter.Q.setValueAtTime(3.5, now);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start(now);

      // 2. Gentle tactile low-frequency thud (mechanical latch closing)
      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.04);
      oscGain.gain.setValueAtTime(volume * 0.4, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(oscGain);
      oscGain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Audio not permitted or suspended by browser policy
    }
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
