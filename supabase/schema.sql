-- 不動産管理アプリ用の物件テーブル定義
-- Supabaseの SQL Editor でそのまま実行してください。

-- 物件テーブル
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  name text not null,        -- 物件名
  rent integer not null,     -- 家賃（円）
  area text not null,        -- エリア名
  layout text not null,      -- 間取り（例：1LDK）
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(), -- 登録したユーザー
  created_at timestamptz not null default now()
);

-- 行レベルセキュリティ（RLS）を有効化
alter table public.properties enable row level security;

-- 自分が登録した物件のみ参照できる
create policy "Users can select own properties"
  on public.properties
  for select
  using (auth.uid() = user_id);

-- 自分のuser_idとしてのみ物件を登録できる
create policy "Users can insert own properties"
  on public.properties
  for insert
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ更新できる
create policy "Users can update own properties"
  on public.properties
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ削除できる
create policy "Users can delete own properties"
  on public.properties
  for delete
  using (auth.uid() = user_id);
