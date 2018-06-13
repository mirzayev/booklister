// function createTodoItem(title) {
//   const checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   checkbox.className = "checkbox";
//   const label = document.createElement("label");
//   label.innerText = title;
//   label.className = "title";
//   const editInput = document.createElement("input");
//   editInput.type = "text";
//   editInput.className = "text-field";
//   const editButton = document.createElement("button");
//   editButton.innerText = "Edit";
//   editButton.className = "edit";
//   const deleteButton = document.createElement("button");
//   deleteButton.innerText = "Delete";
//   deleteButton.className = "delete";
//   const listItem = document.createElement("li");
//   listItem.className = "todo-item";
//   listItem.appendChild(checkbox);
//   listItem.appendChild(label);
//   listItem.appendChild(editInput);
//   listItem.appendChild(editButton);
//   listItem.appendChild(deleteButton);
//   console.log(listItem);
//   bindEvents(listItem);
//   return listItem;
// }
// function bindEvents(todoItem) {
//   const checkbox = todoItem.querySelector(".checkbox");
//   const editButton = todoItem.querySelector("button.edit");
//   const deleteButton = todoItem.querySelector("button.delete");

//   checkbox.addEventListener("change", toggleTodoItem);
//   editButton.addEventListener("click", editTodoItem);
//   deleteButton.addEventListener("click", deleteTodoItem);
// }

// function addTodoItem(event) {
//   event.preventDefault();
//   if (addInput.value === "") {
//     return alert("Fill the blank");
//   }
//   const todoItem = createTodoItem(addInput.value);
//   todoList.appendChild(todoItem);
// }

// function toggleTodoItem(e) {
//   const listItem = this.parentNode;
//   listItem.classList.toggle("complete");
// }
// function editTodoItem() {
//   const listItem = this.parentNode;
//   const title = listItem.querySelector(".title");
//   const editInput = listItem.querySelector(".text-dfield");
//   const isEditing = listItem.classList.contains("editing");
//   if (isEditing) {
//     title.innerText = editInput.value;
//     this.innerText = "edit";
//   } else {
//     editInput.value = title.innerText;
//     this.innerText = "save";
//   }
//   listItem.classList.toggle("editing");
// }
// function deleteTodoItem(e) {
//   const listItem = this.parentNode;
//   todoList.removeChild(listItem);
// }
// const todoForm = document.getElementById("todo-form");
// const addInput = document.getElementById("add-input");
// const todoList = document.getElementById("todo-list");
// const todoItems = document.querySelectorAll(".todo-item");

// todoForm.addEventListener("submit", addTodoItem);
const input = document.querySelector("#add-book");
const btn = document.querySelector("#btn");
const bookList = document.querySelector("#books-list");
const searchField = document.querySelector("#search-field");
//-----------------------------------------------------------
btn.addEventListener("click", e => {
	let book = {
		name: input.value
	};
	let regex = new RegExp(/^\s*$/, "");

	if (input.value.match(regex)) {
		alert("fill");
		return false;
	}
	e.preventDefault();
	if (localStorage.getItem("books") === null) {
		let books = [];
		books.unshift(book);
		localStorage.setItem("books", JSON.stringify(books));
	} else {
		let books = JSON.parse(localStorage.getItem("books"));
		books.unshift(book);
		localStorage.setItem("books", JSON.stringify(books));
	}
	input.value = "";
	fetchBooks();
});

function fetchBooks() {
	bookList.innerHTML = "";
	let books = JSON.parse(localStorage.getItem("books"));
	books.forEach(el => {
		bookList.innerHTML += `
		<li class="list-book">${el.name}<i class="fas fa-trash"></i>
		</li>
	`;
	});
}

bookList.addEventListener("click", e => {
	let books = JSON.parse(localStorage.getItem("books"));
	if (e.target.classList.contains("fas")) {
		for (let i = 0; i < books.length; i++) {
			const el = books[i];
			if (el.name == e.target.parentElement.innerText) {
				books.splice(i, 1);
			}
		}
	}
	localStorage.setItem("books", JSON.stringify(books));
	fetchBooks();
});

//   Creatin new list item-----------------------------------------------

// btn.addEventListener("click", e => {
//   e.preventDefault();
//   const li = document.createElement("li");
//   const newBtn = document.createElement("button");
//   const textNode = document.createTextNode(input.value);
//   const output = document.querySelector("#output");
//   li.setAttribute("class", "list-book");
//   newBtn.setAttribute("class", "btn btn-del");
//   newBtn.textContent = "del";
//   li.appendChild(textNode);
//   li.appendChild(newBtn);
//   let regex = /^\s*/;
//   if (input.value.match(regex)) {
//     output.textContent = "You must add book title :)";
//     input.style.border = "1px solid red";
//   } else {
//     bookList.appendChild(li);
//     input.value = "";
//     output.textContent = "";
//   }
// });

//   Removing list item--------------------------------------------------

// bookList.addEventListener("click", e => {
//   if (e.target.className == "btn btn-del") {
//     bookList.removeChild(e.target.parentNode);
//   }
// });

//   Custom search for list item-----------------------------------------

searchField.addEventListener("keyup", () => {
	const allLi = bookList.children;
	const searchValue = searchField.value.toLowerCase();
	Array.from(allLi).forEach(el => {
		if (el.textContent.toLowerCase().indexOf(searchValue) !== -1) {
			el.style.display = "block";
		} else {
			el.style.display = "none";
		}
	});
});
