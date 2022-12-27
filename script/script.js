// Todo App Critieria:
// Allow user to add a todo
// Show a list of all todos
// Allow user to complete todo and remove it from the list
// Keep the todo data persistent by storing it to localStorage
// Bonus:
// Show a total count of todos that have not been completed
////////
const toDoInput = document.querySelector("#toDoInput");
const toDoOl = document.querySelector("#toDoOl");
const toDoH2 = document.querySelector("#toDoH2");
let toDoCount = toDoOl.children.length;
const clearBtn = document.querySelectorAll(".clearBtn");

function storeData(item) {
  let itemArray = item;
  let toDoArray = JSON.parse(localStorage.getItem("toDoItems")) || [];
  toDoArray.push(itemArray);
  localStorage.setItem("toDoItems", JSON.stringify(toDoArray));
  printToDo();
  return;
}

function clear(e) {
  let clickedElement = +e.target.parentElement.getAttribute("data-num");
  let tempItems = JSON.parse(localStorage.getItem("toDoItems"));
  if (tempItems.length === 1) {
    localStorage.clear("toDoItems");
  } else {
    tempItems.splice(clickedElement - 1, 1);
    localStorage.setItem("toDoItems", JSON.stringify(tempItems));
  }
}

function printToDo() {
  toDoOl.classList.remove("hide");
  toDoOl.innerHTML = "";
  let toDoItems = JSON.parse(localStorage.getItem("toDoItems"));
  toDoItems.forEach((toDo, i) => {
    i++;
    toDoOl.insertAdjacentHTML(
      "beforeend",
      `<li data-num="${i}">${i}. ${toDo}<button class="clearBtn">Complete</button></li>`
    );
  });
  toDoCount = toDoItems.length;
}

function input() {
  if (toDoInput.value === "") {
    return;
  }
  let toDoItem = toDoInput.value;
  toDoInput.value = "";
  storeData(toDoItem);
}

//Event listeners
toDoInput.addEventListener("keydown", function (e) {
  let key = e.key;
  if (key === "Enter") {
    e.preventDefault();
    input();
  }
});
toDoOl.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    clear(e);
  }
  return;
});

let timer = setInterval(function () {
  if (localStorage.getItem("toDoItems") !== null) {
    toDoH2.innerHTML = `To do count: ${toDoCount}`;
    toDoOl.classList.remove("hide");
    printToDo();
  } else {
    toDoH2.innerHTML = "To do count...";
    toDoOl.classList.add("hide");
    toDoOl.innerHTML = "";
  }
}, 500);
