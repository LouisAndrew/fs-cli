export const getLast = (url: string) => {
  const splitted = url.split('/');
  return splitted[splitted.length - 1].replace('.git', '');
};
