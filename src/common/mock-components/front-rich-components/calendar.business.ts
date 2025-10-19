export const getCurrentMonthDays = (
  currentDate: Date
): { month: number; year: number; days: Date[][] } => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];

  for (let i = 0; i < startingDayOfWeek; i++) {
    currentWeek.push(null as any);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(new Date(year, month, day));
  }

  while (currentWeek.length < 7) {
    currentWeek.push(null as any);
  }
  weeks.push(currentWeek);

  return { month, year, days: weeks };
};

export const calculatePreviousMonth = (currentDate: Date): Date => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  if (month === 0) {
    return new Date(year - 1, 11, 1);
  }
  return new Date(year, month - 1, 1);
};

export const calculateNextMonth = (currentDate: Date): Date => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  if (month === 11) {
    return new Date(year + 1, 0, 1);
  }
  return new Date(year, month + 1, 1);
};
