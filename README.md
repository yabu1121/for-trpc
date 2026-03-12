# SWAGER LIKE TRPC CLIENT

## 技術スタック
- Next.js 15
- tRPC
- Drizzle ORM
- Tailwind CSS
- Shadcn UI
- TypeScript
- Postgres
- Supabase


## 使い方
テーブル、apiを作成した後に

/server/api/api-configの  
export const apiConfig: ApiEndpoint[] = [];  
の配列内にオブジェクトを入れ込んでいく。  
type: queryかmutation  
chain: apiを呼び出すときのメソッドチェーンを入れ込む  