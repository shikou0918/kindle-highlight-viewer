# Kindle Highlight Viewer

KindleのハイライトデータをWebブラウザで閲覧・管理するアプリケーションです。

## 機能

- `My Clippings.txt` ファイルのアップロードとパース
- 書籍ごとのハイライト一覧表示
- ハイライトの日時・位置情報表示
- レスポンシブデザイン対応

## 使い方

### 1. Kindleからハイライトデータを取得

**Kindle端末の場合:**
1. KindleをUSBケーブルでPCに接続
2. `documents/My Clippings.txt` ファイルをPCにコピー

**Kindle for PC/Macの場合:**
- Windowsの場合: `C:\Users\[ユーザー名]\Documents\My Kindle Content\My Clippings.txt`
- Macの場合: `~/Library/Containers/com.amazon.Kindle/Data/Library/Application Support/Kindle/My Clippings/My Clippings.txt`

### 2. アプリケーションを起動

```bash
yarn dev
```

ブラウザで `http://localhost:5173` が自動的に開きます。

### 3. ファイルをアップロード

1. アプリケーション画面で「ファイルを選択」ボタンをクリック
2. 取得した `My Clippings.txt` ファイルを選択
3. 自動的にファイルが解析され、書籍一覧が表示されます

### 4. ハイライトを閲覧

1. 書籍一覧から閲覧したい本をクリック
2. その本のハイライト一覧が表示されます
3. 各ハイライトには以下の情報が含まれます:
   - ハイライトした文章
   - ハイライトした日時
   - 位置情報（ページ番号やロケーション）
   - 追加したメモ（ある場合）

## 技術スタック

- **Vue 3** - フロントエンドフレームワーク
- **TypeScript** - 型安全な開発
- **Vuetify 3** - UIコンポーネントライブラリ
- **Pinia** - 状態管理
- **Vue Router** - ルーティング
- **Vite** - ビルドツール
- **Vitest** - テストフレームワーク

## プロジェクト構成

```
kindle-highlight-viewer/
├── src/
│   ├── components/          # Vueコンポーネント
│   │   ├── FileUploader.vue     # ファイルアップロードコンポーネント
│   │   ├── BookList.vue         # 書籍一覧コンポーネント
│   │   └── HighlightList.vue    # ハイライト詳細コンポーネント
│   ├── views/               # ページコンポーネント
│   │   └── HomeView.vue         # メインページ
│   ├── stores/              # Pinia ストア
│   │   └── highlightStore.ts    # ハイライトデータの状態管理
│   ├── types/               # TypeScript型定義
│   │   └── highlight.ts         # ハイライト関連の型定義
│   ├── utils/               # ユーティリティ
│   │   └── clippingsParser.ts   # My Clippings.txt パーサー
│   ├── router/              # Vue Router設定
│   │   └── index.ts             # ルート定義
│   ├── plugins/             # プラグイン設定
│   │   └── vuetify.ts           # Vuetify設定
│   ├── App.vue              # ルートコンポーネント
│   ├── main.ts              # エントリーポイント
│   └── style.css            # グローバルスタイル
├── package.json             # プロジェクト設定
├── vite.config.ts           # Vite設定
├── vitest.config.ts         # Vitest設定
├── tsconfig.json            # TypeScript設定
└── index.html               # HTMLエントリーポイント
```

## セットアップ

### 必要要件

- Node.js >= 20.0.0

### インストール

```bash
yarn install
```

### 開発サーバー起動

```bash
yarn dev
```

### ビルド

```bash
yarn build
```

### プレビュー

```bash
yarn preview
```

## 開発コマンド

```bash
# テスト実行
yarn test

# テストUI起動
yarn test:ui

# カバレッジ付きテスト実行
yarn test:coverage

# ESLint実行
yarn lint

# ESLint自動修正
yarn lint:fix

# Prettier実行
yarn format

# 型チェック
yarn type-check
```

## アーキテクチャ

### データフロー

1. **ファイルアップロード** ([FileUploader.vue](src/components/FileUploader.vue))
   - ユーザーが `My Clippings.txt` をアップロード
   - `highlightStore.loadClippingsFile()` を呼び出し

2. **パース処理** ([clippingsParser.ts](src/utils/clippingsParser.ts))
   - ファイル内容を解析
   - 書籍とハイライトのデータ構造に変換

3. **状態管理** ([highlightStore.ts](src/stores/highlightStore.ts))
   - Piniaストアでデータを管理
   - 書籍一覧、ハイライト数などを算出

4. **表示** ([HomeView.vue](src/views/HomeView.vue))
   - 書籍一覧を表示 ([BookList.vue](src/components/BookList.vue))
   - 選択された書籍のハイライトを表示 ([HighlightList.vue](src/components/HighlightList.vue))

### 型定義 ([highlight.ts](src/types/highlight.ts))

```typescript
interface Highlight {
  id: string;
  bookTitle: string;
  author: string;
  content: string;
  location: string;
  pageNumber?: string;
  dateAdded: Date;
  note?: string;
}

interface Book {
  title: string;
  author: string;
  highlights: Highlight[];
}
```

## ライセンス

MIT
