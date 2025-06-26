let onUnauthorizedCallback: (() => void) | null = null;

export function setUnauthorizedHandler(callback: () => void) {
  onUnauthorizedCallback = callback;
}

export function handleUnauthorized() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentUser");
  if (onUnauthorizedCallback) {
    onUnauthorizedCallback();
  }
}
