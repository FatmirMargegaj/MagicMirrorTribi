Module.register("events2", {
	defaults: {
		textTest: "HAHA",
		updateInterval: 600000,
	},


	// Start des Moduls
	start: function () {
		console.log("Modul " + this.name + " gestartet.");
		this.apiData = [];
		this.getData();
		setInterval(() => {
			this.getData();
		}, this.config.updateInterval);
	},


	getData: function () {
		const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
		const url = "https://www.treibhausluzern.ch/jsonapi";

		fetch(proxyUrl + url)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP-Fehler! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				console.log("Daten erfolgreich abgerufen:", data);

				this.apiData = (data || []).slice(0, 5);
				if (!this.hidden) {
					this.updateDom();
					console.log("DOM wurde updated")
				} else {
					console.warn("Modul ist versteckt, DOM wird nicht aktualisiert.");
				}
			})
			.catch((error) => {
				console.error("Fehler beim Abrufen der Daten:", error);
			});
	},


	getDom: function () {
		console.log("getDom")
		const wrapper = document.createElement("div");

		if (!this.apiData || this.apiData.length === 0) {
			wrapper.textContent = "Lade Events...";
			return wrapper;
		}

		this.apiData.forEach((event) => {
			const eventTitle = event.title || "Kein Titel";
			const eventDate = event?.field_event_date || "Unbekanntes Datum";
			const eventTime = event?.field_event_doors || "Keine Zeit angegeben";
			const eventPrice = event?.field_event_price || "Preis unbekannt";

			const eventWrapper = document.createElement("div");
			eventWrapper.className = "event-wrapper";

			eventWrapper.className = "event";

			const titleElement = document.createElement("h2");
			titleElement.textContent = eventTitle;

			const dateElement = document.createElement("p");
			dateElement.textContent = `Datum: ${eventDate}`;

			const timeElement = document.createElement("p");
			timeElement.textContent = `Einlass: ${eventTime}`;

			const priceElement = document.createElement("p");
			priceElement.textContent = `Preis: ${eventPrice}`;

			const line = document.createElement("hr");

			eventWrapper.appendChild(titleElement);
			eventWrapper.appendChild(dateElement);
			eventWrapper.appendChild(timeElement);
			eventWrapper.appendChild(priceElement);
			eventWrapper.appendChild(line);

			wrapper.appendChild(eventWrapper);
		});

		return wrapper;
	},
});
