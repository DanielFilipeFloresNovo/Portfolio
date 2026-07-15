const menuButton = document.querySelector("#menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
const mobileLinks = mobileMenu.querySelectorAll("a");

function toggleMobileMenu() {
    const isOpen = !mobileMenu.classList.contains("hidden");

    mobileMenu.classList.toggle("hidden");
    menuButton.setAttribute("aria-expanded", String(!isOpen));
}

menuButton.addEventListener("click", toggleMobileMenu);

mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

const skillCards = [...document.querySelectorAll(".skill-card")];

const skillsModal = document.querySelector("#skills-modal");
const skillStage = document.querySelector("#skill-stage");

const skillClose = document.querySelector("#skill-close");
const skillBackdrop = document.querySelector("#skills-modal-backdrop");

const skillPrev = document.querySelector("#skill-prev");
const skillNext = document.querySelector("#skill-next");

const skillPrevMobile = document.querySelector("#skill-prev-mobile");
const skillNextMobile = document.querySelector("#skill-next-mobile");

let activeSkillIndex = 0;
let skillAnimationRunning = false;
let currentViewerCard = null;
let openingCard = null;
let openingIcon = null;

function removeViewerInteractions(card) {
    card.removeAttribute("data-skill-index");
    card.removeAttribute("type");

    card.classList.remove(
        "skill-card",
        "hover:-translate-y-1",
        "hover:border-cyan/40",
        "hover:border-blue-400/40",
        "hover:border-purple-400/40",
        "hover:border-orange-400/40",
        "duration-300"
    );

    const openText = card.querySelector("p.mt-auto");

    if (openText) {
        openText.remove();
    }
}

const skillViewerData = [
    {
        title: "Programming",
        eyebrow: "Languages and software development",
        description:
            "Programming languages used across software engineering, algorithms, automation, system-level work and academic development.",
        icon: `
    <svg
        viewBox="0 0 24 24"
        class="h-6 w-6"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        aria-hidden="true"
    >
        <path d="M8 9l-4 3 4 3"></path>
        <path d="M16 9l4 3-4 3"></path>
        <path d="M14 5l-4 14"></path>
    </svg>
`,
        accentText: "text-cyan",
        accentBorder: "border-cyan/25",
        accentBg: "bg-cyan/5",
        glow: "bg-cyan/10",

        visual: `
            <div class="skill-visual skill-visual-code">
                <div class="skill-code-header">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div class="skill-code-body">
                    <div class="skill-code-line code-line-one"></div>
                    <div class="skill-code-line code-line-two"></div>
                    <div class="skill-code-line code-line-three"></div>
                    <div class="skill-code-line code-line-four"></div>
                    <div class="skill-code-line code-line-five"></div>
                </div>

                <div class="skill-code-symbol">&lt;/&gt;</div>
            </div>
        `,

        chips: [
            "C",
            "Java",
            "C#",
            "Python",
            "JavaScript",
            "TypeScript",
            "Assembly",
            "Prolog",
        ],

        bullets: [
            "Application development",
            "Algorithms and problem solving",
            "Automation and scripting",
        ],

        sideTitle: "Where I use it",

        sideText:
            "Used in academic projects, backend logic, simulation, low-level programming and software experimentation.",

        highlights: [
            "Structured problem solving",
            "Cross-paradigm development",
            "Strong engineering foundation",
        ],
    },

    {
        title: "Databases",
        eyebrow: "Data persistence and integration",
        description:
            "Relational and document-based database technologies used to model, query and persist structured information across software systems.",
        icon: `
    <svg
        viewBox="0 0 24 24"
        class="h-6 w-6"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        aria-hidden="true"
    >
        <ellipse cx="12" cy="5" rx="7" ry="3"></ellipse>
        <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"></path>
        <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"></path>
    </svg>
`,
        accentText: "text-emerald-300",
accentBorder: "border-emerald-400/25",
accentBg: "bg-emerald-400/5",
glow: "bg-emerald-500/10",

        visual: `
            <div class="skill-visual skill-visual-database">
                <div class="database-stack database-stack-back">
                    <div></div>
                    <span></span>
                </div>

                <div class="database-stack database-stack-middle">
                    <div></div>
                    <span></span>
                </div>

                <div class="database-stack database-stack-front">
                    <div></div>
                    <span></span>
                </div>

                <div class="database-connection connection-one"></div>
                <div class="database-connection connection-two"></div>

                <span class="database-label database-label-sql">
                    SQL
                </span>

                <span class="database-label database-label-data">
                    DATA
                </span>
            </div>
        `,

        chips: [
            "MySQL",
            "PostgreSQL",
            "SQL Server",
            "Oracle SQL",
            "MongoDB",
        ],

        bullets: [
            "Data modeling",
            "Persistence and querying",
            "System integration",
        ],

        sideTitle: "What I focus on",

        sideText:
            "I use databases to support application logic, industrial data flows, information consistency and scalable persistence.",

        highlights: [
            "Relational thinking",
            "Structured storage",
            "Integration support",
        ],
    },

    {
        title: "Web Development",
        eyebrow: "Front-end, back-end and 3D",
        description:
            "Technologies used to build interfaces, web applications, API-driven systems and interactive digital experiences for complete products.",
        icon: `
    <svg
        viewBox="0 0 24 24"
        class="h-6 w-6"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        aria-hidden="true"
    >
        <rect x="3" y="4" width="18" height="16" rx="1"></rect>
        <path d="M3 8h18"></path>
        <path d="M7 6h.01"></path>
        <path d="M10 6h.01"></path>
        <path d="M13 6h.01"></path>
    </svg>
`,
        accentText: "text-purple-300",
        accentBorder: "border-purple-400/25",
        accentBg: "bg-purple-400/5",
        glow: "bg-purple-500/10",

        visual: `
            <div class="skill-visual skill-visual-web">
                <div class="web-window">
                    <div class="web-window-header">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <div class="web-window-content">
                        <div class="web-sidebar">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <div class="web-main">
                            <div class="web-title"></div>

                            <div class="web-text-line"></div>

                            <div class="web-grid">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="web-orbit"></div>
                <div class="web-orbit-dot"></div>
            </div>
        `,

        chips: [
            "HTML",
            "CSS",
            "React",
            "Angular",
            "Node.js",
            "Three.js",
        ],

        bullets: [
            "Responsive interfaces",
            "API integration",
            "Interactive web experiences",
        ],

        sideTitle: "Typical use cases",

        sideText:
            "This is where engineering and visual thinking connect most directly, from structured interfaces to dynamic and interactive experiences.",

        highlights: [
            "UI implementation",
            "Client and server logic",
            "Interactive visual experiences",
        ],
    },

    {
        title: "Tools & Platforms",
        eyebrow: "Development workflow and delivery",
        description:
            "Tools and platforms used throughout development, from coding and version control to automation, deployment and system integration.",
        icon: `
    <svg
        viewBox="0 0 24 24"
        class="h-6 w-6"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        aria-hidden="true"
    >
        <path d="M14.7 6.3a4 4 0 0 0-5 5L4 17l3 3 5.7-5.7a4 4 0 0 0 5-5l-2.5 2.5-3-3z"></path>
    </svg>
`,
        accentText: "text-orange-300",
        accentBorder: "border-orange-400/25",
        accentBg: "bg-orange-400/5",
        glow: "bg-orange-500/10",

        visual: `
            <div class="skill-visual skill-visual-tools">
                <div class="tool-node tool-node-center">
                    ✦
                </div>

                <div class="tool-node tool-node-one">
                    Git
                </div>

                <div class="tool-node tool-node-two">
                    API
                </div>

                <div class="tool-node tool-node-three">
                    .NET
                </div>

                <div class="tool-node tool-node-four">
                    Docker
                </div>

                <div class="tool-line tool-line-one"></div>
                <div class="tool-line tool-line-two"></div>
                <div class="tool-line tool-line-three"></div>
                <div class="tool-line tool-line-four"></div>
            </div>
        `,

        chips: [
            "Docker",
            "Git",
            "REST APIs",
            "UML",
            "Visual Studio",
            ".NET",
            "Linux",
            "n8n",
        ],

        bullets: [
            "Development workflow",
            "Modeling and architecture",
            "Automation and integration",
        ],

        sideTitle: "How I use them",

        sideText:
            "These tools support implementation, collaboration, deployment and technical organization across different types of projects.",

        highlights: [
            "Efficient workflow",
            "System integration",
            "Practical delivery",
        ],
    },
];

function createViewerCard(index) {
    const skill = skillViewerData[index];

    const chipsMarkup = skill.chips
        .map(
            (chip) => `
                <span
                    class="flex min-h-[54px] items-center justify-center border border-white/10 bg-white/[0.025] px-4 text-sm font-medium text-white/75 uppercase transition hover:border-white/20 hover:text-white"
                >
                    ${chip}
                </span>
            `,
        )
        .join("");

    const bulletsMarkup = skill.bullets
        .map(
            (item) => `
                <li class="flex items-start gap-3">
                    <span
                        class="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/55"
                    ></span>

                    <span>${item}</span>
                </li>
            `,
        )
        .join("");

    const highlightsMarkup = skill.highlights
        .map(
            (item) => `
                <div
                    class="border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-white/70 uppercase"
                >
                    ${item}
                </div>
            `,
        )
        .join("");

    const article = document.createElement("article");

    article.className =
        "skill-viewer-card skill-carousel-animate";

    article.innerHTML = `
        <div
            class="skill-detail-reveal grid min-h-full min-w-0 md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)]"
        >
            <div class="flex min-w-0 flex-col p-8 md:p-10">
                <div class="skill-reveal-item flex items-start gap-5">
                    <div
    class="skill-detail-icon flex h-14 w-14 shrink-0 items-center justify-center border ${skill.accentBorder} ${skill.accentBg} text-2xl ${skill.accentText}"
>
    ${skill.icon}
</div>

                    <div>
                        <p
                            class="text-[11px] font-bold ${skill.accentText} uppercase"
                        >
                            ${skill.eyebrow}
                        </p>

                        <h3
                            class="font-display mt-3 text-5xl leading-none font-black uppercase md:text-6xl"
                        >
                            ${skill.title}
                        </h3>
                    </div>
                </div>

                <p
                    class="skill-reveal-item mt-7 max-w-3xl text-base leading-8 text-muted"
                >
                    ${skill.description}
                </p>

                <div class="skill-reveal-item mt-7">
                    <p
                        class="mb-4 text-[11px] font-bold text-white/40 uppercase"
                    >
                        Main areas
                    </p>

                    <ul class="grid gap-3 text-sm leading-7 text-white/75">
                        ${bulletsMarkup}
                    </ul>
                </div>

                <div class="skill-reveal-item mt-7">
                    <p
                        class="mb-4 text-[11px] font-bold text-white/40 uppercase"
                    >
                        Technologies
                    </p>

                    <div class="grid grid-cols-2 gap-3">
                        ${chipsMarkup}
                    </div>
                </div>
            </div>

            <div
                class="relative flex min-w-0 flex-col justify-between border-t border-white/10 p-8 md:border-t-0 md:border-l md:border-white/10 md:p-10"
            >
                <div class="absolute inset-0">
                    <div
                        class="absolute -top-10 -right-10 h-44 w-44 rounded-full ${skill.glow} blur-3xl"
                    ></div>

                    <div
                        class="absolute bottom-10 left-10 h-24 w-24 rounded-full ${skill.glow} opacity-70 blur-2xl"
                    ></div>

                    <div
                        class="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent_45%,rgba(255,255,255,0.015))]"
                    ></div>
                </div>

                <div class="skill-reveal-item relative z-10">
                    ${skill.visual}

                    <p
                        class="mt-7 text-[11px] font-bold ${skill.accentText} uppercase"
                    >
                        ${skill.sideTitle}
                    </p>

                    <p class="mt-4 text-sm leading-7 text-white/70">
                        ${skill.sideText}
                    </p>
                </div>

                <div class="skill-reveal-item relative z-10 mt-8">
                    <p
                        class="mb-4 text-[11px] font-bold text-white/40 uppercase"
                    >
                        Highlights
                    </p>

                    <div class="grid gap-3">
                        ${highlightsMarkup}
                    </div>
                </div>
            </div>
        </div>
    `;

    return article;
}

function finishOpening(index) {
    skillStage.innerHTML = "";

    currentViewerCard = createViewerCard(index);
    currentViewerCard.classList.add("skill-carousel-current");

    skillStage.appendChild(currentViewerCard);

    const detailContent =
        currentViewerCard.querySelector(".skill-detail-reveal");

    const targetIcon =
        currentViewerCard.querySelector(".skill-detail-icon");

    if (!detailContent || !targetIcon || !openingIcon) {
        if (detailContent) {
            detailContent.classList.add("is-visible");
        }

        if (targetIcon) {
            targetIcon.classList.add("is-visible");
        }

        if (openingCard) {
            openingCard.remove();
            openingCard = null;
        }

        if (openingIcon) {
            openingIcon.remove();
            openingIcon = null;
        }

        skillAnimationRunning = false;
        return;
    }

    /*
     * O conteúdo passa primeiro para o seu estado final.
     * O ícone definitivo continua invisível, mas a sua
     * posição já pode ser calculada corretamente.
     */
    detailContent.classList.add("is-visible");

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const targetIconRect =
                targetIcon.getBoundingClientRect();

            openingIcon.classList.add(
                "is-moving-to-position",
            );

            openingIcon.style.top =
                `${targetIconRect.top}px`;

            openingIcon.style.left =
                `${targetIconRect.left}px`;

            openingIcon.style.width =
                `${targetIconRect.width}px`;

            openingIcon.style.height =
                `${targetIconRect.height}px`;

            if (openingCard) {
                openingCard.classList.add("is-morphing");
            }
        });
    });

    window.setTimeout(() => {
        /*
         * O ícone real aparece exatamente por baixo
         * do ícone animado.
         */
        targetIcon.classList.add("is-visible");

        if (openingIcon) {
            openingIcon.style.opacity = "0";
        }

        window.setTimeout(() => {
            if (openingIcon) {
                openingIcon.remove();
                openingIcon = null;
            }

            if (openingCard) {
                openingCard.remove();
                openingCard = null;
            }

            skillAnimationRunning = false;
        }, 180);
    }, 850);
}

