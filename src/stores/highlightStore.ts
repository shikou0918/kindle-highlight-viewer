import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Book, Highlight } from '@/types/highlight';
import { ClippingsParser } from '@/utils/clippingsParser';
import { readFileAsText } from '@/utils/fileReader';

export const useHighlightStore = defineStore('highlight', () => {
  const books = ref<Book[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const totalHighlights = computed(() => {
    return books.value.reduce((sum, book) => sum + book.highlights.length, 0);
  });

  const totalBooks = computed(() => books.value.length);

  /**
   * My Clippings.txtファイルを読み込む
   */
  const loadClippingsFile = async (file: File): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      const content = await readFileAsText(file);
      const parsed = ClippingsParser.parse(content);
      books.value = parsed.books;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'ファイルの読み込みに失敗しました';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * 書籍でフィルタリング
   */
  const getBookByTitle = (title: string): Book | undefined => {
    return books.value.find(book => book.title === title);
  };

  /**
   * ハイライトを検索
   */
  const searchHighlights = (query: string): Highlight[] => {
    const lowerQuery = query.toLowerCase();
    const results: Highlight[] = [];

    books.value.forEach(book => {
      book.highlights.forEach(highlight => {
        if (
          highlight.content.toLowerCase().includes(lowerQuery) ||
          highlight.bookTitle.toLowerCase().includes(lowerQuery) ||
          highlight.author.toLowerCase().includes(lowerQuery)
        ) {
          results.push(highlight);
        }
      });
    });

    return results;
  };

  /**
   * データをクリア
   */
  const clearData = () => {
    books.value = [];
    error.value = null;
  };

  return {
    books,
    loading,
    error,
    totalHighlights,
    totalBooks,
    loadClippingsFile,
    getBookByTitle,
    searchHighlights,
    clearData,
  };
});
