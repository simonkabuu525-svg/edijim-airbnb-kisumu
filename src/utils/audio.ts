/**
 * Web Audio API synthesizer for luxury haptics, UI beeps, and realistic phone buzzing.
 * Respects user mute preference and devices that don't support audio.
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundEnabled(): boolean {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('edijim_sound_enabled');
    if (stored !== null) {
      soundEnabled = stored === 'true';
    }
  }
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('edijim_sound_enabled', enabled ? 'true' : 'false');
  }
}

/**
 * Gentle modern UI tap / beep
 */
export function playBeep(freq = 680, duration = 0.08): void {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.2, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Ignore audio context constraints
  }
}

/**
 * Luxury crystal chime for selections and modal popups
 */
export function playChime(): void {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    [523.25, 659.25, 783.99].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);

      gain.gain.setValueAtTime(0.035, ctx.currentTime + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35 + idx * 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.05);
      osc.stop(ctx.currentTime + 0.4 + idx * 0.05);
    });
  } catch (e) {
    // Audio context error ignore
  }
}

/**
 * Realistic Dual-Tone Phone Buzzing & Haptic Vibration Simulator
 * Recreates the acoustic low-end drone + modulation of a mobile phone buzzing on a wooden nightstand.
 */
export function playPhoneBuzz(): void {
  // Mobile haptic vibration if hardware supports it
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([120, 80, 150, 80, 200]);
    } catch (e) {
      // Haptics ignore
    }
  }

  if (!isSoundEnabled()) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Pulse 1
    createBuzzPulse(ctx, 0);
    // Pulse 2
    createBuzzPulse(ctx, 0.28);
    // Pulse 3
    createBuzzPulse(ctx, 0.56);
  } catch (e) {
    // Audio context error
  }
}

function createBuzzPulse(ctx: AudioContext, delay: number) {
  const startTime = ctx.currentTime + delay;
  const duration = 0.18;

  // Low frequency carrier (resembles phone motor vibration)
  const osc = ctx.createOscillator();
  const oscSub = ctx.createOscillator();
  const gain = ctx.createGain();

  // 120Hz-140Hz motor rumble with harmonic
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(130, startTime);
  osc.frequency.linearRampToValueAtTime(115, startTime + duration);

  oscSub.type = 'sawtooth';
  oscSub.frequency.setValueAtTime(65, startTime);

  gain.gain.setValueAtTime(0.001, startTime);
  gain.gain.linearRampToValueAtTime(0.12, startTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain);
  oscSub.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  oscSub.start(startTime);
  osc.stop(startTime + duration);
  oscSub.stop(startTime + duration);
}
