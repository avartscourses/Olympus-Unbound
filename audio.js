let soundOn = true;

export function isSoundEnabled() {
  return soundOn;
}

export function toggleSound() {
  soundOn = !soundOn;
  return soundOn;
}

export function speakText(text, onEnd = null) {
  if (!soundOn) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  if (onEnd) utterance.onend = onEnd;
  speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  speechSynthesis.cancel();
}

export function playAmbient(audioId) {
  const audio = document.getElementById(audioId);
  if (!soundOn) return;
  audio.volume = 0.5;  // Set default volume
  audio.play().catch(() => {});  // Attempt to play, handle any errors
}

export function pauseAmbient(audioId) {
  const audio = document.getElementById(audioId);
  audio.pause();
}

export function playSoundOnce(audioId) {
  const audio = document.getElementById(audioId);
  if (!soundOn) return;
  audio.play().catch(() => {});  // Play one-time sound effect
}

// This function ensures that ambient music plays after the first user interaction
export function startMusicOnUserInteraction(audioId) {
  let firstInteractionHandled = false;

  function handleFirstInteraction() {
    if (!firstInteractionHandled) {
      firstInteractionHandled = true;
      if (isSoundEnabled()) {
        const audio = document.getElementById(audioId);
        audio.play().catch(() => {});  // Start playing music
      }
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
    }
  }

  window.addEventListener("touchstart", handleFirstInteraction);
  window.addEventListener("click", handleFirstInteraction);
}
