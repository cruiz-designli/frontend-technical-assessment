import { describe, expect, it } from "vitest";

import { cleanImageUrl } from "../utils/cleanImgUrls";

describe("cleanImageUrl", () => {
  it("should remove backslashes at the beginning and end of the URL", () => {
    const result = cleanImageUrl("\\path/to/image.jpg\\");
    expect(result).toBe("path/to/image.jpg");
  });

  it("should remove square brackets at the beginning and end of the URL", () => {
    const result = cleanImageUrl("[path/to/image.jpg]");
    expect(result).toBe("path/to/image.jpg");
  });

  it("should remove both backslashes and square brackets from the beginning and end", () => {
    const result = cleanImageUrl("[\\path/to/image.jpg\\]");
    expect(result).toBe("path/to/image.jpg");
  });

  it("should leave the URL unchanged if there are no brackets or backslashes at the edges", () => {
    const result = cleanImageUrl("path/to/image.jpg");
    expect(result).toBe("path/to/image.jpg");
  });
});
