export const cleanImageUrl = (url: string): string => {
  return url.replace(/^[\\[\]]+|[\\[\]]+$/g, ""); // Remove [ ] and \ from the start and end
};
