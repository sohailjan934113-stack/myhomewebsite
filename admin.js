import { auth } from "./firebase.js";
import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    }
});
console.log("MyHome Admin Panel is working!");

// Load saved properties from Local Storage
let properties = [];

try {
    const savedProperties = localStorage.getItem("properties");

    if (savedProperties !== null) {
        const parsedProperties = JSON.parse(savedProperties);

        if (Array.isArray(parsedProperties)) {
            properties = parsedProperties;
        }
    } else {
        // Default properties for the first visit
        properties = [
            {
                id: 1,
                name: "Green Villa",
                price: 5000000,
                location: "Peshawar",
                image: ""
            },
            {
                id: 2,
                name: "Luxury House",
                price: 8500000,
                location: "Islamabad",
                image: ""
            },
            {
                id: 3,
                name: "Modern Home",
                price: 6500000,
                location: "Lahore",
                image: ""
            }
        ];

        saveProperties();
    }
} catch (error) {
    console.error("Could not load properties:", error);
}

// Save properties
function saveProperties() {
    localStorage.setItem("properties", JSON.stringify(properties));
}

// Find form and list
const propertyForm = document.getElementById("propertyForm");
const propertyList = document.getElementById("propertyList");

// Add property
if (propertyForm) {
    propertyForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const houseName =
            document.getElementById("houseName").value.trim();

        const housePrice =
            Number(document.getElementById("housePrice").value);

        const houseLocation =
            document.getElementById("houseLocation").value.trim();

        if (!houseName || !houseLocation || housePrice <= 0) {
            showToast("Please enter valid property details.");
            return;
        }

        properties.push({
            id: Date.now(),
            name: houseName,
            price: housePrice,
            location: houseLocation,
            image: ""
        });

        saveProperties();
        displayProperties();
        propertyForm.reset();

        showToast("Property added successfully!");
    });
}

// Display properties
function displayProperties() {
    if (!propertyList) return;

    propertyList.innerHTML = "";

    properties.forEach(function(property) {
        const card = document.createElement("div");
        card.className = "property-item";

        const name = document.createElement("h3");
        name.textContent = property.name;

        const price = document.createElement("p");
        price.textContent =
            "Price: Rs. " +
            Number(property.price).toLocaleString("en-PK");

        const location = document.createElement("p");
        location.textContent = "Location: " + property.location;
        const editButton = document.createElement("button");
editButton.textContent = "Edit Property";
editButton.className = "edit-property-btn";

editButton.addEventListener("click", function() {
    const newName = prompt("Enter new property name:", property.name);

    if (newName === null || newName.trim() === "") {
        return;
    }

    const newPrice = prompt("Enter new price:", property.price);

    if (newPrice === null || newPrice.trim() === "") {
        return;
    }

    const newLocation = prompt(
        "Enter new location:",
        property.location
    );

    if (newLocation === null || newLocation.trim() === "") {
        return;
    }

    const priceNumber = Number(newPrice);

    if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
        showToast("Please enter a valid price.");
        return;
    }

    property.name = newName.trim();
    property.price = priceNumber;
    property.location = newLocation.trim();

    saveProperties();
    displayProperties();
    showToast("Property updated successfully!");
});

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Property";
        deleteButton.className = "delete-property-btn";

        deleteButton.addEventListener("click", function() {
            if (confirm("Delete " + property.name + "?")) {
                properties = properties.filter(function(item) {
                    return item.id !== property.id;
                });

                saveProperties();
                displayProperties();
                showToast("Property deleted successfully!");
            }
        });

        card.append(name, price, location, editButton, deleteButton);
        propertyList.appendChild(card);
    });
}

// Show properties when page opens
displayProperties();

// Success popup
function showToast(message) {
    const oldToast = document.querySelector(".success-toast");

    if (oldToast) {
        oldToast.remove();
    }

    const toast = document.createElement("div");
    toast.className = "success-toast";

    const icon = document.createElement("span");
    icon.className = "toast-icon";
    icon.textContent = "✓";

    const text = document.createElement("div");
    text.className = "toast-text";

    const title = document.createElement("strong");
    title.textContent = "Success!";

    const description = document.createElement("p");
    description.textContent = message;

    text.append(title, description);
    toast.append(icon, text);
    document.body.appendChild(toast);

    setTimeout(function() {
        toast.classList.add("toast-hide");

        setTimeout(function() {
            toast.remove();
        }, 300);
    }, 3000);
}
