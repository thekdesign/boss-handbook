# 慣老闆常用手法手冊 🗂️

揭穿職場中那些「合法但缺德」的管理術。純前端 SPA，資料寫死在 `resources/js/data/cases.js`。

## 開發

```sh
nvm use            # node v22
npm install
npm run serve      # http://localhost:8080
```

## 建置

```sh
npm run production # 輸出至 public/
```

## 結構

採用 [project-common](../../project-common/) 的 Vue 3 + Vite + Pinia 架構，分類資料分散在 `resources/js/data/cases/part{1..7}*.js`。

- `resources/js/data/cases.js` — 案例彙整入口
- `resources/js/maps/common/Part.js` — 7 大分類（薪資 / 工時 / PUA / 畫餅 / 法規 / 離職 / 政治）
- `resources/js/components/pages/home/HomeIndex.vue` — 首頁列表
- `resources/js/components/pages/case/CaseDetail.vue` — 單案詳情
