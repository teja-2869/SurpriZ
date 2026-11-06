/**
 * Web Audio Sound Engine for SURPRIZ
 * Generates warm, melodic, and celebratory soundscapes and tactile audio cues.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private musicInterval: any = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setValueAtTime(muted ? 0 : 0.25, this.ctx.currentTime);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Delicate crystal windchime shimmer
   */
  public playChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [587.33, 659.25, 880, 987.77, 1174.66, 1318.51];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 1.4);
      });
    } catch (e) {
      console.warn('Audio not initialized', e);
    }
  }

  /**
   * Wax Seal crackle and tactile pop
   */
  public playWaxPop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * Unwrapping gift box swoosh & spark
   */
  public playBoxOpen() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Low ribbon whoosh
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.35);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.55);

      // Chime burst
      setTimeout(() => this.playChime(), 150);
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * Joyful Party Horn fanfare
   */
  public playPartyHorn() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const chords = [
        [349.23, 440, 523.25], // F major
        [392.00, 493.88, 587.33], // G major
        [523.25, 659.25, 783.99]  // C major
      ];

      chords.forEach((chord, step) => {
        chord.forEach((freq) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + step * 0.16);

          gain.gain.setValueAtTime(0.001, now + step * 0.16);
          gain.gain.linearRampToValueAtTime(0.06, now + step * 0.16 + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + step * 0.16 + 0.35);

          osc.connect(gain);
          gain.connect(this.ctx!.destination);

          osc.start(now + step * 0.16);
          osc.stop(now + step * 0.16 + 0.4);
        });
      });
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * Soft candle blowing puff whoosh
   */
  public playCandleBlow() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // White noise puff
      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.25);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.26);

      // Add soft bell sparkle
      const bell = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();
      bell.type = 'sine';
      bell.frequency.setValueAtTime(1046.5, now + 0.08); // C6
      bellGain.gain.setValueAtTime(0.05, now + 0.08);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      bell.connect(bellGain);
      bellGain.connect(this.ctx.destination);
      bell.start(now + 0.08);
      bell.stop(now + 0.55);
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * Tap sparkle / stardust sound
   */
  public playSparkle() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const freqs = [784, 988, 1319, 1568];
      freqs.forEach((f, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.04);

        gain.gain.setValueAtTime(0.04, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.35);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * Camera click for polaroid inspection
   */
  public playCameraClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.03);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * Procedural soundtrack playback: "Golden Hour Serenade"
   * Plays gentle acoustic arpeggios and warm ambient chords in loop
   */
  public toggleSoundtrack(forcePlay?: boolean): boolean {
    this.initContext();
    if (!this.ctx) return false;

    if (this.isMusicPlaying && forcePlay !== true) {
      this.stopSoundtrack();
      return false;
    }

    if (forcePlay === false) {
      this.stopSoundtrack();
      return false;
    }

    this.stopSoundtrack();
    this.isMusicPlaying = true;

    // Chord progressions for Golden Hour Serenade (Cmaj7 -> Am9 -> Fmaj7 -> Gsus4)
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 261.63, 329.63, 349.23], // Fmaj7
      [196.00, 261.63, 293.66, 392.00]  // Gsus4
    ];

    let chordIdx = 0;
    const playChordStep = () => {
      if (!this.isMusicPlaying || !this.ctx || this.isMuted) return;

      const chord = chords[chordIdx % chords.length];
      chordIdx++;
      const now = this.ctx.currentTime;

      // Arpeggiate notes gently
      chord.forEach((freq, noteIdx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + noteIdx * 0.22);

        const volume = 0.04;
        gain.gain.setValueAtTime(0.0001, now + noteIdx * 0.22);
        gain.gain.linearRampToValueAtTime(volume, now + noteIdx * 0.22 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + noteIdx * 0.22 + 2.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + noteIdx * 0.22);
        osc.stop(now + noteIdx * 0.22 + 2.3);
      });
    };

    playChordStep();
    this.musicInterval = setInterval(playChordStep, 1600);
    return true;
  }

  public stopSoundtrack() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isMusicPlaying;
  }
}

export const sound = new SoundEngine();
