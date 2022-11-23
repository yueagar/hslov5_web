((w, d, $) => {
    const UI = new class {
        constructor() {
            this.versionInt = 0x64,
            this.versionString = "1.0.0",
            this.introShowed = !1,
            this.themesShowed = !1,
            this.introNav = d.getElementById("introNav"),
            this.themesNav = d.getElementById("themesNav"),
            this.intro = d.getElementById("introContainer"),
            this.themes = d.getElementById("themesContainer"),
            this.themeBoxes = d.getElementsByClassName("themeBox"),
            this.themeData = {};
        };
        init() {
			logger.log("Initialising script."),
            this.addEvent(),
            this.queryThemes(),
			this.showIntroContainer();
        };
        addEvent() {
			logger.log("Adding event listeners to elements."),
            this.introNav.addEventListener("click", () => {
                this.showIntroContainer();
            }),
            this.themesNav.addEventListener("click", () => {
                this.showThemesContainer();
            });
            for (let i = 0; i < this.themeBoxes.length; i++)
                this.themeBoxes[i].addEventListener("click", () => {
                    this.showThemeIntroBox(this.themeBoxes[i].id);
                });
            d.getElementById("install").addEventListener("click", () => {
                window.open("https://hslo.yueagar.ml/GetV5Here.html");
            });
            d.getElementById("themeIntroClose").addEventListener("click", () => {
                d.getElementById("themeIntroBox").style.opacity = 0;
                d.getElementById("themeIntroBox").style.visibility = "hidden";
            });
        };
        queryThemes() {
            const _this = this;
            $.ajax(`assets/themes.json?v=${Date.now()}`, {
                error: function() {
                    logger.error("Can not query themes!");
                },
                success: function(data) {
                    logger.log("Received themes data, handling...");
                    //logger.log(JSON.stringify(data));
                    _this.themeData = data;
                    for (let i = 0; i < _this.themeBoxes.length; i++)
                        try {
                            _this.themeBoxes[i].style.backgroundImage = `url(${_this.themeData[_this.themeBoxes[i].id].bgURL})`;
                        } catch(e) {};
                }
            });
        };
        showIntroContainer() {
            if (this.introShowed) return;
            this.intro.style.opacity = 1,
            this.intro.style.zIndex = 1000,
            this.themes.style.opacity = 0,
            this.themes.style.zIndex = 999,
            this.introNav.classList.add("active"),
            this.themesNav.classList.remove("active"),
            this.introShowed = !0,
            this.themesShowed = !1;
        };
        showThemesContainer() {
            if (this.themesShowed) return;
            this.themes.style.opacity = 1,
            this.themes.style.zIndex = 1000,
            this.intro.style.opacity = 0,
            this.intro.style.zIndex = 999,
            this.themesNav.classList.add("active"),
            this.introNav.classList.remove("active"),
            this.themesShowed = !0,
            this.introShowed = !1;
        };
        showThemeIntroBox(id) {
            const theme = this.themeData;
            let settingsHTML = ``;
            theme[id].settings.includes("Profiles") && (settingsHTML += `<i class="fas fa-user"></i>${theme[id].settings.includes("Settings") ? ", " : ""}`);
            theme[id].settings.includes("Settings") && (settingsHTML += `<i class="fas fa-cog"></i>${theme[id].settings.includes("Themes") ? ", " : ""}`);
            theme[id].settings.includes("Themes") && (settingsHTML += `<i class="fas fa-palette"></i>${theme[id].settings.includes("Hotkeys") ? ", " : ""}`);
            theme[id].settings.includes("Hotkeys") && (settingsHTML += `<i class="fas fa-keyboard"></i>${theme[id].settings.includes("Commands") ? ", " : ""}`);
            theme[id].settings.includes("Commands") && (settingsHTML += `<i class="fas fa-comments"></i>${theme[id].settings.includes("Mouse") ? ", " : ""}`);
            theme[id].settings.includes("Mouse") && (settingsHTML += `<i class="fas fa-mouse"></i>${theme[id].settings.includes("Extra") ? ", " : ""}`);
            theme[id].settings.includes("Extra") && (settingsHTML += `<i class="fas fa-plus"></i>`);
            d.getElementById("themeIntroBG").style.backgroundImage = `url("${theme[id].bgURL}")`;
            d.getElementById("name").innerHTML = `${theme[id].name}`;
            d.getElementById("author").innerHTML = `Author: ${theme[id].author}`;
            d.getElementById("settings").innerHTML = `Settings involved: ${settingsHTML}`;
            d.getElementById("themeIntroDL").onclick = () => {
                window.open(theme[id].dataPath);
            };
            d.getElementById("themeIntroBox").style.visibility = "visible";
            d.getElementById("themeIntroBox").style.opacity = 1;
        };
    };
    UI.init();
    w.UI = UI;
})(window, document, window.jQuery)
