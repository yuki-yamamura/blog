import dayjs from 'dayjs';

/**
 * Formats a date string into a specified template.
 * The default template is 'YYYY-MM-DD'.
 */
export const formatDate = (date: string, template: string = 'YYYY-MM-DD') => {
  return dayjs(date).format(template);
};