function openSkillModal(index, sourceCard) {
    if (skillAnimationRunning) {
        return;
    }

    const sourceIcon =
        sourceCard.querySelector(".skill-card-icon");

    if (!sourceIcon) {
        return;
    }

    skillAnimationRunning = true;
    activeSkillIndex = index;

    const sourceRect = sourceCard.getBoundingClientRect();
    const iconRect = sourceIcon.getBoundingClientRect();

    openingCard = sourceCard.cloneNode(true);
    removeViewerInteractions(openingCard);

    openingCard.classList.add("skill-opening-card");

    openingCard.style.top = `${sourceRect.top}px`;
    openingCard.style.left = `${sourceRect.left}px`;
    openingCard.style.width = `${sourceRect.width}px`;
    openingCard.style.height = `${sourceRect.height}px`;

    openingIcon = sourceIcon.cloneNode(true);

    openingIcon.classList.remove("skill-card-icon");
    openingIcon.classList.add("skill-opening-icon");

    openingIcon.style.top = `${iconRect.top}px`;
    openingIcon.style.left = `${iconRect.left}px`;
    openingIcon.style.width = `${iconRect.width}px`;
    openingIcon.style.height = `${iconRect.height}px`;

    skillsModal.classList.remove("hidden");
    skillsModal.classList.add("flex");
    skillsModal.setAttribute("aria-hidden", "false");

    skillsModal.appendChild(openingCard);
    skillsModal.appendChild(openingIcon);

    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
        skillsModal.classList.add("is-visible");

        requestAnimationFrame(() => {
            const targetRect =
                skillStage.getBoundingClientRect();

            const centerIconSize = Math.min(
                132,
                targetRect.width * 0.18,
            );

            const centerIconLeft =
                targetRect.left +
                targetRect.width / 2 -
                centerIconSize / 2;

            const centerIconTop =
                targetRect.top +
                targetRect.height / 2 -
                centerIconSize / 2;

            openingCard.style.top = `${targetRect.top}px`;
            openingCard.style.left = `${targetRect.left}px`;
            openingCard.style.width = `${targetRect.width}px`;
            openingCard.style.height = `${targetRect.height}px`;

            openingCard.style.boxShadow =
                "0 35px 110px rgba(0, 0, 0, 0.58)";

            openingIcon.style.top = `${centerIconTop}px`;
            openingIcon.style.left = `${centerIconLeft}px`;
            openingIcon.style.width = `${centerIconSize}px`;
            openingIcon.style.height = `${centerIconSize}px`;
        });
    });

    window.setTimeout(() => {
        finishOpening(index);
    }, 1150);
}

