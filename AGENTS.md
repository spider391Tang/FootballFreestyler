# FootballFreestyler 專案指南

> 狀態快照：2026-07-18（Asia/Taipei）
>
> 本文件供後續 Codex AI Agent 快速理解專案現況。修改功能前，仍應以目前程式碼與 `git status` 為準；完成有結構性影響的變更後，請同步更新本文件。

## 專案目的

這是花式足球運動員、街頭藝人與教練唐心磊 Spider 的個人形象網站，重點是：

- 個人品牌與表演理念
- 從大學起步、每天練習三小時到走上街頭的人物故事與媒體專訪
- 夏姬 Natsuki 親子花式足球共同演出
- Fukuoka Freestyle Open 2026 賽事故事與照片
- 舞台演出、街頭互動與教學工作坊服務
- 演出經歷、照片作品與社群聯絡入口

公開網站預期部署於：

`https://spider391tang.github.io/FootballFreestyler/`

Git remote：

`https://github.com/spider391Tang/FootballFreestyler.git`

## 技術與執行方式

- 純靜態網站：HTML + CSS + vanilla JavaScript。
- 沒有 npm、bundler、framework、template engine 或自動測試框架。
- 網站採多頁結構；`index.html` 是首頁與內容導覽，主題內容分散於五個子頁。
- `styles.css` 管理全站 design tokens、共用元件、動畫與主要響應式版面。
- `pages.css` 管理首頁目錄、各子頁 Hero、卡片、照片、影片與 timeline 版型。
- `script.js` 管理首頁 header、手機選單、reveal 動畫與頁尾年份。
- `.nojekyll` 讓 GitHub Pages 直接提供靜態檔案，不經 Jekyll 處理。
- 外部執行期依賴為 Google Fonts 與 YouTube privacy-enhanced iframe；其餘素材都存於 repository。

本機預覽請從 repository 根目錄啟動 HTTP server：

```powershell
python -m http.server 8000
```

然後開啟 `http://localhost:8000/`。不要只以 `file://` 開啟頁面作為完整驗證。

GitHub Pages 目前採 `main` branch 根目錄直接部署的設計，沒有 build output 目錄。

## 目錄與檔案職責

```text
FootballFreestyler/
├── AGENTS.md                  # Codex 專案結構與狀態指南（本文件）
├── README.md                  # 面向一般使用者的簡介、預覽與部署說明
├── index.html                 # SEO metadata、首頁 Hero、內容目錄與聯絡入口
├── about.html                 # 個人故事與 2014 巴西世界盃內容
├── family.html                # 親子演出、2026 最佳新人獎照片與影片
├── signature.html             # 得意技與招式影片
├── services.html              # 合作形式與花式足球教案
├── experience.html            # 重要經歷 timeline
├── styles.css                 # 全站 design tokens、共用元件、動畫與 RWD
├── pages.css                  # 首頁目錄與各子頁專用 layout
├── script.js                  # Header、手機選單、reveal、年份更新
├── .nojekyll                  # GitHub Pages 設定標記
└── assets/
    ├── favicon.svg
    ├── announcements/
    │   └── 20260718/
    │       └── IMG_6800.JPG   # 2026-07-18 演出海報
    └── photos/
        ├── performance/       # Hero、About、作品集與 Contact 使用的演出照片
        └── Natsuki/
            ├── 20260612-*.jpg # 親子演出照片
            └── 20260619/      # Fukuoka 賽事照片與來源備註 Markdown
```

`assets/photos/Natsuki/20260619/fukuokafreestyleopen.md` 目前只保存 Fukuoka Freestyle Open 官方 Instagram URL。`family.html` 使用同目錄照片呈現賽事與最佳新人獎，WebP 是保留原圖後產生的 960px／1600px 網頁衍生檔。

## 目前頁面結構

網站由首頁導向五個主題子頁：

1. `index.html`：Hero、Quick Route 六張導覽卡與社群聯絡入口。
2. `about.html`：Spider 個人故事與 2014 巴西世界盃照片。
3. `family.html`：親子演出介紹、Fukuoka Freestyle Open 2026 最佳新人獎照片，以及四支直式影片。
4. `signature.html`：二刀流、繩球合一等代表招式。
5. `services.html`：舞台演出、親子演出、校園推廣、品牌合作與教案。
6. `experience.html`：國際賽事、獎項與跨界演出的 timeline。

Head 中已有 description、Open Graph title/description/image/url、favicon 與 Google Fonts。若部署網域、repository 名稱或主要分享圖片改變，需同步更新 Open Graph 絕對 URL。

## `script.js` 現有行為

### Header 與手機選單

- 捲動超過 24 px 時切換 header 的 `.scrolled` class。
- `.menu-toggle` 透過 `aria-expanded` 控制 `.site-nav.open`。
- 點選導覽連結後會關閉手機選單並移除 `body.menu-open`。

