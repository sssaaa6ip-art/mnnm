let books = [];

const library = document.getElementById("library");
const searchInput = document.getElementById("search");

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    books = data;
    renderBooks();
  });

function renderBooks() {
  library.innerHTML = "";

  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(searchInput.value.toLowerCase().trim())
  );

  filtered.forEach(book => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${book.title}</h3>

      <div class="buttons">
        <a href="${book.link}" target="_blank">فتح</a>
      </div>
    `;

    library.appendChild(card);
  });
}

/* Search */
searchInput.addEventListener("input", renderBooks);

/* Share */
function share(title, url) {
  if (navigator.share) {
    navigator.share({ title, url });
  } else {
    navigator.clipboard.writeText(url);
    alert("تم نسخ الرابط ✅");
  }
}