function changeSkill(direction) {
    if (skillAnimationRunning || !currentViewerCard) {
        return;
    }

    skillAnimationRunning = true;

    const nextIndex =
        direction === "next"
            ? (activeSkillIndex + 1) % skillCards.length
            : (
                activeSkillIndex -
                1 +
                skillCards.length
            ) % skillCards.length;

    const outgoingCard = currentViewerCard;
    const incomingCard = createViewerCard(nextIndex);

    const incomingContent =
        incomingCard.querySelector(".skill-detail-reveal");

    const incomingIcon =
        incomingCard.querySelector(".skill-detail-icon");

    const incomingStartClass =
        direction === "next"
            ? "skill-carousel-enter-right"
            : "skill-carousel-enter-left";

    const outgoingEndClass =
        direction === "next"
            ? "skill-carousel-exit-left"
            : "skill-carousel-exit-right";

    incomingCard.classList.add(incomingStartClass);
    skillStage.appendChild(incomingCard);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            outgoingCard.classList.remove(
                "skill-carousel-current",
            );

            outgoingCard.classList.add(
                outgoingEndClass,
            );

            incomingCard.classList.remove(
                incomingStartClass,
            );

            incomingCard.classList.add(
                "skill-carousel-current",
            );

            if (incomingContent) {
                incomingContent.classList.add(
                    "is-visible",
                );
            }

            /*
             * Nas mudanças pelas setas não existe
             * um ícone separado a fazer a transição.
             */
            if (incomingIcon) {
                incomingIcon.classList.add(
                    "is-visible",
                );
            }
        });
    });

    window.setTimeout(() => {
        outgoingCard.remove();

        currentViewerCard = incomingCard;
        activeSkillIndex = nextIndex;
        skillAnimationRunning = false;
    }, 1120);
}

