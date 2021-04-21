# ARCS Website

## Installation

```shell script
yarn install
```

## Development

### Dev Server

```shell script
yarn serve
```

### Dev Build

Less Polyfills, smaller bundles, faster builds. No minimizing.

```shell script
yarn dev
```

### Committing

Fix linting errors as far as possible. If some errors are outside of your responsibility,
use `git commit -n -m "some message"`.

## Build for Production

### Legacy vs Modern

```shell script
yarn build # same as yarn build_legacy
yarn build_legacy
yarn build_modern
```

```html
<script type="module" src="app-modern.js"></script>
<script nomodule src="app-legacy.js"></script>
```

### Analyzing

```shell script
ANALYZE=true yarn build # same as yarn build_legacy
ANALYZE=true yarn build_legacy
ANALYZE=true yarn build_modern
```