### 動畫與頁尾

- `[data-reveal]` 元素由 `IntersectionObserver` 加上 `.is-visible`。
- `prefers-reduced-motion: reduce` 或缺少 `IntersectionObserver` 時會直接顯示內容。
- `[data-year]` 會自動更新為瀏覽器目前年份。

## 視覺系統與響應式狀態

主要 design tokens 位於 `styles.css` 的 `:root`：

- 深色主背景：`--ink: #090b0c`
- 紙張色背景：`--paper: #f1f0eb`
- 螢光綠強調色：`--acid: #c8ff1a`
- Natsuki 粉紅色：`--family-pink: #f45b9a`
- 內文字體：Noto Sans TC
- Display 字體：Barlow Condensed
- 內容最大寬度：`--max: 1440px`

全站響應式 breakpoint 為 `1050px`、`780px` 與 `430px`，`pages.css` 另使用 `900px` 與 `620px`；`styles.css` 也有 `prefers-reduced-motion` 規則。新增元件時需檢查桌面、tablet、mobile，以及 reduced-motion 狀態，不要只追加桌面樣式。

## 修改原則

- 保持零建置步驟，除非使用者明確要求導入新工具或框架。
- 所有 HTML 維持適合人讀的多行結構與兩格縮排；不要重新壓成單行或 minify。
- HTML 區塊註解用來說明內容邊界、CSS／JavaScript hook、效能與可存取性考量；修改結構時需同步調整相鄰註解，避免說明過時。
- 優先沿用現有 HTML class、`data-*` hook、CSS variables 與視覺語言。
- JavaScript query 可能找不到元素時，延續現有 optional chaining / guard 做法。
- 不要將只供 JavaScript 使用的 `data-*` attribute 隨意改名；HTML、CSS、JS 必須一起檢查。
- 圖片路徑與檔名大小寫要完全一致；GitHub Pages 執行環境區分大小寫。
- 新增圖片時使用有意義的 `alt`；只有純裝飾圖片才可使用空 `alt` 或 `aria-hidden`。
- 外部新分頁連結延續 `target="_blank" rel="noreferrer"`。
- 保留鍵盤操作、focus 樣式、skip link、ARIA label 與 reduced-motion 支援。
- 不要直接壓縮或大量改寫原始照片，除非任務明確要求影像最佳化。
- 使用中文撰寫網站內容時保留繁體中文語氣；程式 symbol、attribute 與 API 名稱維持英文。
- 若頁面功能或結構改變，同步更新 `README.md` 與本文件中受影響的說明。

## 修改後驗證清單

此專案沒有自動化測試，至少進行以下檢查：

1. 執行 `git status --short` 與 `git diff --check`，確認範圍及空白錯誤。
2. 由本機 HTTP server 開啟首頁，確認 console 沒有 JavaScript error 或 404。
3. 點過所有導覽 anchor、CTA、社群與外部來源連結。
4. 測試手機選單開啟、關閉，以及點擊選單項目後的 body scroll 狀態。
5. 逐一開啟 `about.html`、`family.html`、`signature.html`、`services.html`、`experience.html`，確認跨頁導覽正常。
6. 確認所有圖片載入、alt/figcaption 合理，且沒有大小寫錯誤的 asset path。
7. 在接近 `1050px`、`900px`、`780px`、`620px`、`430px` 的寬度檢查溢位與排版。
8. 開啟 reduced-motion 模式，確認內容不會因 reveal 動畫而維持隱藏。
9. 若修改響應式圖片，確認 `srcset`、`sizes`、WebP 與原圖 fallback 都存在且尺寸正確。
10. 若修改 SEO 或正式網址，確認 Open Graph 絕對 URL 仍指向可公開存取的資源。

## 目前狀態摘要

- `main` branch 為部署目標。
- 網站目前是首頁加五個主題子頁的純靜態多頁架構。
- 六個 HTML 檔案皆採可讀的多行縮排，並以繁體中文註解標示 metadata、導覽、主要 section、媒體、頁尾與腳本職責。
- `family.html` 已整合 Fukuoka Freestyle Open 2026 最佳新人獎文字、兩張賽事照片與四支親子演出影片。
- 最佳新人獎照片使用 960px／1600px WebP `srcset`，並保留原始 JPEG fallback。
- `signature.html` 目前收錄二刀流與繩球合一；`services.html` 收錄合作形式與教案。
- `experience.html` 以 timeline 呈現 2018–2026 的重要經歷。
- 尚未配置 automated tests、lint、formatter、CI workflow 或 package manager。
- 後續 Agent 必須重新執行 `git status`，不可假設工作樹乾淨。
