/**
 * @file
 * @author Code-GN
 * @description
 * このウェブアプリケーションのエントリーポイントです。
 */

import Application from './Core/Application';
import './global.scss';

window.addEventListener('DOMContentLoaded', () => {
  const app = new Application('#uiroot');
  (window as any).app = app;
});
