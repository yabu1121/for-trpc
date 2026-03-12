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
.envには  
supabaseの  
- **NEXT_PUBLIC_SUPABASE_URL**  
- **NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY**  
- **DATABASE_URL**  
を入れて接続してください。もし、ほかのRDBMSでも接続できているのなら問題はないです  


テーブル、apiを作成した後に  
/server/api/api-configの  
export const apiConfig: ApiEndpoint[] = [];  
の配列内にオブジェクトを入れ込んでいく。  
type: queryかmutation  
chain: apiを呼び出すときのメソッドチェーンを入れ込む  