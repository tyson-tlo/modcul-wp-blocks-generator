const initializeFaqs = () => {
	const faqsSections = document.querySelectorAll(
		".sd-faqs__question-section",
	);

	faqsSections.forEach((section) => {
		const toggler = section.querySelector(".sd-faq-section-toggler");
		const question = section.querySelector(".sd-faqs__question-title");
		const content = section.querySelector(".sd-faqs__question-content");

		// Toggle the shown content (the questions answer)
		toggler.addEventListener("click", () => {
			content.classList.toggle("sd-active");
			toggler.classList.toggle("sd-active");
		});
		question?.addEventListener("click", () => {
			content.classList.toggle("sd-active");
			toggler.classList.toggle("sd-active");
		});
	});

	const categoryPills = document.querySelectorAll(
		"[data-sd-toggle='faq-category']",
	);

	categoryPills.forEach((pill) => {
		pill.addEventListener("click", () => {
			const pillStatus = pill.getAttribute("data-sd-selected");

			if (!pillStatus) {
				categoryPills.forEach((categoryPill) => {
					categoryPill.removeAttribute("data-sd-selected");
				});
				pill.setAttribute("data-sd-selected", "true");

				document
					.querySelectorAll("[data-sd-category-index]")
					.forEach((section) => {
						section.style.display = "none";
					});

				const categoryIndex = pill.getAttribute("data-sd-target-index");

				document.querySelector(
					`[data-sd-category-index="${categoryIndex}"]`,
				).style.display = "block";
			} else {
				pill.removeAttribute("data-sd-selected");

				document
					.querySelectorAll("[data-sd-category-index]")
					.forEach((section) => {
						section.style.display = "block";
					});
			}
		});
	});
};

export default initializeFaqs;
