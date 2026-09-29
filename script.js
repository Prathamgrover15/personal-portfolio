const themeToggle = document.querySelector("#theme-toggle");
const copyEmailButton = document.querySelector("#copy-email");
const copyStatus = document.querySelector("#copy-status");
const fitOptions = document.querySelectorAll(".fit-option");
const fitTitle = document.querySelector("#fit-title");
const fitDescription = document.querySelector("#fit-description");
const fitPanelMark = document.querySelector(".fit-panel-mark");

const teamStrengths = {
  leadership: {
    number: "01",
    title: "Lead by taking responsibility",
    description: "I served as Cyber Crew President in 2025–26 after being Tech Head in 2024–25, helping lead my school’s technical club.",
  },
  security: {
    number: "02",
    title: "Bring a cybersecurity mindset",
    description: "I was a member of a top-25 international team in Xavier University’s Invisible War Cyber Defense Challenge (2025).",
  },
  building: {
    number: "03",
    title: "Help turn ideas into working tech",
    description: "I joined TEDx 2024’s web development team for its event registration site, and interned at IIT Madras’ Centre for Outreach and Digital Education, learning about AI and data science.",
  },
};

function applyTheme(theme) {
  const isLight = theme === "light";
  document.documentElement.dataset.theme = isLight ? "light" : "dark";
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} theme`);
  themeToggle.innerHTML = `<span aria-hidden="true">${isLight ? "☾" : "☼"}</span> ${isLight ? "DARK" : "LIGHT"} MODE`;
}

try {
  applyTheme(localStorage.getItem("portfolio-theme") || "dark");
} catch {
  applyTheme("dark");
}

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  applyTheme(nextTheme);
  try {
    localStorage.setItem("portfolio-theme", nextTheme);
  } catch {
    // The selected theme still applies for this visit if storage is unavailable.
  }
});

fitOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const strength = teamStrengths[option.dataset.fit];
    if (!strength) return;

    fitOptions.forEach((item) => {
      const selected = item === option;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    fitPanelMark.textContent = strength.number;
    fitTitle.textContent = strength.title;
    fitDescription.textContent = strength.description;
  });
});

copyEmailButton.addEventListener("click", async () => {
  const email = copyEmailButton.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
  } catch {
    const input = document.createElement("textarea");
    input.value = email;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.append(input);
    input.select();
    const copied = document.execCommand("copy");
    input.remove();
    if (!copied) {
      copyStatus.textContent = "Use email link";
      return;
    }
  }

  copyStatus.textContent = "COPIED ✓";
  window.setTimeout(() => {
    copyStatus.textContent = "";
  }, 2200);
});
