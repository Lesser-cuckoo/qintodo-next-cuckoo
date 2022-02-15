# Qin Todo (チーム f2)

## デザイン

- [Figma](https://www.figma.com/file/SNPCXNu0V6k6wHS4piYyS2/Qin-Todo?node-id=104%3A1925)

## セットアップ

### リポジトリのクローン

以下のコマンドを実行し、ローカル環境にクローン。

```
git clone https://github.com/Lesser-cuckoo/qintodo-next-cuckoo
```

### 依存関係のインストール

```
cd qintodo-next-cuckoo
yarn
```

## 開発

### 開発環境の立ち上げ

```
yarn dev // localhost:3000で立ち上がる
```

### 本番環境の動作確認

```
yarn build
yarn start // localhost:3000で立ち上がる
```

## Git ブランチルール

`main`

- マージされると本番環境に自動反映

`develop`

- 本番反映前に確認するためのステージング環境
- 常駐ブランチで、feature からの変更を受け付け、main にマージ

`feature/*`

- 開発用ブランチ
- 必ず develop から分岐して、develop にマージ
- `*`は開発するものを簡易的に記入
  - 例: feature/add-mypage

`main`, `develop`には直接 push せず、`feature/*`から PR を投げて、レビュー後に`develop`にマージする。

また、Commit メッセージの冒頭に[gitmoji](https://gitmoji.dev/)をつけることを推奨 (Commit の粒度が調整されるため)。
[VSCode のプラグイン](https://marketplace.visualstudio.com/items?itemName=seatonjiang.gitmoji-vscode)を使うと便利。
