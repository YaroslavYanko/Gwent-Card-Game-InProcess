export const handleHoverCard = function (e) {
  const link = e.target;
  link.style.transition = "all 0.5s ease-in-out";
  link.classList.add("activeCard");
};

export const handlerOutCard = function (e) {
  const link = e.target;
  link.style.transition = "all 0.2s ease-in-out";
  link.classList.remove("activeCard");
};
