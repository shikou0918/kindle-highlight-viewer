<template>
  <v-card class="pa-4">
    <v-card-title class="text-h5 mb-4">
      <v-icon class="mr-2">mdi-file-upload</v-icon>
      My Clippings.txt をアップロード
    </v-card-title>
    <v-card-text>
      <v-file-input
        :model-value="file ? [file] : []"
        label="ファイルを選択"
        accept=".txt"
        prepend-icon="mdi-paperclip"
        show-size
        :loading="loading"
        :error-messages="errorMessage || undefined"
        @update:model-value="handleFileSelect"
      />
      <v-alert v-if="hasMessage" :type="errorMessage ? 'error' : 'success'" class="mt-4">
        {{ errorMessage || successMessage }}
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useHighlightStore } from '@/stores/highlightStore';

const highlightStore = useHighlightStore();

const file = ref<File | null>(null);
const errorMessage = ref<string>('');
const successMessage = ref<string>('');
const loading = ref(false);

const hasMessage = computed(() => !!errorMessage.value || !!successMessage.value);

const handleFileSelect = async (files: File[] | null) => {
  const selectedFile = files && files.length > 0 ? files[0] : null;
  
  if (!selectedFile) {
    file.value = null;
    return;
  }

  file.value = selectedFile;
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
