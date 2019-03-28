__webpack_public_path__ = window["__webpack_public_path__"]

/**if you need */
import 'babel-polyfill';
import Home from '@/pages/home/home';

window.onload = Home.instance.init;
