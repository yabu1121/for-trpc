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

<img width="1922" height="2280" alt="image" src="https://github.com/user-attachments/assets/10e0ebd4-7ea4-461b-ba82-c88f894e0631" />
