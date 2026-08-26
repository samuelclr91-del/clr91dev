(() => {
    const translations = window.PAGE_TRANSLATIONS || {};
    const supported = Object.keys(translations);
    let currentLanguage = "en";

    function initialLanguage() {
        try {
            const saved = localStorage.getItem("clr91dev-site-language");
            if (supported.includes(saved)) return saved;
        } catch (_) {}

        const browserLanguage = (navigator.language || "en").toLowerCase();
        const shortLanguage = browserLanguage.split("-")[0];
        return supported.includes(shortLanguage) ? shortLanguage : "en";
    }

    function applyLanguage(language) {
        if (!supported.includes(language)) return;
        currentLanguage = language;
        document.documentElement.lang = language;

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.dataset.i18n;
            if (translations[language]?.[key]) {
                element.textContent = translations[language][key];
            }
        });

        document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
            const key = element.dataset.i18nAriaLabel;
            if (translations[language]?.[key]) {
                element.setAttribute("aria-label", translations[language][key]);
            }
        });

        document.querySelectorAll("[data-localized-image]").forEach((image) => {
            const localizedSource = image.dataset[`src${language[0].toUpperCase()}${language.slice(1)}`];
            if (localizedSource) image.src = localizedSource;
        });

        document.querySelectorAll("[data-lang]").forEach((button) => {
            const active = button.dataset.lang === language;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });

        const pageCopy = translations[language] || {};
        if (pageCopy["meta.title"]) {
            document.title = pageCopy["meta.title"];
        }
        if (pageCopy["meta.description"]) {
            const description = pageCopy["meta.description"];
            document.querySelector('meta[name="description"]')?.setAttribute("content", description);
            document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
        }
        if (pageCopy["meta.title"]) {
            document.querySelector('meta[property="og:title"]')?.setAttribute("content", pageCopy["meta.title"]);
        }

        try {
            localStorage.setItem("clr91dev-site-language", language);
        } catch (_) {}
    }

    document.querySelectorAll("[data-lang]").forEach((button) => {
        button.addEventListener("click", () => applyLanguage(button.dataset.lang));
    });

    applyLanguage(initialLanguage());

    const revealElements = document.querySelectorAll("[data-reveal]");
    if (revealElements.length) {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
            revealElements.forEach((element) => element.classList.add("is-visible"));
        } else {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

            revealElements.forEach((element) => observer.observe(element));
        }
    }
})();
