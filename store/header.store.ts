import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";
import { HolidayType } from "~/types/HolidayType";

export const useHeaderStore = defineStore({
  id: "header",
  state: () => ({
    holiday: {} as HolidayType,
  }),
  getters: {
    getHoliday(): HolidayType {
      return this.holiday;
    },
  },
  actions: {
    setHoliday(holiday: HolidayType) {
      this.holiday = holiday;
    },
    async getRandomHoliday(): Promise<void> {
      const holiday: AxiosResponse<HolidayType> = await axios.get(
        "https://za-halyavoi.ru/api/holiday/random",
      );
      this.setHoliday(holiday.data);
    },
  },
});
