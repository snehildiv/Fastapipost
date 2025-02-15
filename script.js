// Image Slider Functionality
const prev_btn = document.querySelector('.control_prev'); /* array contain all images */
const next_btn = document.querySelector('.control_next'); /* array contain all images */
const imgs = document.querySelectorAll('.slider-images'); // Ensure to have an image container with class 'slider-images'

let n = 0;
function changeSlide() {
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.display = 'none';
    }
    imgs[n].style.display = 'block'; /* n != 0, display block */
}
changeSlide();

prev_btn.addEventListener('click', (e) => {
    if (n > 0) {
        n--;
    } else {
        n = imgs.length - 1;
    }
    changeSlide();
});

next_btn.addEventListener('click', (e) => {
    if (n < imgs.length - 1) {
        n++;
    } else {
        n = 0;
    }
    changeSlide();
});

// Horizontal Scroll on Wheel Event
const scrollContainer = document.querySelectorAll('.products');
for (const item of scrollContainer) {
    item.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        item.scrollLeft += evt.deltaY;
    });
}

// FastAPI Backend Integration

// Fetch all items
async function getItems() {
    try {
        const response = await fetch("http://127.0.0.1:8000/items/");
        const data = await response.json();
        console.log("Items:", data);
        displayItems(data);  // Display items on the page
    } catch (error) {
        console.error("Error fetching items:", error);
    }
}

// Create a new item
async function createItem() {
    const itemData = {
        name: document.getElementById('item-name').value,
        description: document.getElementById('item-description').value,
        price: parseFloat(document.getElementById('item-price').value)
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/items/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData)
        });

        const data = await response.json();
        console.log("Item Created:", data);
        alert("Item created successfully!");
    } catch (error) {
        console.error("Error creating item:", error);
    }
}

// Display all items
function displayItems(items) {
    const itemList = document.getElementById("item-list");
    itemList.innerHTML = ""; // Clear the list before appending new items

    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;

        // Optionally, add buttons for editing and deleting items
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteItem(item._id);  // Pass item ID for deletion

        li.appendChild(deleteBtn);
        itemList.appendChild(li);
    });
}

// Delete an item
async function deleteItem(itemId) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/items/${itemId}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        console.log("Item Deleted:", data);
        alert("Item deleted successfully!");
        getItems();  // Refresh the items list after deletion
    } catch (error) {
        console.error("Error deleting item:", error);
    }
}

// Initialize the app by fetching items when the page loads
document.addEventListener("DOMContentLoaded", () => {
    getItems(); // Fetch and display the items when the page loads
});
