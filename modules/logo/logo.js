Module.register("logo", {
    defaults: {
        imagePath: "/images/logo.png",
    },

    // Start des Moduls
    start: function () {
        console.log("Modul " + this.name + " gestartet.");
    },

    getDom: function () {
        const wrapper = document.createElement("div");
        wrapper.className = "logo-wrapper";

        const image = document.createElement("img");
        image.src = this.file(this.config.imagePath);
        image.alt = "Logo";

        wrapper.appendChild(image);
        return wrapper;
    },

    getStyles: function () {
        return [this.file("logo.css")];
    }
});
