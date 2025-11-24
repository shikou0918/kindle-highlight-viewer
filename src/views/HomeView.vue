<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">
          <v-icon size="large" class="mr-2">mdi-book-open-page-variant</v-icon>
          Kindle Highlight Viewer
        </h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <file-uploader />
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title class="text-h6">統計情報</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div class="text-center">
                  <div class="text-h4 text-primary">{{ highlightStore.totalBooks }}</div>
                  <div class="text-caption text-medium-emphasis">書籍数</div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="text-center">
                  <div class="text-h4 text-primary">{{ highlightStore.totalHighlights }}</div>
                  <div class="text-caption text-medium-emphasis">ハイライト数</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="!selectedBook">
      <v-col cols="12">
        <book-list :books="highlightStore.books" @select-book="selectBook" />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12">
        <highlight-list :book="selectedBook" @back="selectedBook = null" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useHighlightStore } from '@/stores/highlightStore';
import FileUploader from '@/components/FileUploader.vue';
import BookList from '@/components/BookList.vue';
import HighlightList from '@/components/HighlightList.vue';
import type { Book } from '@/types/highlight';

const highlightStore = useHighlightStore();
const selectedBook = ref<Book | null>(null);

const selectBook = (book: Book) => {
  selectedBook.value = book;
};
</script>
