const searchForm = document.getElementById("search-form");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", e => {
  const searchTerm = searchInput.value;
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  const searchLimit = document.querySelector("#limit").value;
  if (!searchTerm) {
    showMessage("Please add a search term", "alert-danger");
  } else {
    showMessage("Searching...", "alert-success");
  }
  searchReddit(searchTerm, searchLimit, sortBy);
  searchInput.value = "";
  e.preventDefault();
});

function showMessage(message, classname) {
  const div = document.createElement("div");
  div.className = `alert ${classname}`;
  div.appendChild(document.createTextNode(message));
  document
    .querySelector("#search-container")
    .insertAdjacentElement("afterBegin", div);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 2000);
}

function searchReddit(term, limit, sort) {
  fetch(
    `https://www.reddit.com/search.json?q=${term}&sort=${sort}&limit=${limit}`
  )
    .then(res => res.json())
    .then(data => data.data.children.map(data => data.data))
    .then(results => {
      console.log(results);
      let output = '<div class="card-columns">';
      results.forEach(post => {
        let image = post.preview
          ? post.preview.images[0].source.url
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRULJBJJoR07Nbm1Mci3jVWfp3_sy1B451B02vEdvYPafwTxBI3Xg";
        output += `
			<div class="card" style="width: 18rem;">
				<img class="card-img-top" src='${image}' >
				<div class="card-body">
					<h5 class="card-title mb-3">${post.title}</h5>
					<a href="${post.url}" class="btn btn-outline-info">Read more</a>
					<br>
					<hr>
					<span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
					<span class="badge badge-dark">Score: ${post.score}</span>
					
				</div>
			</div>
			`;
      });
      output += "</div>";
      document.querySelector("#results").innerHTML = output;
    })
    .catch(err => console.log(err));
}
