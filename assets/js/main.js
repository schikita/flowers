// ═══════════════════════════════════════════════════════════════════════════
// MAIN.JS - ОЧИЩЕННЫЙ (БЕЗ GOOGLE ADS КОНФЛИКТОВ)
// ═══════════════════════════════════════════════════════════════════════════

// ==========================================
// INITIALIZATION & SETUP
// ==========================================

// Initialize Lucide Icons ТОЛЬКО если он загружен
if (typeof lucide !== 'undefined' && lucide.createIcons) {
    try {
        lucide.createIcons();
    } catch (e) {
        console.log('Lucide icons initialization skipped');
    }
}

// Register GSAP Plugins ТОЛЬКО если они загружены
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    try {
        gsap.registerPlugin(ScrollTrigger);
    } catch (e) {
        console.log('GSAP plugins already registered');
    }
}

// ==========================================
// LOADER MANAGEMENT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const loaderSection = document.querySelector('.loader-section');
    
    if (loaderSection) {
        // Показываем loader
        loaderSection.style.display = 'flex';
        loaderSection.style.position = 'fixed';
        loaderSection.style.inset = '0';
        loaderSection.style.zIndex = '9999';
        loaderSection.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        loaderSection.style.backdropFilter = 'blur(10px)';
        
        // Скрываем через 4 секунды
        const hideLoader = () => {
            loaderSection.style.transition = 'opacity 0.6s ease-out';
            loaderSection.style.opacity = '0';
            
            setTimeout(() => {
                loaderSection.style.display = 'none';
            }, 600);
        };
        
        setTimeout(hideLoader, 4000);
    }
});

// ==========================================
// HEADER & MOBILE MENU
// ==========================================

const header = document.getElementById("header");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
const mobileLinks = document.querySelectorAll(".mobile-link");

if (mobileMenuBtn && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener("click", function() {
        mobileMenuOverlay.classList.toggle("open");
        document.body.style.overflow = mobileMenuOverlay.classList.contains("open") ? 'hidden' : 'auto';
    });
    
    mobileLinks.forEach((link) => {
        link.addEventListener("click", function() {
            mobileMenuOverlay.classList.remove("open");
            document.body.style.overflow = 'auto';
        });
    });
}

// Header фон при скролле
window.addEventListener("scroll", () => {
    if (header) {
        if (window.scrollY > 100) {
            header.style.backdropFilter = 'blur(12px)';
            header.style.backgroundColor = 'rgba(15, 23, 42, 0.7)';
            header.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        } else {
            header.style.backdropFilter = 'blur(0px)';
            header.style.backgroundColor = 'transparent';
            header.style.borderColor = 'transparent';
        }
    }
});

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#" || href === "") return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// ==========================================
// SWIPER INITIALIZATION
// ==========================================

function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    
    // Assortment Carousel
    if (document.querySelector('.mySwiper')) {
        try {
            new Swiper(".mySwiper", {
                slidesPerView: 1,
                spaceBetween: 20,
                grabCursor: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                },
            });
        } catch (e) {
            console.log('Swiper initialization error:', e);
        }
    }

    // Reviews Carousel
    if (document.querySelector('.reviewsSwiper')) {
        try {
            new Swiper(".reviewsSwiper", {
                slidesPerView: 1,
                spaceBetween: 30,
                pagination: { 
                    el: ".swiper-pagination", 
                    clickable: true 
                },
                breakpoints: {
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                },
            });
        } catch (e) {
            console.log('Reviews Swiper initialization error:', e);
        }
    }
}

// ==========================================
// LIGHTBOX / MODAL LOGIC
// ==========================================

const modal = document.getElementById("lightbox-modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.getElementById("modal-close");

window.openModal = function (element) {
    if (!modal || !modalImg) return;
    
    const imgUrl = element.getAttribute("data-modal-img");
    if (imgUrl) {
        modalImg.src = imgUrl;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
};

function closeModal() {
    if (!modal) return;
    
    modal.classList.remove("active");
    setTimeout(() => {
        if (modalImg) modalImg.src = "";
    }, 300);
    document.body.style.overflow = "";
}

if (modalClose) {
    modalClose.addEventListener("click", closeModal);
}

if (modal) {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
        closeModal();
    }
});

