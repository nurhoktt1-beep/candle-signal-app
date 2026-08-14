let countdownTimer;
let currentSignal = null;

function testBuy() {
  showSignal("BUY", "Bullish Pattern", 87);
}

function testSell() {
  showSignal("SELL", "Bearish Pattern", 84);
}

function showSignal(type, pattern, earlyPercent) {
  clearInterval(countdownTimer);

  currentSignal = type;

  const signal = document.getElementById("signal");
  const patternText = document.getElementById("pattern");
  const earlyMatch = document.getElementById("earlyMatch");
  const countdown = document.getElementById("countdown");
  const finalMatch = document.getElementById("finalMatch");
  const confirmation = document.getElementById("confirmation");

  // Early signal
  signal.textContent = type === "BUY" ? "🟢 EARLY BUY" : "🔴 EARLY SELL";
  signal.style.color = type === "BUY" ? "#25e58a" : "#ff5577";

  patternText.textContent = pattern;
  earlyMatch.textContent = "Early Match: " + earlyPercent + "%";

  finalMatch.textContent = "Final Match: --%";
  confirmation.textContent = "Waiting for candle close...";

  // Sound
  playSound();

  // Vibration
  if (navigator.vibrate) {
    navigator.vibrate([300, 150, 300]);
  }

  // 5 second countdown
  let seconds = 5;
  countdown.textContent = "Candle closes in: " + seconds + "s";

  countdownTimer = setInterval(() => {
    seconds--;

    if (seconds > 0) {
      countdown.textContent = "Candle closes in: " + seconds + "s";
    } else {
      clearInterval(countdownTimer);

      // Demo final percentage
      const finalPercent =
        Math.floor(Math.random() * 21) + 80;

      finalMatch.textContent =
        "Final Match: " + finalPercent + "%";

      if (finalPercent === 100) {
        confirmation.textContent = "✅ 100% CONFIRMED";
      } else {
        confirmation.textContent =
          "Pattern Match: " + finalPercent + "%";
      }
    }
  }, 1000);
}

// Simple alert sound
function playSound() {
  try {
    const audioContext =
      new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.frequency.value = 850;
    oscillator.type = "sine";

    gain.gain.setValueAtTime(
      0.3,
      audioContext.currentTime
    );

    oscillator.start();

    oscillator.stop(
      audioContext.currentTime + 0.25
    );
  } catch (error) {
    console.log("Sound unavailable");
  }
}
