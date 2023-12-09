export function formatDate(date: string) {
  const dateFormat = new Date(date);
  let diffMs = new Date().getTime() - new Date(date).getTime();

  let diffSec = Math.round(diffMs / 1000);
  let diffMin = Math.round(diffSec / 60);
  let diffHour = Math.round(diffMin / 60);
  let diffDays = Math.round(diffHour / 24);
  let diffMonths = Math.round(diffDays / 30);

  // форматирование
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("ru-RU", options);

  if (diffSec < 1) {
    return "прямо сейчас";
  } else if (diffMin < 1) {
    return `${diffSec} сек. назад`;
  } else if (diffHour < 1) {
    return `${diffMin} мин. назад`;
  } else if (diffDays < 1) {
    return `${diffHour} час. назад`;
  } else if (diffMonths < 1) {
    return `${diffDays} дн. назад`;
  } else {
    return formatter.format(dateFormat);
  }
}
