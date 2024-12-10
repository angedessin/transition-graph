// import path from 'path';
// import NextBundleAnalyzer from '@next/bundle-analyzer';
// import withTmInitializer from 'next-transpile-modules';

// TODO: next-image-export-optimizerのエラーの解消のためmjsから変更
// 該当箇所をコメントアウトして拡張子を変更
const path = require('path');
const NextBundleAnalyzer = require('@next/bundle-analyzer');
const withTmInitializer = require('next-transpile-modules');

// exportエラー用
const modules = [];

const withTM = withTmInitializer(modules, {
  debug: false,
  resolveSymlinks: true,
});

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const { NODE_ENV, debug } = process.env;

const isDebugMode = !!debug;
const isProduction = NODE_ENV === 'production';
const trailingSlash = isProduction;

// mjsは `__dirname` が使えないため代用
// const dirname = path.dirname(new URL(import.meta.url).pathname);

const sassOptions = {
  includePaths: [path.join(__dirname, 'src/styles')],
};

const env = {
  isProduction,
  isDebugMode,

  // image settings
  nextImageExportOptimizer_imageFolderPath: 'public/images',
  nextImageExportOptimizer_exportFolderPath: 'out',
  nextImageExportOptimizer_quality: '75',
  nextImageExportOptimizer_storePicturesInWEBP: 'true',
  nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',
  nextImageExportOptimizer_generateAndUseBlurImages: 'true',
  nextImageExportOptimizer_remoteImageCacheTTL: '0',
};

console.log(`NODE_ENV:${NODE_ENV}`);

const isOutput = true;

const images = {
  loader: 'custom',
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
};

const transpilePackages = ['next-image-export-optimizer'];

const nextConfig = {
  output: isProduction && isOutput ? 'export' : 'standalone',
  compiler: {
    removeConsole: isProduction,
  },
  images,
  transpilePackages,
  reactStrictMode: true,
  trailingSlash,
  env,
  sassOptions,
  /*webpack: (config) => {
    // シェーダー読み込み用のローダー
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: [{ loader: 'raw-loader' }, { loader: 'glslify-loader' }],
      exclude: /node_modules/,
    });

    return config;
  },*/
};

// next start時はwithExportImagesを削除
const nextPlugins = [withBundleAnalyzer, withTM];

module.exports = nextPlugins.reduce(
  (config, plugin) => plugin(config),
  nextConfig
);

// export default nextPlugins.reduce(
//   (config, plugin) => plugin(config),
//   nextConfig
// );
