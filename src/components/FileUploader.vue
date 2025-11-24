<template>
  <v-card class="pa-4">
    <v-card-title class="text-h5 mb-4">
      <v-icon class="mr-2">mdi-file-upload</v-icon>
      My Clippings.txt をアップロード
    </v-card-title>
    <v-card-text>
      <v-file-input
        v-model="file"
        label="ファイルを選択"
        accept=".txt"
        prepend-icon="mdi-paperclip"
        show-size
        :loading="loading"
        :error-messages="errorMessage"
        @change="handleFileChange"
      />
      <v-alert v-if="errorMessage" type="error" class="mt-4">
        {{ errorMessage }}
      </v-alert>
      <v-alert v-if="successMessage" type="success" class="mt-4">
        {{ successMessage }}
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useHighlightStore } from '@/stores/highlightStore';

const highlightStore = useHighlightStore();

const file = ref<File[]>([]);
const errorMessage = ref<string>('');
const successMessage = ref<string>('');
const loading = ref(false);

const handleFileChange = async () => {
  if (!file.value || file.value.length === 0) {
    return;
  }

  const selectedFile = file.value[0];
  errorMessage.value = '';
  successMessage.value = '';
  loading.value = true;

  try {
    await highlightStore.loadClippingsFile(selectedFile);
    successMessage.value = `${highlightStore.totalBooks}冊の本から${highlightStore.totalHighlights}件のハイライトを読み込みました`;
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'ファイルの読み込みに失敗しました';
  } finally {
    loading.value = false;
  }
};
</script>
