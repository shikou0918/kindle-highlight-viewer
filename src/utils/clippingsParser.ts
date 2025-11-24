import type { Highlight, Book, ParsedClippings } from '@/types/highlight';

export class ClippingsParser {
  private static SEPARATOR = '==========';

  /**
   * My Clippings.txtファイルをパースする
   */
  static parse(content: string): ParsedClippings {
    const entries = content.split(this.SEPARATOR).filter(entry => entry.trim());
    const highlightsMap = new Map<string, Highlight[]>();

    entries.forEach(entry => {
      const highlight = this.parseEntry(entry);
      if (highlight) {
        const key = `${highlight.bookTitle}|||${highlight.author}`;
        if (!highlightsMap.has(key)) {
          highlightsMap.set(key, []);
        }
        highlightsMap.get(key)!.push(highlight);
      }
    });

    const books: Book[] = Array.from(highlightsMap.entries()).map(([key, highlights]) => {
      const [title, author] = key.split('|||');
      return {
        title,
        author,
        highlights: highlights.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime()),
      };
    });

    return {
      books: books.sort((a, b) => a.title.localeCompare(b.title)),
      totalHighlights: entries.length,
    };
  }

  /**
   * 個別のエントリをパースする
   */
  private static parseEntry(entry: string): Highlight | null {
    const lines = entry.trim().split('\n').filter(line => line.trim());
    if (lines.length < 3) return null;

    try {
      // 1行目: タイトルと著者
      const titleLine = lines[0];
      const { bookTitle, author } = this.parseTitleLine(titleLine);

      // 2行目: 位置情報と日時
      const metaLine = lines[1];
      const { location, pageNumber, dateAdded } = this.parseMetaLine(metaLine);

      // 3行目以降: ハイライト本文
      const content = lines.slice(2).join('\n').trim();

      return {
        id: `${bookTitle}-${location}-${dateAdded.getTime()}`,
        bookTitle,
        author,
        content,
        location,
        pageNumber,
        dateAdded,
      };
    } catch (error) {
      console.error('Failed to parse entry:', error);
      return null;
    }
  }

  /**
   * タイトル行をパースする
   * 形式: "書籍名 (著者名)" または "書籍名"
   */
  private static parseTitleLine(line: string): { bookTitle: string; author: string } {
    const match = line.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
    if (match) {
      return {
        bookTitle: match[1].trim(),
        author: match[2].trim(),
      };
    }
    return {
      bookTitle: line.trim(),
      author: 'Unknown',
    };
  }

  /**
   * メタ情報行をパースする
   * 形式: "- Your Highlight on Location 123-456 | Added on 2024年1月1日月曜日 12:00:00"
   */
  private static parseMetaLine(line: string): {
    location: string;
    pageNumber?: string;
    dateAdded: Date;
  } {
    // 位置情報の抽出
    const locationMatch = line.match(/Location\s+(\d+(?:-\d+)?)/i);
    const pageMatch = line.match(/page\s+(\d+)/i);

    // 日時の抽出
    const dateMatch = line.match(/Added on\s+(.+)$/i);
    const dateAdded = dateMatch ? this.parseDate(dateMatch[1]) : new Date();

    return {
      location: locationMatch ? locationMatch[1] : 'Unknown',
      pageNumber: pageMatch ? pageMatch[1] : undefined,
      dateAdded,
    };
  }

  /**
   * 日付文字列をパースする
   */
  private static parseDate(dateStr: string): Date {
    // Kindleの日付形式に対応
    // 例: "2024年1月1日月曜日 12:00:00" または "Monday, January 1, 2024 12:00:00 PM"
    try {
      return new Date(dateStr);
    } catch {
      return new Date();
    }
  }
}
