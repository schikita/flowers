// ═══════════════════════════════════════════════════════════════════════════
// MAIN.JS - FIXED
// ═══════════════════════════════════════════════════════════════════════════

// ==========================================
// SAFE INIT HELPERS
// ==========================================

function onReady(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn);
    return;
  }
  fn();
}

// ==========================================
// LUCIDE + GSAP PLUGINS
// ==========================================

function initLucide() {
  if (typeof lucide === "undefined" || !lucide.createIcons) return;
  try {
    lucide.createIcons();
  } catch (e) {
    console.log("Lucide init skipped");
  }
}

function initGSAPPlugin() {
  if (typeof gsap === "undefined") return;
  if (typeof ScrollTrigger === "undefined") return;
  try {
    gsap.registerPlugin(ScrollTrigger);
  } catch (e) {
    // может быть уже зарегистрирован
  }
}

// ==========================================
// LOADER MANAGEMENT
// ==========================================

function initLoader() {
  const loaderSection = document.querySelector(".loader-section");
  if (!loaderSection) return;

  loaderSection.style.display = "flex";
  loaderSection.style.position = "fixed";
  loaderSection.style.inset = "0";
  loaderSection.style.zIndex = "9999";
  loaderSection.style.backgroundColor = "rgba(15, 23, 42, 0.95)";
  loaderSection.style.backdropFilter = "blur(10px)";

  const hideLoader = () => {
    loaderSection.style.transition = "opacity 0.6s ease-out";
    loaderSection.style.opacity = "0";

    setTimeout(() => {
      loaderSection.style.display = "none";
    }, 600);
  };

  setTimeout(hideLoader, 4000);
}

// ==========================================
// HEADER & MOBILE MENU
// ==========================================

function initHeaderAndMobileMenu() {
  const header = document.getElementById("header");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (mobileMenuBtn && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuOverlay.classList.toggle("open");
      document.body.style.overflow = mobileMenuOverlay.classList.contains("open") ? "hidden" : "";
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuOverlay.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  window.addEventListener("scroll", () => {
    if (!header) return;

    if (window.scrollY > 100) {
      header.style.backdropFilter = "blur(12px)";
      header.style.backgroundColor = "rgba(15, 23, 42, 0.7)";
      header.style.borderColor = "rgba(255, 255, 255, 0.1)";
    } else {
      header.style.backdropFilter = "blur(0px)";
      header.style.backgroundColor = "transparent";
      header.style.borderColor = "transparent";
    }
  });
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// ==========================================
// SWIPER INITIALIZATION
// ==========================================

function initSwiper() {
  if (typeof Swiper === "undefined") return;

  const assortmentSwiperEl = document.querySelector(".mySwiper");
  if (assortmentSwiperEl) {
    try {
      const assortmentRoot = assortmentSwiperEl.closest(".assortment-slider") || document;

      new Swiper(assortmentSwiperEl, {
        slidesPerView: 1,
        spaceBetween: 20,
        grabCursor: true,
        pagination: {
          el: assortmentSwiperEl.querySelector(".swiper-pagination"),
          clickable: true,
        },
        navigation: {
          nextEl: assortmentRoot.querySelector(".assortment-nav--next"),
          prevEl: assortmentRoot.querySelector(".assortment-nav--prev"),
        },
        breakpoints: {
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        },
      });
    } catch (e) {
      console.log("Swiper (assortment) init error:", e);
    }
  }

  const reviewsSwiperEl = document.querySelector(".reviewsSwiper");
  if (reviewsSwiperEl) {
    try {
      new Swiper(reviewsSwiperEl, {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
          el: reviewsSwiperEl.querySelector(".swiper-pagination") || ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    } catch (e) {
      console.log("Swiper (reviews) init error:", e);
    }
  }
}

// ==========================================
// LIGHTBOX / MODAL LOGIC
// ==========================================

function initLightbox() {
  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("modal-img");
  const modalClose = document.getElementById("modal-close");

  if (!modal || !modalImg) return;

  function open(element) {
    const imgUrl = element ? element.getAttribute("data-modal-img") : "";
    if (!imgUrl) return;

    modalImg.src = imgUrl;
    modal.hidden = false;

    requestAnimationFrame(() => {
      modal.classList.add("active");
    });

    document.body.style.overflow = "hidden";
  }

  function close() {
    modal.classList.remove("active");

    setTimeout(() => {
      modalImg.src = "";
      modal.hidden = true;
    }, 300);

    document.body.style.overflow = "";
  }

  // для inline onclick="openModal(this)"
  window.openModal = open;

  if (modalClose) modalClose.addEventListener("click", close);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) close();
  });
}

// ==========================================
// ACCORDION LOGIC
// ==========================================

function initAccordions() {
  const accordionBtns = document.querySelectorAll(".accordion-btn");
  if (!accordionBtns.length) return;

  accordionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const icon = this.querySelector(".accordion-icon");
      if (!content) return;

      accordionBtns.forEach((otherBtn) => {
        if (otherBtn === btn) return;

        const otherContent = otherBtn.nextElementSibling;
        const otherIcon = otherBtn.querySelector(".accordion-icon");
        if (otherContent) otherContent.style.maxHeight = null;
        if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
      });

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        if (icon) icon.style.transform = "rotate(0deg)";
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        if (icon) icon.style.transform = "rotate(45deg)";
      }
    });
  });
}

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

