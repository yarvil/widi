const generateDays = () => {
  const days = [{ value: "", nameElement: "", disabled: true }];
  for (let day = 1; day <= 31; day++) {
    days.push({ value: day, nameElement: day });
  }
  return days;
};

const generateMonths = () => [
  { value: "", nameElement: "", disabled: true },
  { value: 1, nameElement: "Січень" },
  { value: 2, nameElement: "Лютий" },
  { value: 3, nameElement: "Березень" },
  { value: 4, nameElement: "Квітень" },
  { value: 5, nameElement: "Травень" },
  { value: 6, nameElement: "Червень" },
  { value: 7, nameElement: "Липень" },
  { value: 8, nameElement: "Серпень" },
  { value: 9, nameElement: "Вересень" },
  { value: 10, nameElement: "Жовтень" },
  { value: 11, nameElement: "Листопад" },
  { value: 12, nameElement: "Грудень" },
];

const generateYears = () => {
  const years = [{ value: "", nameElement: "", disabled: true }];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= currentYear - 100; year--) {
    years.push({ value: year, nameElement: year });
  }
  return years;
};

export const DAYS = generateDays();
export const MONTHS = generateMonths();
export const YEARS = generateYears();
