const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content-item");

//listener
tabs.forEach(tab => tab.addEventListener("click", selectItem));

function cleanBorders() {
    tabs.forEach(tab => tab.classList.remove("tab-border"))
}

function cleanShow() {
    contents.forEach(content => content.classList.remove("show"))
}

function selectItem(e) {
    cleanBorders();
    cleanShow();
    this.classList.add("tab-border");
    //grab right tab content
    console.log(this.id);
    let contentItem = document.querySelector(`#${this.id}-content`);
    console.log(contentItem)
    contentItem.classList.add("show");
}