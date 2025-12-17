function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}

// copy "Viimased" into mobile sidebar
document.addEventListener("DOMContentLoaded", () => {
  const source = document.getElementById("latestSidebar");
  const target = document.getElementById("sidebar");

  if (source && target) {
    target.innerHTML = source.innerHTML;
  }
});
