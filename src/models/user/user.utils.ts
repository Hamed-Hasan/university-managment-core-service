let currentId = 0;

export const generateId = (): string => {
  currentId++;
  return currentId.toString().padStart(5, '0');
};
