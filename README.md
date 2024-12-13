# transition-graph

## :butterfly: Demo

+ https://transition-graph-test.vercel.app/

## :crocodile: TODO
+ [x] 都道府県一覧の取得 
+ [x] 都道府県一覧のチェックボックスを動的
+ [x] 都道府県にチェックを入れるとAPI経由でデータを取得
+ [x] データを元にグラフを描画

## :four_leaf_clover:: Features
---
+ [Next.js](https://nextjs.org/)
+ [Sass](https://sass-lang.com/) + CSS Modules
+ [TypeScript](https://www.typescriptlang.org/)
+ [ESLint](https://eslint.org/) 
+ [Stylelint](https://stylelint.io/)
+ [husky](https://github.com/typicode/husky)
+ [Prettier](https://prettier.io/)
+ [Storybook](https://storybook.js.org/)



## :dog: Requirements
------
`Node.js`と`pnpm`は下記のバージョンで確認済みです。


| 名前 | バージョン   |
| ---- |---------|
| Node.js | 20.18.0 |
| pnpm | v9.15.0 |


## :turtle: Install

First, clone the repo via git:

```bash
git@github.com:angedessin/transition-graph.git
```

### Install pnpm

`npm script`で`pnpm`を使用するので、pnpmをインストールしてください。

https://zenn.dev/azukiazusa/articles/pnpm-feature




### 初期設定
`pnpm install`が終わったタイミングで、`.config`フォルダががプロジェクト内に作られます。コミット時に`ESLint` / `stylelint` / `Prettier`を実行させるために必要です。

作られない場合は必ず下記コマンドを実行してください。


```sh
pnpm prepare
```



下記のエラーが出た場合は[記事](https://qiita.com/nyamogera/items/9a34a0245c042b6f29c6)
を参考にgitのツールを修正してください。

```sh
.git/hooks/pre-commit: line 49: node: command not found
```


### Install dependencies

Using pnpm:

```bash
pnpm install
```

## :whale: Command
------

## dev

開発サーバーを立ち上げて、各種ファイルをコンパイルをします。


```bash
pnpm dev
```

## ANALYZE
`production build`時のファイル容量を確認します。

```bash
pnpm analyze
```

## lint

`Prettier`と`ESLint`を実行します。

```bash
pnpm lint
```

`pages`ディレクトリと`Storybook`のファイルのみ、`export default`でLintエラーが出ません。

## export
最終的にサーバーにアップされるファイルを出力します。

```bash
pnpm build
```

## preview
最終的にサーバーにアップされるファイルローカルで確認します。

[http://127.0.0.1:8080](http://127.0.0.1:8080)

```bash
pnpm preview
```

## svgr
SVGをReactコンポーネントに変換にします。

```bash
pnpm svgr
```

`src/ui/`内にディレクトリを作成してください。svg画像はそのフォルダ内の`assets`フォルダに格納します。

追加後`packages.json`の`npm script`に、該当ディレクトリとコンポーネントの書き出し先を記述してください。コマンド実行時に`assets`フォルダ内のsvgファイルを[svgo](https://github.com/svg/svgo)で最適化します。

```bash
svgo -f src/app/_ui/${ディレクトリ}/assets --config ./svgo.config.js && svgr --filename-case kebab src/app/_ui/${ディレクトリ}/assets/*.svg --ext tsx --out-dir src/app/_ui/${ディレクトリ}
```

