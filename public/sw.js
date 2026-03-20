self.addEventListener("push", function (event) {
  const data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      data: data.data
    })
  );

  // 🔊 reproducir sonido manual (hack)
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({ playSound: true });
    });
  });
});