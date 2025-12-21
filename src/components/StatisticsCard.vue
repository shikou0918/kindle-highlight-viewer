<template>
  <v-card class="pa-4">
    <v-card-title class="text-h6">統計情報</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <div class="text-center">
            <div class="text-h4 text-primary">{{ totalBooks }}</div>
            <div class="text-caption text-medium-emphasis">書籍数</div>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="text-center">
            <div class="text-h4 text-primary">{{ totalHighlights }}</div>
            <div class="text-caption text-medium-emphasis">ハイライト数</div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  totalBooks: number;
  totalHighlights: number;
}>();
</script>