// ==========================================
// ACCORDION LOGIC
// ==========================================

function initAccordions() {
    const accordionBtns = document.querySelectorAll(".accordion-btn");
    
    accordionBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector(".accordion-icon");
            
            if (!content) return;

            accordionBtns.forEach((otherBtn) => {
                if (otherBtn !== btn) {
                    const otherContent = otherBtn.nextElementSibling;
                    const otherIcon = otherBtn.querySelector(".accordion-icon");
                    if (otherContent) otherContent.style.maxHeight = null;
                    if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
                }
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
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach((el) => {
        observer.observe(el);
    });
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            btn.style.transform = 'translateY(0)';
            btn.style.opacity = '1';
        } else {
            btn.style.transform = 'translateY(80px)';
            btn.style.opacity = '0';
        }
    });
    
    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ==========================================
// SCROLL SPY (Active Menu Highlight)
// ==========================================

function initScrollSpy() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            const span = link.querySelector("span");
            if (span) {
                span.classList.remove("w-full");
                if (link.getAttribute("href").includes(current)) {
                    span.classList.add("w-full");
                }
            }
        });
    });
}

// ==========================================
// GSAP ANIMATIONS (Textify & Stats)
// ==========================================

function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;

    try {
        // Animate background image on page load
        const bgImage = document.getElementById("bg-image");
        if (bgImage) {
            gsap.to(bgImage, {
                scale: 1,
                duration: 1.5,
                ease: "power2.out",
            });
        }

        // Textify Animation
        const animationSection = document.querySelector('.animation-1');
        if (animationSection && typeof ScrollTrigger !== 'undefined') {
            const lines = animationSection.querySelectorAll('.textify-inner');
            
            if (lines.length > 0) {
                gsap.fromTo(lines, 
                    {
                        y: "100%",
                        x: "100%",
                        opacity: 0,
                        skewX: -45,
                    },
                    {
                        y: "0%",
                        x: "0%",
                        opacity: 1,
                        skewX: 0,
                        stagger: 0.05,
                        duration: 0.7,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: animationSection,
                            start: "top 70%",
                            end: "bottom 20%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        }

        // Animate stat cards
        const statCards = document.querySelectorAll(".stat-card");
        if (statCards.length > 0 && typeof ScrollTrigger !== 'undefined') {
            gsap.to(statCards, {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".animation-1",
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                },
            });
        }
    } catch (e) {
        console.log('GSAP animation error:', e);
    }
}

// ==========================================
// GREENHOUSE GAME INITIALIZATION
// ==========================================

function initGreenhouseGame() {
  const GAME_SECONDS = 90;
  const GROWTH_MS = 5000;
  const POINTS_PER_FLOWER = 5;

  const STAGES = {
    EMPTY: "empty",
    G1: "g1",
    G2: "g2",
    G3: "g3",
    G4: "g4",
    WILTED: "wilted"
  };

  const TOOLS = {
    HAND: "hand",
    SEEDS: "seeds",
    WATER: "water",
    HARVEST: "harvest",
    CUT: "cut"
  };

  const ICONS = {
    [STAGES.EMPTY]: "🟫",
    [STAGES.G1]: "🌱",
    [STAGES.G2]: "🌿",
    [STAGES.G3]: "🌷",
    [STAGES.G4]: "🌸",
    [STAGES.WILTED]: "🥀"
  };

  const LABELS = {
    [STAGES.EMPTY]: "Пусто",
    [STAGES.G1]: "Травка",
    [STAGES.G2]: "Бутон",
    [STAGES.G3]: "Почти выросло",
    [STAGES.G4]: "Готово к сбору",
    [STAGES.WILTED]: "Завяло"
  };

  // Поиск корневого элемента
  const root = document.getElementById("ghGreenhouse");
  if (!root) {
    console.warn("ghGreenhouse not found");
    return;
  }

  // Поиск всех необходимых элементов
  const startScreen = root.querySelector("#ghStartScreen");
  const startBtn = root.querySelector("#ghStartBtn");
  const gameWrap = root.querySelector("#ghGame");
  const timeEl = root.querySelector("#ghTime");
  const scoreEl = root.querySelector("#ghScore");
  const messageEl = root.querySelector("#ghMessage");
  const toolsWrap = root.querySelector(".gh__tools");
  const bedsGrid = root.querySelector("#ghBedsGrid");
  const modal = root.querySelector("#ghModal");
  const finalScoreEl = root.querySelector("#ghFinalScore");
  const finalPhraseEl = root.querySelector("#ghFinalPhrase");
  const restartBtn = root.querySelector("#ghRestartBtn");
  const closeBtn = root.querySelector("#ghCloseBtn");

  // Проверка наличия всех элементов
  const requiredElements = {
    startScreen, startBtn, gameWrap, timeEl, scoreEl, messageEl,
    toolsWrap, bedsGrid, modal, finalScoreEl, finalPhraseEl, restartBtn, closeBtn
  };

  for (const [name, el] of Object.entries(requiredElements)) {
    if (!el) {
      console.warn(`Required element ${name} not found`);
      return;
    }
  }

  // Состояние игры
  let beds = [];
  let selectedTool = TOOLS.HAND;
  let timeLeft = GAME_SECONDS;
  let score = 0;
  let running = false;
  let tickTimerId = null;
  let growthTimerId = null;

  // ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================

  function makeBeds() {
    return Array.from({ length: 6 }, () => ({
      stage: STAGES.EMPTY,
      watered: false
    }));
  }

  function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    const mm = String(m).padStart(2, "0");
    const ss = String(s).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  function setMessage(text, kind = "") {
    messageEl.classList.remove("is-warn", "is-danger", "is-ok");
    if (kind === "warn") messageEl.classList.add("is-warn");
    if (kind === "danger") messageEl.classList.add("is-danger");
    if (kind === "ok") messageEl.classList.add("is-ok");
    messageEl.textContent = text;
  }

  function setSelectedTool(tool) {
    selectedTool = tool;
    const btns = toolsWrap.querySelectorAll(".gh__tool");
    btns.forEach((b) => {
      b.classList.toggle("is-selected", b.dataset.tool === tool);
    });
  }

  function bedElByIndex(index) {
    return bedsGrid.querySelector(`.gh__bed[data-bed="${index}"]`);
  }

  function renderBed(index) {
    const bed = beds[index];
    const el = bedElByIndex(index);
    if (!el) return;

    // Удаляем старые классы состояния
    el.classList.remove(
      "state-empty", "state-g1", "state-g2", 
      "state-g3", "state-g4", "state-wilted"
    );

    // Добавляем новый класс состояния
    el.classList.add(`state-${bed.stage}`);

    // Обновляем иконку и текст
    const iconEl = el.querySelector(".gh__bedIcon");
    const textEl = el.querySelector(".gh__bedText");

    if (iconEl) iconEl.textContent = ICONS[bed.stage] || "🟫";
    if (textEl) textEl.textContent = LABELS[bed.stage] || "—";
  }

  function renderAll() {
    timeEl.textContent = formatTime(timeLeft);
    scoreEl.textContent = String(score);
    for (let i = 0; i < beds.length; i += 1) {
      renderBed(i);
    }
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

  function endGame() {
    running = false;
    stopTimers();

    finalScoreEl.textContent = String(score);
    finalPhraseEl.textContent = getPhraseByScore(score);

    // Показываем модаль, скрываем игру
    gameWrap.hidden = true;
    modal.hidden = false;
    setMessage("Игра окончена. Посмотри результат.", "ok");
  }

  function getPhraseByScore(points) {
    if (points >= 120) return "Отличный результат. Управление теплицей на уровне.";
    if (points >= 70) return "Хорошо. Чуть больше темпа и будет максимум.";
    if (points >= 30) return "Неплохо. Сфокусируйся на регулярном поливе каждые 5 секунд.";
    return "Нужно потренироваться: без воды растения либо стоят, либо вянут.";
  }

  function startGame() {
    // Останавливаем все текущие таймеры
    stopTimers();

    // Сбрасываем состояние игры
    beds = makeBeds();
    selectedTool = TOOLS.HAND;
    timeLeft = GAME_SECONDS;
    score = 0;
    running = true;

    // Управляем видимостью экранов
    startScreen.hidden = true;    // Скрываем стартовый экран
    modal.hidden = true;          // Скрываем модаль результатов
    gameWrap.hidden = false;      // Показываем игру

    // Инициализируем UI
    setSelectedTool(TOOLS.HAND);
    setMessage("Выбери инструмент и нажми на грядку.", "");
    renderAll();

    // Таймер обратного отсчёта
    tickTimerId = setInterval(() => {
      if (!running) return;
      
      timeLeft -= 1;
      timeEl.textContent = formatTime(timeLeft);

      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);

    // Таймер роста растений
    growthTimerId = setInterval(() => {
      if (!running) return;
      growthTick();
    }, GROWTH_MS);
  }

  function pulseBed(index) {
    const el = bedElByIndex(index);
    if (!el) return;
    
    el.classList.add("is-pop");
    setTimeout(() => {
      el.classList.remove("is-pop");
    }, 180);
  }

  function waterFx(index) {
    const el = bedElByIndex(index);
    if (!el) return;
    
    el.classList.add("is-waterFx");
    setTimeout(() => {
      el.classList.remove("is-waterFx");
    }, 650);
  }

  function plant(index) {
    const bed = beds[index];
    if (bed.stage !== STAGES.EMPTY) {
      setMessage("Эта грядка не пустая. Сначала собери/срежь растение.", "warn");
      return;
    }

    bed.stage = STAGES.G1;
    bed.watered = false;
    renderBed(index);
    pulseBed(index);
    setMessage("Семена посеяны. Теперь полей грядку.", "ok");
  }

  function water(index) {
    const bed = beds[index];

    if (bed.stage === STAGES.EMPTY) {
      setMessage("Здесь нечего поливать: грядка пустая.", "warn");
      return;
    }

    if (bed.stage === STAGES.WILTED) {
      setMessage("Это завяло. Полив не поможет — нужно срезать.", "warn");
      return;
    }

    bed.watered = true;
    waterFx(index);
    setMessage("Полив выполнен. Следи за каждым 5-секундным шагом.", "ok");
  }

  function harvest(index) {
    const bed = beds[index];

    if (bed.stage !== STAGES.G4) {
      setMessage("Собирать нечего: цветы ещё не готовы.", "warn");
      return;
    }

    score += POINTS_PER_FLOWER;
    bed.stage = STAGES.EMPTY;
    bed.watered = false;

    scoreEl.textContent = String(score);
    renderBed(index);
    pulseBed(index);
    setMessage(`Собрано! +${POINTS_PER_FLOWER} очков.`, "ok");
  }

  function cut(index) {
    const bed = beds[index];

    if (bed.stage !== STAGES.WILTED) {
      setMessage("Срезать можно только завявшие растения.", "warn");
      return;
    }

    bed.stage = STAGES.EMPTY;
    bed.watered = false;
    renderBed(index);
    pulseBed(index);
    setMessage("Завявшее растение срезано. Можно сажать заново.", "ok");
  }

  function onBedAction(index) {
    if (!running) return;

    if (selectedTool === TOOLS.SEEDS) return plant(index);
    if (selectedTool === TOOLS.WATER) return water(index);
    if (selectedTool === TOOLS.HARVEST) return harvest(index);
    if (selectedTool === TOOLS.CUT) return cut(index);

    // Рука: умное действие
    const bed = beds[index];
    if (bed.stage === STAGES.G4) return harvest(index);
    if (bed.stage === STAGES.WILTED) return cut(index);

    setMessage("Рука ничего не сделает. Выбери семена/лейку, или собери/срежь.", "warn");
  }

  function nextStage(stage) {
    if (stage === STAGES.G1) return STAGES.G2;
    if (stage === STAGES.G2) return STAGES.G3;
    if (stage === STAGES.G3) return STAGES.G4;
    return stage;
  }

  function growthTick() {
    let anyChange = false;

    for (let i = 0; i < beds.length; i += 1) {
      const bed = beds[i];

      if (bed.stage === STAGES.EMPTY || bed.stage === STAGES.WILTED) continue;

      const isEarly = bed.stage === STAGES.G1 || bed.stage === STAGES.G2;
      const isLate = bed.stage === STAGES.G3 || bed.stage === STAGES.G4;

      if (bed.watered) {
        const prev = bed.stage;
        bed.stage = nextStage(bed.stage);
        bed.watered = false;

        if (bed.stage !== prev) {
          anyChange = true;
          renderBed(i);
          pulseBed(i);
        }
        continue;
      }

      if (isEarly) {
        continue;
      }

      if (isLate) {
        bed.stage = STAGES.WILTED;
        bed.watered = false;
        anyChange = true;
        renderBed(i);
      }
    }

    if (anyChange) {
      setMessage("Прошло 5 секунд: проверь грядки. Без воды поздние фазы вянут.", "warn");
    } else {
      setMessage("Прошло 5 секунд: рост зависит от полива каждой грядки.", "");
    }
  }

  function onToolClick(e) {
    const btn = e.target.closest(".gh__tool");
    if (!btn) return;
    setSelectedTool(btn.dataset.tool);
  }

  function onBedsClick(e) {
    const bedBtn = e.target.closest(".gh__bed");
    if (!bedBtn) return;
    const index = Number(bedBtn.dataset.bed);
    if (!Number.isFinite(index)) return;
    onBedAction(index);
  }

  // ==================== ПРИВЯЗКА СОБЫТИЙ ====================

  startBtn.addEventListener("click", startGame);
  restartBtn.addEventListener("click", startGame);
  
  closeBtn.addEventListener("click", () => {
    // Закрываем модаль и возвращаемся на стартовый экран
    modal.hidden = true;
    gameWrap.hidden = true;
    startScreen.hidden = false;
  });

  toolsWrap.addEventListener("click", onToolClick);
  bedsGrid.addEventListener("click", onBedsClick);

  // ==================== ИНИЦИАЛИЗАЦИЯ ====================

  // Инициальное состояние - только инициализируем данные, видимость уже установлена в HTML
  beds = makeBeds();
  renderAll();
  
  // HTML уже содержит правильные атрибуты hidden:
  // - ghStartScreen (видимый по умолчанию, БЕЗ hidden)
  // - ghGame hidden
  // - ghModal hidden
}

// Инициализируем всё при загрузке DOM
document.addEventListener("DOMContentLoaded", function() {
  // Инициализируем игру
  initGreenhouseGame();
  
  // Инициализируем остальные компоненты
  initSwiper();
  initAccordions();
  initRevealAnimations();
  initBackToTop();
  initScrollSpy();
  initGSAPAnimations();
  
  // Re-create Lucide icons
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    try {
      lucide.createIcons();
    } catch (e) {
      console.log('Lucide re-initialization skipped');
    }
  }
});

// ==========================================
// WINDOW LOAD - Re-create icons
// ==========================================

// Re-initialize icons after window load
window.addEventListener('load', () => {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        try {
            lucide.createIcons();
        } catch (e) {
            console.log('Lucide final initialization skipped');
        }
    }
});

// ========== ANALYTICS ==========
window.addEventListener("load", () => {
  setTimeout(loadYandexMetrika, 3000);
  setTimeout(loadGTM, 4000);
});

function loadYandexMetrika() {
  (function (m, e, t, r, i, k, a) {
    m[i] =
      m[i] ||
      function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) return;
    }
    (k = e.createElement(t)),
      (a = e.getElementsByTagName(t)[0]),
      (k.async = 1),
      (k.src = r),
      a.parentNode.insertBefore(k, a);
  })(
    window,
    document,
    "script",
    "https://mc.yandex.ru/metrika/tag.js",
    "ym"
  );

  ym(16707172, "init", {
    webvisor: true,
    clickmap: true,
    accurateTrackBounce: true,
    trackLinks: true,
  });
}