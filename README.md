# Welcome to [TOPSIM-V2] - (`Created by DTH - Software Team`)

# Repository: [](https://github.com/...)

## 🚀 Project Structure

Inside of TOPSIM - v2, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── scss/
│   │       └── global.scss
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navigation.astro
│   │   └── react/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── constants/
│   │
│   └── pages/
│       └── index.astro
├── package.json
├── tailwind.config.cjs
├── tsconfig.json
└── astro.config.mjs
```



## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                 | Action                                             |
| :---------------------- | :------------------------------------------------- |
| `yarn`                  | Installs dependencies                              |
| `yarn start`            | Starts local dev server at `localhost:3000`        |
| `yarn run build`        | Build your production site to `./dist/`            |
| `yarn run preview`      | Preview your build locally, before deploying       |




## Technology Used


`AstroJS`: [More_information](https://docs.astro.build/en/getting-started/) Sử dụng *AstroJS_framework* để xây dựng

`react - astrojs/react`: Sử dụng *ReactJS_framework* thông qua thư viện *astrojs/react*

`tailwindCSS`: CSS config with *tailwindCSS* library

`evergreen - UI`: Using Component UI with *EvergreenUI* library

`axios`: RESTful API with *axios* library



## 👀 [STANDARD]

`/src/`
  - [pages]: Phân cấp & cách đặt tên page sẽ quy định router của App `folders/(folders)/file.astro` - Extension bắt buộc phải là `.astro`,

  - [layouts]: Defind ra các layout khác nhau theo nhu cầu của từng views

  - [service]: RESTful API

  - [components]: Defind các component tái sử dụng, layout component, other framework components (React, Vue, ...)

  - [assets]: - Chứa các tài nguyên của dự án (icon, image, css - scss, ...) & export các phần thông qua 1 file index.ts duy nhất của mỗi loại (đỗi với images). 
              - `global.scss` css - scss của toàn bộ app (is:global), được import trong `/src/layouts/Layout.astro`

  - [astro.config.mjs]: config astro file + config các framework với astro