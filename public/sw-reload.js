(() => {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  let reloaded = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (reloaded) {
      return;
    }
    reloaded = true;
    location.reload();
  });
})();
