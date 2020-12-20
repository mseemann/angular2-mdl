export const stringifyValue = (value: any): string => {
  switch (typeof value) {
    case 'number':
      return String(value);
    case 'object':
      return JSON.stringify(value);
    default:
      return (!!value) ? String(value) : '';
  }
};
