import { parseCSV } from "./csv.untils.js";

describe("parseCSV", () => {
  it("should parse a valid CSV with ID column", () => {
    const csv = `id,title,author,publishedYear
1,Atomic Habits,James Clear,2018`;
    const result = parseCSV(csv);
    
    expect(result.validBooks).toHaveLength(1);
    expect(result.validBooks[0]?.title).toBe("Atomic Habits");
    expect(result.validBooks[0]?.author).toBe("James Clear");
    expect(result.validBooks[0]?.publishedYear).toBe(2018);
    expect(result.errors).toHaveLength(0);
  });

  it("should parse a valid CSV without ID column", () => {
    const csv = `title,author,publishedYear
Deep Work,Cal Newport,2016`;
    const result = parseCSV(csv);
    
    expect(result.validBooks).toHaveLength(1);
    expect(result.validBooks[0]?.title).toBe("Deep Work");
    expect(result.validBooks[0]?.author).toBe("Cal Newport");
    expect(result.validBooks[0]?.publishedYear).toBe(2016);
    expect(result.errors).toHaveLength(0);
  });

  it("should report errors for invalid publishedYear", () => {
    const csv = `id,title,author,publishedYear
1,Atomic Habits,James Clear,InvalidYear`;
    const result = parseCSV(csv);
    
    expect(result.validBooks).toHaveLength(0);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]?.error).toBe("Invalid publishedYear");
  });

  it("should report errors for missing title", () => {
    const csv = `id,title,author,publishedYear
1,,James Clear,2018`;
    const result = parseCSV(csv);
    
    expect(result.validBooks).toHaveLength(0);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]?.error).toBe("Title is missing");
  });
});
