export const suspend = (duration: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, duration));
