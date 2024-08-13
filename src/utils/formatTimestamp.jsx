import { formatDistanceToNow, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export const formatTimestamp = (date) => {
  return formatDistanceToNow(parseISO(date), { addSuffix: true, locale: es });
};
