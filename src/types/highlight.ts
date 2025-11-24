export interface Highlight {
  id: string;
  bookTitle: string;
  author: string;
  content: string;
  location: string;
  pageNumber?: string;
  dateAdded: Date;
  note?: string;
}

export interface Book {
  title: string;
  author: string;
  highlights: Highlight[];
}

export interface ParsedClippings {
  books: Book[];
  totalHighlights: number;
}
