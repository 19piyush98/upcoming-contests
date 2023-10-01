const loadingElement = document.getElementById("loading");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const sortByName = document.getElementById("sortByName");
const sortByStartTime = document.getElementById("sortByStartTime");

let contestsData = [];

function renderContests(data) {
  let ihtml = "";
  for (const item of data) {
    const randomImageSeed = Math.floor(Math.random() * 1000);
    const imageUrl = `https://picsum.photos/300/200?random=${randomImageSeed}`;

    ihtml += `
      <div class="card contest-card mb-1">
        <img src="${imageUrl}" class="card-img-top" alt="Contest Image">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.status}</p>
          <p>Starts at: ${item.start_time}</p>
          <p>Ends at: ${item.end_time}</p>
          <a href="${item.url}" class="button-right btn btn-primary">Visit Page</a>
        </div>
      </div>`;
  }

  cardContainer.innerHTML = ihtml;
}

function fetchDataAndRender() {
  loadingElement.style.display = "block";
  let url = "https://kontests.net/api/v1/all";
  let response = fetch(url);

  response
    .then((v) => {
      return v.json();
    })
    .then((v) => {
      contestsData = v;
      renderContests(v);

      loadingElement.style.display = "none";
    })
    .catch((error) => {
      console.error("Error fetching data:", error);

      loadingElement.style.display = "none";
    });
}

fetchDataAndRender();

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filteredContests = contestsData.filter(item => item.name.toLowerCase().startsWith(searchTerm));

  if (filteredContests.length === 0) {
    renderNoItemsFoundMessage();
  } else {
    renderContests(filteredContests);
  }
});

function renderNoItemsFoundMessage() {
  cardContainer.innerHTML = '<p class="text-center mt-3">No items found.</p>';
  loadingElement.style.display = "none";
}



sortByName.addEventListener('click', () => {
  contestsData.sort((a, b) => a.name.localeCompare(b.name));
  renderContests(contestsData);
});

sortByStartTime.addEventListener('click', () => {
  contestsData.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
  renderContests(contestsData);
});
