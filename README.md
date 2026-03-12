# SWAGER LIKE TRPC CLIENT

## 経緯
GoやpythonのfastApi, jsのhonoなどにはrest clientのようなバックエンドだけでも動作を確認できるツールがあったにもかかわらず、tRPCにはそのようなツールがなかったため学習効率化やアプリケーション保守性の向上のため作成した。（厳密にはあったが長期間サポートされていなかったため、trpc version 11.0.0では動作しなかった。）

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

<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/d0b31553-daff-4f9d-90f7-dd48a3a3da01" />
