/**
 * @file
 * @author Code-GN
 * @description
 * このウェブアプリケーションのエントリーポイントです。
 */

import Application from './Core/Application';
import '#/SCSS/global.scss';
import '#/SCSS/modal.scss';
import '#/SCSS/page.scss';
import '#/SCSS/user-interface.scss';


window.addEventListener('DOMContentLoaded', () => {
  const app = new Application('#uiroot');
  (window as any).app = app;
});
