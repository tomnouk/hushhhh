import { writable } from "svelte/store";

export const user = writable(null)
export const tokens = writable(1);

export const geolocationEnabled = writable(false);
export const microphoneEnabled = writable(false);

export const geolocation = writable({
  latitude: null,
  longitude: null
});

export function updateGeolocation(coords) {
  geolocation.set({
    latitude: coords.latitude,
    longitude: coords.longitude
  });
}

export function toggleGeolocation() {
  geolocationEnabled.update(enabled => {
    const newState = !enabled;
    localStorage.setItem('geolocationEnabled', JSON.stringify(newState));
    if (!newState) {
      geolocation.set({ latitude: null, longitude: null });
    }
    return newState;
  });
}

export function toggleMicrophone() {
  microphoneEnabled.update(enabled => {
    const newState = !enabled;
    localStorage.setItem('microphoneEnabled', JSON.stringify(newState));
    return newState;
  });
}
