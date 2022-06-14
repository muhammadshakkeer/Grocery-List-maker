const form = document.getElementById("shop-form");
const itemName = document.getElementById("item-name");
const itemQty = document.getElementById("item-qty");
const list = document.getElementById("list");
const alert = document.querySelector(".alert");
// console.log(submit)

const items = JSON.parse(window.localStorage.getItem("items"));

// create tableRow FUNCTION
const createTR = (id, name, qty) => {
  tr = document.createElement("tr");
  tr.setAttribute("id", id);
  tr.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${qty}</td>
        <td> <button class= "btn btn-danger">remove</button> </td>
  `;
  list.appendChild(tr);
};
// empty message function
const emptyMessage = () => {
  h1 = document.createElement("h1");
  h1.innerText = "Empty, list out your grocerry";
  list.appendChild(h1);
};

// when window loading , display this stored items on below
window.addEventListener("DOMContentLoaded", () => {
  // console.log(items)
  items.forEach((item) => {
    const { id, name, qty } = item;
    createTR(id, name, qty);
  });

  if (items.length == 0) {
    emptyMessage();
  }

  let notDisplayBtn = (resetBtn.style.display = "none");
      document.querySelector("thead").style.display = "none";
});

// message function for submission whether it is success or failed
const showMessage = (messagedVeriable, addedClass, innerMassage) => {
  messagedVeriable.classList.add(addedClass);
  messagedVeriable.innerText = innerMassage;

  // message will be remove after 3sec
  setTimeout(() => {
    messagedVeriable.classList.remove(addedClass);
    messagedVeriable.innerText = "";
  }, 3000);
};

// Adding Items
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (itemName.value !== "" && itemQty.value !== "") {
    const id = new Date().getMilliseconds() * Math.floor(Math.random() * 1000);

    let name = itemName.value;
    let qty = itemQty.value;
    createTR(id, name, qty);

    showMessage(alert, "alert-success", "item added successfull");

    // LOCALSTORGE :- storing every submited data to it
    let items;
    items = window.localStorage.getItem("items")
      ? JSON.parse(window.localStorage.getItem("items"))
      : [];
    items.push({ id: id, name: itemName.value, qty: itemQty.value });
    // add item to LOCAL STORAGE
    window.localStorage.setItem("items", JSON.stringify(items));
    // add an item to SESSION STORAGE
    window.sessionStorage.setItem("sessionItems",JSON.stringify(items))

    // reset value after submit
    itemName.value = "";
    itemQty.value = "";

    itemName.focus();
  } else {
    showMessage(
      alert,
      "alert-danger",
      "Please enter anything or fill completly"
    );
  }
});

// DELETE item
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    //  console.log( localStorage.removeItem(items))
    let pressedBtnId = e.target.parentElement.parentElement.getAttribute("id");
    console.log(items)
    let newItem = items.filter((item) =>  item.id!= pressedBtnId
    );
    console.log(newItem);
    window.localStorage.setItem("items", JSON.stringify(newItem));

    e.target.parentElement.parentElement.remove();
    const deleteMessage = document.getElementById("delete-message");
    showMessage(deleteMessage, "alert-danger", "One Item deleted");

    if (list.childElementCount == 0) {
      console.log("list is empty");
      showMessage(deleteMessage, "alert-danger", "list is empty");
      emptyMessage();
      let notDisplayBtn = (resetBtn.style.display = "none");
      document.querySelector("thead").style.display = "none";
    }
  }
});

// RESET BTN
const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", (e) => {
  window.localStorage.clear('items')
  list.innerHTML = "";

  resetBtn.innerText = "";
  let notDisplayBtn = (resetBtn.style.display = "none");
  itemName.value = "";
  itemQty.value = "";
  emptyMessage();
  itemName.focus();
});
