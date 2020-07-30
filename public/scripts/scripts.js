// import functions
import { populateUfs, getCities } from "./getLocation.js"

// get href
const { location: { pathname } } = window

// execute functions of index
if(pathname === '/' || pathname.includes('index')) {
  document
  .querySelector(".search-point")
  .addEventListener("click", () => {
    document
    .querySelector("#modal")
    .classList.remove('hide')
  });

document
  .querySelector(".close-search-point")
  .addEventListener("click", () => {
    document
    .querySelector("#modal")
    .classList.add('hide')
  });
}

// execute functions of create-point
if (pathname.includes('create-point')) {
  // populate ufs
  populateUfs();

  // change on select uf
  document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities);

  // set selected items
  const itemsToCollect = document
    .querySelectorAll(".items-grid li")

  for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
  }

  const colectedItems = document.querySelector("input[name=items")

  let selectedItems = []

  function handleSelectedItem(event) {
    const itemLi = event.target;
    const { id } = itemLi.dataset;

    itemLi.classList.toggle("selected")

    const alreadySelected = selectedItems.findIndex(item => item === id)

    if (alreadySelected >= 0) {
      selectedItems = selectedItems.filter(item => item !== id)
    } else {
      selectedItems.push(id)
    }

    colectedItems.value = selectedItems.sort()
  }
}

// execute functions of search results
if (pathname.includes('search')) {
  const buttonDelete = document.querySelector(".exclude")
  
  buttonDelete && buttonDelete.addEventListener("click", () => {
    window.location = `/search${window.location.search}&delete=${buttonDelete.getAttribute('data-id')}`
  });
}