function initRevealAnimations() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("active"));
    return;
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    });
  }, observerOptions);

  els.forEach((el) => observer.observe(el));
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      btn.style.transform = "translateY(0)";
      btn.style.opacity = "1";
    } else {
      btn.style.transform = "translateY(80px)";
      btn.style.opacity = "0";
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==========================================
// LAZY VIDEO (section #video-yt)
// ==========================================

function initLazyVideo() {
  const placeholder = document.getElementById("video-placeholder");
  const video = document.getElementById("lazy-video");
  if (!placeholder || !video) return;

  const source = video.querySelector("source");
  if (!source) return;

  function loadAndPlay() {
    const src = source.getAttribute("data-src");
    if (!src) return;

    source.src = src;
    source.removeAttribute("data-src");

    video.classList.remove("hidden");
    placeholder.classList.add("hidden");

    video.load();

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // пользователь может запретить автоплей — ок
      });
    }
  }

  placeholder.addEventListener("click", loadAndPlay);
}

// ==========================================
// GSAP ANIMATIONS (SAFE)
// ==========================================

function initGSAPAnimations() {
  if (typeof gsap === "undefined") return;

  try {
    const bgImage = document.getElementById("bg-image");
    if (bgImage) {
      gsap.to(bgImage, { scale: 1, duration: 1.5, ease: "power2.out" });
    }
  } catch (e) {
    console.log("GSAP init error:", e);
  }
}

// ==========================================
// GREENHOUSE GAME
// ==========================================

