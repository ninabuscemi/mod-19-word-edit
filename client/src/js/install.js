const butInstall = document.getElementById('buttonInstall');

// Stores the deferred (post poned) prompt event
let deferredPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
// Prevents the default behavior
  event.preventDefault();

// Store the event object in the deferredPrompt variable
  deferredPrompt = event;

// Show the install button
  butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
// Listener for the click event
butInstall.addEventListener('click', async () => {
// Check if the deferredPrompt variable is set
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's choice
    const { outcome } = await deferredPrompt.userChoice;

    // If the user accept the installation
    if (outcome === 'accepted') {
        // Reset the deferredPrompt variable
      deferredPrompt = null;
    }
  }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {

// Log a message to the console that PWA installed
  console.log('PWA installed successfully!');
});
