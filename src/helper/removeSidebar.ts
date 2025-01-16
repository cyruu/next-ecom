export const removeSidebar = () => {
  const sidebar = document.querySelector(".sidebar");
  const closeDiv = document.querySelector(".close-div");
  const body = document.querySelector("body");
  if (sidebar) {
    sidebar.classList.remove("showsidebar");
  }
  if (closeDiv) {
    closeDiv.classList.add("hidden");
  }
  body?.classList.remove("overflow-hidden");
};
