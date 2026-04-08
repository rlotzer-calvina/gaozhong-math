import DefaultTheme from 'vitepress/theme';
import './style.css';
import Layout from './Layout.vue';

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // Custom enhancements if needed.
  }
};