function closeSkillModal() {
    skillAnimationRunning = false;

    if (openingCard) {
        openingCard.remove();
        openingCard = null;
    }

    if (openingIcon) {
        openingIcon.remove();
        openingIcon = null;
    }

    skillsModal.classList.remove("is-visible");

    window.setTimeout(() => {
        skillsModal.classList.add("hidden");
        skillsModal.classList.remove("flex");
        skillsModal.setAttribute("aria-hidden", "true");

        skillStage.innerHTML = "";

        currentViewerCard = null;
        document.body.style.overflow = "";
    }, 700);
}

skillCards.forEach((card) => {
    card.addEventListener("click", () => {
        const index = Number(card.dataset.skillIndex);

        openSkillModal(index, card);
    });
});

skillNext.addEventListener("click", () => {
    changeSkill("next");
});

skillPrev.addEventListener("click", () => {
    changeSkill("previous");
});

skillNextMobile.addEventListener("click", () => {
    changeSkill("next");
});

skillPrevMobile.addEventListener("click", () => {
    changeSkill("previous");
});

skillClose.addEventListener("click", closeSkillModal);
skillBackdrop.addEventListener("click", closeSkillModal);

document.addEventListener("keydown", (event) => {
    if (skillsModal.classList.contains("hidden")) {
        return;
    }

    if (event.key === "Escape") {
        closeSkillModal();
    }

    if (event.key === "ArrowRight") {
        changeSkill("next");
    }

    if (event.key === "ArrowLeft") {
        changeSkill("previous");
    }
});

const projectCaseStudyLinks = document.querySelectorAll(
    ".project-case-study, .project-open-link",
);

const projectPageTransition = document.querySelector(
    "#project-page-transition",
);

let projectNavigationRunning = false;

projectCaseStudyLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (
            !href ||
            href.startsWith("http") ||
            href.startsWith("#") ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        if (document.startViewTransition) {
            return;
        }

        event.preventDefault();

        if (projectNavigationRunning) {
            return;
        }

        projectNavigationRunning = true;

        const card = link.closest(".project-card");

        if (card) {
            card.classList.add("is-leaving");
        }

        if (projectPageTransition) {
            projectPageTransition.classList.add("is-visible");
        }

        window.setTimeout(() => {
            window.location.href = href;
        }, 520);
    });
});