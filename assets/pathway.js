(() => {
  const digitFormatter = new Intl.NumberFormat("ar-EG");

  document.querySelectorAll(".path-journey").forEach((journey) => {
    const buttons = [...journey.querySelectorAll(".path-step")];
    const panels = [...journey.querySelectorAll(".path-panel")];
    const progress = journey.querySelector(".path-progress span");
    const previous = journey.querySelector("[data-previous]");
    const next = journey.querySelector("[data-next]");
    let activeIndex = 0;

    function selectStep(index, moveFocus = false) {
      activeIndex = Math.max(0, Math.min(index, buttons.length - 1));

      buttons.forEach((button, buttonIndex) => {
        const selected = buttonIndex === activeIndex;
        button.setAttribute("aria-selected", String(selected));
        button.tabIndex = selected ? 0 : -1;
        panels[buttonIndex].hidden = !selected;
      });

      progress.style.width = `${((activeIndex + 1) / buttons.length) * 100}%`;
      progress.parentElement.setAttribute("aria-valuemax", String(buttons.length));
      progress.parentElement.setAttribute("aria-valuenow", String(activeIndex + 1));
      previous.disabled = activeIndex === 0;
      next.disabled = activeIndex === buttons.length - 1;
      if (moveFocus) buttons[activeIndex].focus();
    }

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => selectStep(index));
      button.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
          event.preventDefault();
          selectStep((activeIndex + 1) % buttons.length, true);
        } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
          event.preventDefault();
          selectStep((activeIndex - 1 + buttons.length) % buttons.length, true);
        } else if (event.key === "Home") {
          event.preventDefault();
          selectStep(0, true);
        } else if (event.key === "End") {
          event.preventDefault();
          selectStep(buttons.length - 1, true);
        }
      });
    });

    previous.addEventListener("click", () => selectStep(activeIndex - 1));
    next.addEventListener("click", () => selectStep(activeIndex + 1));
    selectStep(0);
  });

  document.querySelectorAll("[data-whatsapp-course]").forEach((link) => {
    const course = link.dataset.whatsappCourse;
    const message = `السلام عليكم، أرغب في الاستفسار عن ${course} في أكاديمية أوثق شافع.`;
    link.href = `https://wa.me/201124810786?text=${encodeURIComponent(message)}`;
  });

  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = digitFormatter.format(new Date().getFullYear());
})();
