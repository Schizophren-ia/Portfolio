/**
 * Utility to format scroll progress (0.0 to 1.0) into SMPTE film timecode (HH:MM:SS:FF at 24fps)
 */
export function formatSMPTETimecode(progress: number, totalDurationSeconds: number = 5400): string {
  // Clamp progress between 0 and 1
  const p = Math.max(0, Math.min(1, isNaN(progress) ? 0 : progress));
  
  // 5400 seconds = 90 minutes feature film reel
  const currentTotalSeconds = p * totalDurationSeconds;
  
  const hours = Math.floor(currentTotalSeconds / 3600);
  const minutes = Math.floor((currentTotalSeconds % 3600) / 60);
  const seconds = Math.floor(currentTotalSeconds % 60);
  
  // 24 frames per second for classic cinema
  const fractionalSecond = currentTotalSeconds - Math.floor(currentTotalSeconds);
  const frames = Math.floor(fractionalSecond * 24);
  
  const pad = (n: number) => n.toString().padStart(2, '0');
  
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}
