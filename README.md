餐廳清單
=
可以擁有只有自己有權限閱讀並編輯的清單

功能
--
* 可註冊自己的帳號或是透過Facebook登入
* 登入後可以新增、編輯、刪除餐廳，也可以閱讀餐廳詳情


開始使用
--
1. 請確認已安裝 node.js 與 npm
2. 將專案 clone 到本地

   ```bash
   git clone ...
   ```
3. 依照 .env.example 設定環境變數
4. 建立種子資料

   ```bash
   npm run seed
   ```
5. 開始專案

   ```bash
   npm run start
   ```

6. 若看見以下訊息代表順利運行，便可打開瀏覽器進入該網址

   ```bash
   app is running on localhost:3000
   db is connected
   ```
   
7.  若想結束此專案請輸入
    ```bash
     ctrl + c
     ```
### 開發環境
* Node.js 16.14.1
* Express 4.16.4
* Express-Handlebars 3.0.0
* MongoDB
* mongoose 7.2.2
* bootstrap 5.3.0

