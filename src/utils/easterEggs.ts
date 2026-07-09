// Easter egg: Console greeting
// This file is imported in main.tsx to display a greeting when dev tools are opened

const ASCII_LOGO = `
    ___  ___  ___  ___  ___  
   | |/ | | | |_) | - |   |
   | |  | | |  /| | - |   |
   |_/  |____/  |_/  |_/   |
   ________________________|  
   |                       |
   |  KURA NINJA           |
   |________________________|
`;

const GREETING_MESSAGE = `
%c${ASCII_LOGO}

%c🐢 Hey there, fellow dev! 

%cYou found the console. Nice.

Some things you might find interesting:
• Press %cCtrl+K%c to open the command palette
• Try typing "sudo hire-me" in there 😉
• The site changes based on what time you're browsing

Currently running on: ☕ and questionable decisions.

	%c// "Not all those who wander are lost - but I definitely should've documented that function."

	%c- Aditya (Kura Ninja)
   adityavhlvy1003@gmail.com
`;

export function initEasterEggs() {
  // Console greeting
  console.log(
    GREETING_MESSAGE,
    "color: #4a6fa5; font-size: 10px; font-family: monospace;", // ASCII art
    "color: #c17f59; font-size: 16px; font-weight: bold;", // Hey there
    "color: #e8e6e3; font-size: 12px;", // Main text
    "color: #6b4c8a; font-weight: bold;", // Ctrl+K
    "color: #e8e6e3; font-size: 12px;", // Rest
    "color: #8a8a9a; font-style: italic; font-size: 11px;", // Quote
    "color: #4a6fa5; font-size: 11px;", // Signature
  );

  // Konami code easter egg
  let konamiIndex = 0;
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  const handleKonami = (e: KeyboardEvent) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        konamiIndex = 0;
        triggerKonamiEasterEgg();
      }
    } else {
      konamiIndex = 0;
    }
  };

  window.addEventListener("keydown", handleKonami);
}

function triggerKonamiEasterEgg() {
  // Create confetti-like effect
  const colors = ["#4a6fa5", "#6b4c8a", "#c17f59", "#e8e6e3"];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = "-10px";
    confetti.style.borderRadius = "50%";
    confetti.style.pointerEvents = "none";
    confetti.style.zIndex = "9999";
    confetti.style.animation = "confetti-fall 3s ease-out forwards";

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000);
  }

  // Add the animation if it doesn't exist
  if (!document.querySelector("#konami-style")) {
    const style = document.createElement("style");
    style.id = "konami-style";
    style.textContent = `
      @keyframes confetti-fall {
        to {
          transform: translateY(110vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  console.log(
    "%c🎮 KONAMI CODE ACTIVATED! 🐢",
    "color: #c17f59; font-size: 24px; font-weight: bold;",
  );
}
