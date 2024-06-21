document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menu = document.getElementById("menu");
  const menuOpen = document.querySelector(".sidebar-menu");
  const menuClose = document.getElementById("btn_Navclose");
  const navItems = document.querySelectorAll(".nav-item");
  const header = document.getElementById("header");
  const root = document.getElementById("root");
  let backToTopAdded = false;

  // Create back-to-top button
  const backToTop = document.createElement("a");
  backToTop.className = "back-to-top";
  backToTop.href = "#";
  backToTop.innerHTML = `
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M6 17.59L7.41 19 12 14.42 16.59 19 18 17.59l-6-6z"></path>
      <path d="M6 11l1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z"></path>
    </svg>`;

  // Create fast-scroll menu
  const fastScroll = document.createElement("ul");
  fastScroll.className = "fast-scroll";
  const items = ["1", "2", "3"];
  items.forEach((itemText, index) => {
    const li = document.createElement("li");
    li.className = "fast-item";
    const h3 = document.createElement("h3");
    h3.textContent = itemText;
    li.appendChild(h3);
    li.addEventListener("click", () => {
      scrollToImage(index + 1);
    });
    fastScroll.appendChild(li);
  });

  function scrollToImage(index) {
    const articleItems = document.querySelectorAll(".blog-item");
    if (index >= 1 && index <= articleItems.length) {
      const targetArticle = articleItems[index - 1];
      const imageDiv = targetArticle.querySelector(".image");
      if (imageDiv) {
        const headerHeight = header.offsetHeight;
        const targetPosition =
          imageDiv.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    }
  }

  menuOpen.addEventListener("click", () => {
    menu.classList.add("menu-active");
    body.classList.add("overflow-hidden");
    navItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
      item.classList.add("fly-in");
    });
  });

  menuClose.addEventListener("click", () => {
    menu.classList.remove("menu-active");
    body.classList.remove("overflow-hidden");
    navItems.forEach((item) => {
      item.classList.remove("fly-in");
    });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200 && !backToTopAdded) {
      root.appendChild(fastScroll);
      root.appendChild(backToTop);
      backToTopAdded = true;
      header.classList.add("fixed");
    } else if (window.scrollY <= 200 && backToTopAdded) {
      root.removeChild(fastScroll);
      root.removeChild(backToTop);
      backToTopAdded = false;
      header.classList.remove("fixed");
    }
  });

  backToTop.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
