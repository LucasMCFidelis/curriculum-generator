export function handleNavigation(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top,
    behavior: "smooth",
  });

  return element
}
