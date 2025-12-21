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
        <statistics-card
          :total-books="highlightStore.totalBooks"
          :total-highlights="highlightStore.totalHighlights"
        />
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
import StatisticsCard from '@/components/StatisticsCard.vue';
import type { Book } from '@/types/highlight';

const highlightStore = useHighlightStore();
const selectedBook = ref<Book | null>(null);

const selectBook = (book: Book) => {
  selectedBook.value = book;
};
</script>
