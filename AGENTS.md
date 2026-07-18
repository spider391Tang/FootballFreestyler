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
- `index.html` 是唯一頁面與主要內容來源。
- `styles.css` 管理全部視覺設計、動畫與響應式版面。
- `script.js` 管理頁面互動與日期相關顯示邏輯。
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
├── index.html                 # SEO metadata、導覽、所有頁面區塊與內容
├── styles.css                 # 全站 design tokens、layout、動畫、RWD
├── script.js                  # 導覽、日期過濾、dialog、reveal、年份更新
├── .nojekyll                  # GitHub Pages 設定標記
└── assets/
    ├── favicon.svg
    ├── announcements/
    │   └── 20260718/
    │       └── IMG_6800.JPG   # 2026-07-18 演出海報
    └── photos/
        ├── performance/       # Hero、About、作品集與 Contact 使用的演出照片
        ├── brazil-2014/       # 2014 巴西世界盃之旅照片（SVG 佔位圖；請替換為實際 photo-1.svg / photo-2.svg / photo-3.svg）
        └── Natsuki/
            ├── 20260612-*.jpg # 親子演出照片
            └── 20260619/      # Fukuoka 賽事照片與來源備註 Markdown
```

`assets/photos/Natsuki/20260619/fukuokafreestyleopen.md` 目前只保存 Fukuoka Freestyle Open 官方 Instagram URL；實際賽事介紹內容仍直接寫在 `index.html` 的 dialog 中。

## `index.html` 目前頁面結構

主要導覽與 section 順序如下：

1. `#top`：Hero 與主要邀約 CTA。
2. `#upcoming`：近期演出；目前是 2026-07-18「動學堂熱血展演・花蓮店」。
3. `#about`：Spider 個人介紹、統計資訊、人物故事時間軸（含 2014 巴西世界盃里程碑）、百傳媒專訪與封面人物影片；末尾新增「2014 巴西世界盃之旅」卡片（`brazil-feature`），含 3 張照片格與 Facebook 相簿連結。
4. `#natsuki`：Natsuki 親子共同演出、三支直式 YouTube Shorts 與 Fukuoka 賽事入口。
5. `#fukuoka-dialog`：以原生 `<dialog>` 呈現的賽事故事、得獎資訊、照片與外部來源。
6. `#services`：舞台演出、街頭互動、教學工作坊。
7. `#works`：Selected Moments 演出照片集，並包含世足之夜、華視世界盃記者會、桃園市街客家體表會、夏日松一下與大溪威斯汀世界盃演出履歷。
8. `#honors`：重要獎項與經歷；第五、七屆巨城街頭藝術節、2019 亞洲盃花式足球錦標賽及 Okinawa Freestyle Football Open 項目附外部紀錄連結，並包含民視《幸福保衛站》電視演出卡片。
9. `#contact`：Instagram、Facebook、YouTube 聯絡入口。

Head 中已有 description、Open Graph title/description/image/url、favicon 與 Google Fonts。若部署網域、repository 名稱或主要分享圖片改變，需同步更新 Open Graph 絕對 URL。

## `script.js` 現有行為

### Header 與手機選單

- 捲動超過 24 px 時切換 header 的 `.scrolled` class。
- `.menu-toggle` 透過 `aria-expanded` 控制 `.site-nav.open`。
- 點選導覽連結後會關閉手機選單並移除 `body.menu-open`。

### 近期演出日期過濾

- 以 `Intl.DateTimeFormat` 和 `Asia/Taipei` 計算當天日期。
- 每張活動卡使用 `data-event-date="YYYY-MM-DD"`。
- 活動日期早於台北當天日期時，該卡片會從 DOM 移除。
- 若所有活動皆已過期，整個 `[data-event-section]` 與 `[data-event-nav]` 導覽項目都會移除。
- 因此目前 2026-07-18 活動在 2026-07-19 起會自動隱藏；這是預期行為，不是資料遺失。

新增活動時，必須同時確認：

