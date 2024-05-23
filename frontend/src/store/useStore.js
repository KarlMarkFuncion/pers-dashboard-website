import { create } from "zustand";

const useStore = create((set) => ({
  persDevices: [],

  currentHeartrate: [],
  currentLocation: "",
  currentOxidation: [],
  currentPatient: "",
  currentUser: "",

  isLoggedIn: false,

  setPersDevices: (persDevices) => {set({ persDevices })},
  
  setCurrentHeartrate: (currentHeartrate) => {set({ currentHeartrate })},
  setCurrentLocation: (currentLocation) => {set({ currentLocation })},
  setCurrentOxidation: (currentOxidation) => {set({currentOxidation})},
  setCurrentPatient: (currentPatient) => {set({ currentPatient })},

  setCurrentUser: (currentUser) => {set({ currentUser })},

  setLoggedOut: () => set({ isLoggedIn: false }),
  setLoggedIn: () => set({ isLoggedIn: true }),
   
}));

export default useStore;