function initGreenhouseGame() {
  const root = document.getElementById("ghGreenhouse");
  if (!root) return;

  if (root.dataset.inited === "1") return;
  root.dataset.inited = "1";

  const GAME_SECONDS = 90;
  const GROWTH_MS = 5000;
  const POINTS_PER_FLOWER = 5;

  const STAGES = {
    EMPTY: "empty",
    G1: "g1",
    G2: "g2",
    G3: "g3",
    G4: "g4",
    WILTED: "wilted",
  };

  const TOOLS = {
    HAND: "hand",
    SEEDS: "seeds",
    WATER: "water",
    HARVEST: "harvest",
    CUT: "cut",
  };

  const ICONS = {
    [STAGES.EMPTY]: "🟫",
    [STAGES.G1]: "🌱",
    [STAGES.G2]: "🌿",
    [STAGES.G3]: "🌷",
    [STAGES.G4]: "🌸",
    [STAGES.WILTED]: "🥀",
  };

  const LABELS = {
    [STAGES.EMPTY]: "Пусто",
    [STAGES.G1]: "Травка",
    [STAGES.G2]: "Бутон",
    [STAGES.G3]: "Почти выросло",
    [STAGES.G4]: "Готово к сбору",
    [STAGES.WILTED]: "Завяло",
  };

  const startScreen = root.querySelector("#ghStartScreen");
  const startBtn = root.querySelector("#ghStartBtn");
  const gameWrap = root.querySelector("#ghGame");
  const timeEl = root.querySelector("#ghTime");
  const scoreEl = root.querySelector("#ghScore");
  const messageEl = root.querySelector("#ghMessage");
  const toolsWrap = root.querySelector(".gh__tools");
  const bedsGrid = root.querySelector("#ghBedsGrid");
  const resultModal = root.querySelector("#ghModal");
  const finalScoreEl = root.querySelector("#ghFinalScore");
  const finalPhraseEl = root.querySelector("#ghFinalPhrase");
  const restartBtn = root.querySelector("#ghRestartBtn");
  const closeBtn = root.querySelector("#ghCloseBtn");

  const required = {
    startScreen,
    startBtn,
    gameWrap,
    timeEl,
    scoreEl,
    messageEl,
    toolsWrap,
    bedsGrid,
    resultModal,
    finalScoreEl,
    finalPhraseEl,
    restartBtn,
    closeBtn,
  };

  for (const [name, el] of Object.entries(required)) {
    if (!el) {
      console.warn("Greenhouse: missing element:", name);
      return;
    }
  }

  let beds = [];
  let selectedTool = TOOLS.HAND;
  let timeLeft = GAME_SECONDS;
  let score = 0;
  let running = false;

  let tickTimerId = null;
  let growthTimerId = null;

  function makeBeds() {
    return Array.from({ length: 6 }, () => ({
      stage: STAGES.EMPTY,
      watered: false,
    }));
  }

  function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  function setMessage(text, kind) {
    messageEl.classList.remove("is-warn", "is-danger", "is-ok");
    if (kind === "warn") messageEl.classList.add("is-warn");
    if (kind === "danger") messageEl.classList.add("is-danger");
    if (kind === "ok") messageEl.classList.add("is-ok");
    messageEl.textContent = text;
  }

  function setSelectedTool(tool) {
    selectedTool = tool;
    toolsWrap.querySelectorAll(".gh__tool").forEach((b) => {
      b.classList.toggle("is-selected", b.dataset.tool === tool);
    });
  }

  function bedElByIndex(index) {
    return bedsGrid.querySelector(`.gh__bed[data-bed="${index}"]`);
  }

  function popBed(el) {
    if (!el) return;
    el.classList.add("is-pop");
    setTimeout(() => el.classList.remove("is-pop"), 180);
  }

  function waterFx(el) {
    if (!el) return;
    el.classList.add("is-waterFx");
    setTimeout(() => el.classList.remove("is-waterFx"), 700);
  }

  function renderBed(index) {
    const bed = beds[index];
    const el = bedElByIndex(index);
    if (!el) return;

    el.classList.remove("state-empty", "state-g1", "state-g2", "state-g3", "state-g4", "state-wilted");
    el.classList.add(`state-${bed.stage}`);

    const iconEl = el.querySelector(".gh__bedIcon");
    const textEl = el.querySelector(".gh__bedText");

    if (iconEl) iconEl.textContent = ICONS[bed.stage] || "🟫";
    if (textEl) textEl.textContent = LABELS[bed.stage] || "—";
  }

  function renderAll() {
    timeEl.textContent = formatTime(timeLeft);
    scoreEl.textContent = String(score);
    for (let i = 0; i < beds.length; i += 1) renderBed(i);
  }

  function stopTimers() {
    if (tickTimerId) {
      clearInterval(tickTimerId);
      tickTimerId = null;
    }
    if (growthTimerId) {
      clearInterval(growthTimerId);
      growthTimerId = null;
    }
  }

  function getPhraseByScore(points) {
    if (points >= 120) return "Отличный результат. Управление теплицей на уровне.";
    if (points >= 70) return "Хорошо. Чуть больше темпа и будет максимум.";
    if (points >= 30) return "Неплохо. Сфокусируйся на регулярном поливе каждые 5 секунд.";
    return "Нужно потренироваться: без воды растения либо стоят, либо вянут.";
  }

  function endGame() {
    running = false;
    stopTimers();

    finalScoreEl.textContent = String(score);
    finalPhraseEl.textContent = getPhraseByScore(score);

    gameWrap.hidden = true;
    resultModal.hidden = false;
    setMessage("Игра окончена. Посмотри результат.", "ok");
  }

  function growthStep() {
    if (!running) return;

    for (let i = 0; i < beds.length; i += 1) {
      const bed = beds[i];

      if (bed.stage === STAGES.EMPTY || bed.stage === STAGES.WILTED) continue;

      if (bed.stage === STAGES.G1 || bed.stage === STAGES.G2) {
        if (bed.watered) {
          bed.stage = bed.stage === STAGES.G1 ? STAGES.G2 : STAGES.G3;
          bed.watered = false;
        }
        // без воды на 1–2 стоит
        continue;
      }

      // 3–4 без воды вянут
      if (bed.stage === STAGES.G3 || bed.stage === STAGES.G4) {
        if (bed.watered) {
          if (bed.stage === STAGES.G3) bed.stage = STAGES.G4;
          bed.watered = false;
        } else {
          bed.stage = STAGES.WILTED;
        }
      }
    }

    renderAll();
  }

  function startTimers() {
    stopTimers();

    tickTimerId = setInterval(() => {
      if (!running) return;
      timeLeft -= 1;
      if (timeLeft <= 0) {
        timeLeft = 0;
        renderAll();
        endGame();
        return;
      }
      timeEl.textContent = formatTime(timeLeft);
    }, 1000);

    growthTimerId = setInterval(growthStep, GROWTH_MS);
  }

  function showGameUI() {
    startScreen.hidden = true;
    resultModal.hidden = true;
    gameWrap.hidden = false;
  }

  function showStartUI() {
    resultModal.hidden = true;
    gameWrap.hidden = true;
    startScreen.hidden = false;
  }

  function resetGameState() {
    beds = makeBeds();
    selectedTool = TOOLS.HAND;
    timeLeft = GAME_SECONDS;
    score = 0;
    running = true;

    setSelectedTool(selectedTool);
    setMessage("Выбери инструмент и нажми на грядку.");
    renderAll();
  }

  function startGame() {
    showGameUI();
    resetGameState();
    startTimers();
  }

  function handleBedAction(index, el) {
    if (!running) return;

    const bed = beds[index];

    if (selectedTool === TOOLS.HAND) {
      setMessage(`Состояние: ${LABELS[bed.stage]}`, "");
      popBed(el);
      return;
    }

    if (selectedTool === TOOLS.SEEDS) {
      if (bed.stage !== STAGES.EMPTY) {
        setMessage("Тут уже что-то растёт. Выбери другую грядку.", "warn");
        popBed(el);
        return;
      }
      bed.stage = STAGES.G1;
      bed.watered = false;
      setMessage("Посадка выполнена. Теперь полей (каждые 5 секунд).", "ok");
      popBed(el);
      renderBed(index);
      return;
    }

    if (selectedTool === TOOLS.WATER) {
      if (bed.stage === STAGES.EMPTY) {
        setMessage("Нечего поливать. Сначала посади семена.", "warn");
        popBed(el);
        return;
      }
      if (bed.stage === STAGES.WILTED) {
        setMessage("Поздно: растение завяло. Срежь его.", "danger");
        popBed(el);
        return;
      }
      bed.watered = true;
      setMessage("Полив учтён. Рост/проверка произойдёт на следующем тике (5 сек).", "ok");
      waterFx(el);
      popBed(el);
      return;
    }

    if (selectedTool === TOOLS.HARVEST) {
      if (bed.stage !== STAGES.G4) {
        setMessage("Собирать можно только созревшее растение (🌸).", "warn");
        popBed(el);
        return;
      }
      score += POINTS_PER_FLOWER;
      bed.stage = STAGES.EMPTY;
      bed.watered = false;

      scoreEl.textContent = String(score);
      setMessage(`Собрано +${POINTS_PER_FLOWER} очков.`, "ok");
      popBed(el);
      renderBed(index);
      return;
    }

    if (selectedTool === TOOLS.CUT) {
      if (bed.stage !== STAGES.WILTED) {
        setMessage("Срезать можно только завявшее (🥀).", "warn");
        popBed(el);
        return;
      }
      bed.stage = STAGES.EMPTY;
      bed.watered = false;
      setMessage("Срезано. Можешь посадить заново.", "ok");
      popBed(el);
      renderBed(index);
      return;
    }
  }

  // ====== EVENTS ======

  startBtn.addEventListener("click", startGame);

  restartBtn.addEventListener("click", () => {
    startGame();
  });

  closeBtn.addEventListener("click", () => {
    running = false;
    stopTimers();
    showStartUI();
  });

  toolsWrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".gh__tool");
    if (!btn) return;
    const tool = btn.dataset.tool;
    if (!tool) return;
    setSelectedTool(tool);
  });

  bedsGrid.addEventListener("click", (e) => {
    const bedBtn = e.target.closest(".gh__bed");
    if (!bedBtn) return;

    const idx = Number(bedBtn.dataset.bed);
    if (!Number.isFinite(idx)) return;

    handleBedAction(idx, bedBtn);
  });

  // начальное состояние
  showStartUI();
  beds = makeBeds();
  renderAll();
}

// ==========================================
// BOOTSTRAP
// ==========================================

onReady(() => {
  initLucide();
  initGSAPPlugin();

  initLoader();
  initHeaderAndMobileMenu();
  initSmoothScroll();

  initSwiper();
  initLightbox();
  initAccordions();
  initRevealAnimations();
  initBackToTop();
  initLazyVideo();
  initGSAPAnimations();

  initGreenhouseGame();

  // можно повторно прогнать lucide после динамических вставок
  initLucide();
});