- `data-event-date` 使用零補齊的 ISO 日期。
- 顯示日期、地點、文字、海報路徑與 `data-event-date` 彼此一致。
- 若同時存在多個活動，現行 CSS 版面是否仍適合多卡顯示。

### Fukuoka 賽事 dialog

- `[data-competition-open]` 開啟 dialog。
- `[data-competition-close]`、backdrop 點擊與原生 dialog close event 負責關閉或清除狀態。
- 開啟時會套用 `body.dialog-open`。
- 程式保留不支援 `showModal()` / `close()` 時的 `open` attribute fallback。

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

響應式 breakpoint 目前為 `1050px`、`780px` 與 `430px`；另有 `prefers-reduced-motion` 規則。新增元件時需檢查桌面、tablet、mobile，以及 reduced-motion 狀態，不要只追加桌面樣式。

## 修改原則

- 保持零建置步驟，除非使用者明確要求導入新工具或框架。
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
5. 測試 Fukuoka dialog 的開啟按鈕、關閉按鈕、backdrop 與鍵盤 Escape。
6. 確認所有圖片載入、alt/figcaption 合理，且沒有大小寫錯誤的 asset path。
7. 在接近 `1050px`、`780px`、`430px` 的寬度檢查溢位與排版。
8. 開啟 reduced-motion 模式，確認內容不會因 reveal 動畫而維持隱藏。
9. 若修改活動，模擬活動日前後的 `Asia/Taipei` 日期邏輯。
10. 若修改 SEO 或正式網址，確認 Open Graph 絕對 URL 仍指向可公開存取的資源。

## 目前狀態摘要

- `main` branch 為部署目標。
- 網站核心內容、完整響應式樣式與互動 JavaScript 已存在。
- 百傳媒人物專訪與「每天擠出三小時」封面故事影片已整合至 About 區塊。
- Fukuoka Freestyle Open 2026 詳情已整合為頁內 dialog。
- Natsuki breaking、父女夾球後空翻與世壯運親子演出已整合為直式影片區塊。
- 2022 第五屆與 2024 第七屆巨城街頭藝術節獲獎經歷已附上 YouTube 演出連結。
- 2019 Okinawa Freestyle Football Open Top 16 經歷已附上 Facebook 賽事相簿連結。
- 2019 亞洲盃花式足球錦標賽團體表演賽冠軍經歷已附上 Facebook 賽事相簿連結。
- 2018 世足之夜花式足球舞台演出已移至 Selected Moments 演出區，並內嵌 YouTube 完整影片。
- 2023 桃園市街客家體表會花式足球演出已加入 Selected Moments 的表演履歷，並內嵌 YouTube 完整影片。
- 2026「夏日松一下」Songyan Summer Festival 花式足球演出與體驗已加入表演履歷，並連結 Facebook 原始貼文。
- 2026 世界盃期間於桃園大溪笠復威斯汀度假酒店的花式足球演出已加入表演履歷，並連結飯店 Facebook 活動貼文。
- 2018 華視世界盃記者會花式足球演出已加入表演履歷，並連結 Facebook 演出相簿。
- 民視《幸福保衛站》花式足球電視演出已整合至重要經歷區塊，並連結 Facebook 原始影片。
- 2026 台中夏日馬戲節 Freestyle Football 團體賽冠軍已加入重要經歷區塊（honor-list 首位），並連結 Facebook 賽事紀錄。
- 2026-07-18 近期演出已加入，並會在活動日過後依台北日期自動移除。
- 2014 巴西世界盃之旅已整合至 About 區塊：story-timeline 新增全寬里程碑「飛赴巴西，現場見證世界盃」；末尾新增 `brazil-feature` 卡片含故事文案、三格照片（`assets/photos/brazil-2014/photo-1~3.svg`，目前為 SVG 佔位圖，需替換為實際照片）與 Facebook 相簿連結。
- 尚未配置 automated tests、lint、formatter、CI workflow 或 package manager。
- 本狀態快照建立時工作樹原本為乾淨狀態；後續 Agent 必須重新執行 `git status`，不可假設仍然乾淨。
