import type { Book } from "../models/book.model.js";
import { v4 as uuid } from "uuid";

export function parseCSV(csvText: string) {
  const lines = csvText.trim().split("\n");
  lines.shift(); // remove header

  const validBooks: Book[] = [];
  const errors: { row: number; error: string }[] = [];

  lines.forEach((line, index) => {
    const rowNumber = index + 2;
    const columns = line.split(",").map(col => col.trim());

    const title = (columns.length >= 4 ? columns[1] : columns[0]) || "";
    const author = (columns.length >= 4 ? columns[2] : columns[1]) || "";
    const publishedYearRaw = (columns.length >= 4 ? columns[3] : columns[2]) || "";

    if (!title) {
      errors.push({ row: rowNumber, error: "Title is missing" });
      return;
    }

    if (!author) {
      errors.push({ row: rowNumber, error: "Author is missing" });
      return;
    }

    const publishedYear = Number(publishedYearRaw);
    if (!publishedYearRaw || isNaN(publishedYear)) {
      errors.push({ row: rowNumber, error: "Invalid publishedYear" });
      return;
    }

    validBooks.push({
      id: uuid(),
      title: title.trim(),
      author: author.trim(),
      publishedYear
    });
  });

  return { validBooks, errors };
}
