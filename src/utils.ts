import { TextLayoutLine } from "react-native";

export const getTwoLargestLengths = (lines: TextLayoutLine[]) => {
  return lines.reduce(
    ([max1, max2], line) => {
      const len = line.text.length;
      if (len > max1) {
        return [len, max1]; // Shift max1 to max2
      } else if (len > max2) {
        return [max1, len];
      }
      return [max1, max2];
    },
    [0, 0] // Start with two zeros
  );
};
