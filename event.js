gsap.registerPlugin(ScrollTrigger);

// Card Reveals: Professional scroll animation
gsap.utils.toArray(".event-card").forEach((card, i) => {
  gsap.fromTo(card, 
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    }
  );
});

// Modal Interaction
const modal = document.getElementById("event-modal");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".event-card").forEach(card => {
  card.addEventListener("click", () => {
    const title = card.querySelector("h2").textContent;
    const desc = card.querySelector("p").textContent;
    const details = card.querySelector(".event-details").innerHTML;

    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-desc").textContent = desc;
    document.getElementById("modal-details").innerHTML = details;

    modal.style.display = "flex";
    gsap.from(".modal-content", { scale: 0.9, opacity: 0, duration: 0.5, ease: "back.out(1.7)" });
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Confetti for Finale (Interactive canvas - professional burst)
const finaleCard = document.querySelector(".finale");
const confettiCanvas = document.querySelector(".confetti-canvas");
const ctx = confettiCanvas.getContext("2d");
let confettiParticles = [];

function createConfetti() {
  confettiParticles = [];
  for (let i = 0; i < 50; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height,
      r: Math.random() * 4 + 1,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`, // Bollywood colors
      tilt: Math.random() * 10 - 5,
      tiltAngle: Math.random() * Math.PI * 2,
      tiltAngleIncrement: Math.random() * 0.07 + 0.05,
      velocity: Math.random() * 2 + 1
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach(p => {
    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
    ctx.stroke();

    p.tiltAngle += p.tiltAngleIncrement;
    p.tilt = Math.sin(p.tiltAngle) * 15;
    p.y += p.velocity;
    if (p.y > confettiCanvas.height) p.y = -10; // Reset
  });
  requestAnimationFrame(drawConfetti);
}

finaleCard.addEventListener("mouseenter", () => {
  confettiCanvas.width = finaleCard.offsetWidth;
  confettiCanvas.height = finaleCard.offsetHeight;
  createConfetti();
  drawConfetti();
});

// Hamburger menu (keep your existing if any)