<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      <v-btn icon variant="text" @click="$emit('back')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <div class="ml-2">
        <div class="text-h6">{{ book.title }}</div>
        <div class="text-caption text-medium-emphasis">{{ book.author }}</div>
      </div>
      <v-spacer />
      <v-chip color="primary">{{ book.highlights.length }}件</v-chip>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="highlight in book.highlights" :key="highlight.id" class="mb-4">
          <v-card variant="outlined" class="pa-4">
            <div class="text-body-1 mb-2">{{ highlight.content }}</div>
            <v-divider class="my-2" />
            <div class="d-flex justify-space-between align-center text-caption text-medium-emphasis">
              <div>
                <v-icon size="small" class="mr-1">mdi-map-marker</v-icon>
                位置: {{ highlight.location }}
                <span v-if="highlight.pageNumber" class="ml-2">
                  <v-icon size="small" class="mr-1">mdi-file-document</v-icon>
                  ページ: {{ highlight.pageNumber }}
                </span>
              </div>
              <div>
                <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                {{ formatDate(highlight.dateAdded) }}
              </div>
            </div>
            <div v-if="highlight.note" class="mt-2 pa-2 bg-amber-lighten-5 rounded">
              <v-icon size="small" class="mr-1">mdi-note-text</v-icon>
              {{ highlight.note }}
            </div>
          </v-card>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Book } from '@/types/highlight';
import { formatDate } from '@/utils/dateFormatter';

defineProps<{
  book: Book;
}>();

defineEmits<{
  back: [];
}>();
</script>
