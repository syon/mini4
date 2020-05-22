<template>
  <div class="root">
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, 'Meiryo UI', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  box-sizing: border-box;
  font-feature-settings: 'palt';
  touch-action: manipulation;
  user-select: none;
  background-color: #666464;
}

.root {
  color: #eee;
  font-size: 0.75rem;
  font-weight: normal;
  margin: 0 auto;
  max-width: 100vmax;
  min-height: 100vh;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
