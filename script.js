
/* ===== 1. Mobile Navigation Menu ===== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

/* ===== 2. Property Filters ===== */

const filterButtons = document.querySelectorAll(".filter");
const propertyCards = document.querySelectorAll(".property-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedType = button.dataset.filter;

        filterButtons.forEach(function (item) {
            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        propertyCards.forEach(function (card) {
            const propertyType = card.dataset.type;

            if (
                selectedType === "all" ||
                propertyType === selectedType
            ) {
                card.hidden = false;
            } else {
                card.hidden = true;
            }
        });
    });
});


/* ===== 3. Contact Form ===== */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (event) {
        if (!contactForm.checkValidity()) {
            event.preventDefault();
            contactForm.reportValidity();
            return;
        }

        formMessage.textContent =
            "Sending your enquiry...";

        // Let the browser submit the form to FormSubmit.
    });
}


/* ===== 4. Automatic Copyright Year ===== */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

console.log("Luxe Homes website is working!");


/* ===== Professional Property Details Popup ===== */

const detailsButtons = document.querySelectorAll(".details-link");
const propertyModal = document.getElementById("propertyModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");
const modalFeatures = document.getElementById("modalFeatures");
const modalEnquire = document.getElementById("modalEnquire");

detailsButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();

        const card = button.closest(".property-card");
        const title = card.querySelector("h3").textContent.trim();
        const description = card.querySelector(
            ".property-description"
        ).textContent.trim();
        const features = card.querySelectorAll(
            ".property-features li"
        );

        modalTitle.textContent = title;
        const image = card.querySelector("img");

modalImage.src = image.src;
modalImage.alt = image.alt;
        modalDescription.textContent = description;
        modalFeatures.replaceChildren();

        features.forEach(function (feature) {
            const item = document.createElement("li");
            item.textContent = feature.textContent.trim();
            modalFeatures.appendChild(item);
        });

        modalEnquire.onclick = function () {
            document.getElementById("contact").scrollIntoView({
                behavior: "smooth"
            });
            propertyModal.classList.remove("active");
            propertyModal.setAttribute("aria-hidden", "true");
        };

        propertyModal.classList.add("active");
        propertyModal.setAttribute("aria-hidden", "false");
    });
});

function closePropertyModal() {
    propertyModal.classList.remove("active");
    propertyModal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closePropertyModal);

propertyModal.addEventListener("click", function (event) {
    if (event.target === propertyModal) {
        closePropertyModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" &&
        propertyModal.classList.contains("active")) {
        closePropertyModal();
    }
});
