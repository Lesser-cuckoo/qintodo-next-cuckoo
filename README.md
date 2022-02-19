# Qin Todo (チーム f2)

## デザイン

- [Figma](https://www.figma.com/file/SNPCXNu0V6k6wHS4piYyS2/Qin-Todo?node-id=104%3A1925)

## セットアップ

### リポジトリのクローン

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
- 常駐ブランチで、開発用ブランチ`(GitHub UserName)/issue*`からの変更を受け付け、main にマージ

`(GitHub UserName)/issue*`

- 開発用ブランチ
- 必ず develop から分岐して、develop にマージ
- `*`は issue 番号
- [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)を使うと便利

`main`, `develop`には直接 push せず、`(GitHub UserName)/issue*`から PR を投げて、レビュー後に`develop`にマージする。

また、Commit メッセージの冒頭に[gitmoji](https://gitmoji.dev/)をつけることを推奨 (Commit の粒度が調整されるため)。
[VSCode のプラグイン](https://marketplace.visualstudio.com/items?itemName=seatonjiang.gitmoji-vscode)を使うと便利。

## Supabase の DB 設定

プロジェクト作成後、以下の SQL snippet を実行

### todos

```sql
drop table if exists todos;

create table todos (
  id bigint generated always as identity primary key,
  uid uuid references auth.users not null,
  inserted timestamp with time zone default timezone('utc'::text, now()) not null,
  task text not null,
  deadline timestamp default null,
  iscomplete boolean default false,
  sortkey double precision default null
);

alter table todos enable row level security;

create policy "Individuals can create todos." on todos for
    insert with check (auth.uid() = uid);

create policy "Individuals can view their own todos. " on todos for
    select using (auth.uid() = uid);

create policy "Individuals can update their own todos." on todos for
    update using (auth.uid() = uid);

create policy "Individuals can delete their own todos." on todos for
    delete using (auth.uid() = uid);
```
