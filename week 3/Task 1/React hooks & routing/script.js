const modal = document.querySelector("#modal");
document.querySelector("#open-modal").addEventListener("click", () => modal.showModal());
document.querySelector("#close-modal").addEventListener("click", () => modal.close());
document.querySelector("#cancel-modal").addEventListener("click", () => modal.close());
document.querySelector("#confirm-modal").addEventListener("click", () => modal.close());
