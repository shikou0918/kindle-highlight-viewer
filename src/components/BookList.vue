<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-book-multiple</v-icon>
      書籍一覧
      <v-spacer />
      <v-chip color="primary" class="ml-2">{{ books.length }}冊</v-chip>
    </v-card-title>
    <v-card-text>
      <v-list v-if="books.length > 0">
        <v-list-item
          v-for="book in books"
          :key="book.title"
          :title="book.title"
          :subtitle="`${book.author} - ${book.highlights.length}件のハイライト`"
          @click="$emit('selectBook', book)"
        >
          <template #prepend>
            <v-icon>mdi-book-open-variant</v-icon>
          </template>
          <template #append>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-list-item>
      </v-list>
      <v-alert v-else type="info" variant="tonal">
        ハイライトデータがありません。ファイルをアップロードしてください。
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Book } from '@/types/highlight';

defineProps<{
  books: Book[];
}>();

defineEmits<{
  selectBook: [book: Book];
}>();
</script>
