export const cleanImageUrl = (url: string): string => {
  // Remove backslashes and unwanted array symbols at the start and end of the URL
  return url
    .replace(/\\/g, "/") // Replace backslashes with forward slashes
    .replace(/^[\[\]]+|[\[\]]+$/g, ""); // Remove array symbols [ ] from the beginning and end
};
