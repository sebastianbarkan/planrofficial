import { createContext } from "react";

export const TripDetails = createContext({
  location: [],
  setLocation: () => {},
  dates: [],
  setDates: () => {},
  days: [],
  setDays: () => {},
});
