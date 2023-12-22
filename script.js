let siteName = document.querySelector(".site-name");
let siteUrl = document.querySelector(".site-url");
let submitBtn = document.querySelector(".submit");
let sitesList = document.querySelector("tbody");
let deleteBtn = document.querySelector(".delete");
let modal = document.querySelector(".modal-dialog");
let sitesArr = [];

// Display Bookmarks
let display = () => {
  sitesList.innerHTML = "";
  for (let i = 0; i < sitesArr.length; i++) {
    sitesList.innerHTML += `<tr class="fw-semibold">
    <td scope="row">${i + 1}</td>
    <td>${sitesArr[i].name}</td>
    <td>
        <a class="btn btn-success" href="${sitesArr[i].url}" target="_blank">
            <i class="fa-solid fa-eye"></i>
            <span class="ps-1">Visit</span></a>
    </td>
    <td>
        <button class="delete btn btn-danger" data-index="${i}">
            <i class="fa-solid fa-trash" data-index="${i}"></i>
            <span class="ps-1" data-index="${i}">Delete</span></button>
    </td>
</tr>`;
  }
};

// Display previous bookmarks if exist
if (localStorage.getItem("sites")) {
  sitesArr = JSON.parse(window.localStorage.getItem("sites"));
  display();
}

// Add new bookmark
submitBtn.addEventListener("click", () => {
  let site = {
    name: siteName.value,
    url: siteUrl.value,
  };

  if (validateUrl(site.url)) {
    sitesArr.push(site);
    clearInputs();
    window.localStorage.setItem("sites", JSON.stringify(sitesArr));
    display();
  } else {
    showErrorModal();
  }
});

// Validate URL
let validateUrl = (url) => {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
};

// Show error modal
let showErrorModal = () => {
  setTimeout(() => {
    modal.classList.add("show-modal");
  });
  setTimeout(() => {
    modal.classList.remove("show-modal");
  }, 2000);
};

// Clear inputs after submission
let clearInputs = () => {
  siteName.value = "";
  siteUrl.value = "";
};

// Delete Bookmark
document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("delete") ||
    e.target.parentElement.classList.contains("delete")
  ) {
    sitesArr.splice(e.target.dataset.index, 1);
    window.localStorage.setItem("sites", JSON.stringify(sitesArr));
    display();
  }
});
