!function(e){function t(t){for(var r,i,c=t[0],u=t[1],l=t[2],d=0,f=[];d<c.length;d++)i=c[d],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&f.push(o[i][0]),o[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);for(s&&s(t);f.length;)f.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,c=1;c<n.length;c++){var u=n[c];0!==o[u]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={0:0},a=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var c=window.webpackJsonp=window.webpackJsonp||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var s=u;a.push([17,1]),n()}([,,,,,,,,function(e,t,n){var r=n(9);"string"==typeof r&&(r=[[e.i,r,""]]);var o={insert:"head",singleton:!1};n(16)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){t=e.exports=n(10)(!1);var r=n(11),o=r(n(12)),a=r(n(13)),i=r(n(14)),c=r(n(15));t.push([e.i,"*{box-sizing:border-box}body{font:14px \"Century Gothic\", Futura, sans-serif;height:100%}html{height:100%}body,button,html{padding:0;margin:0}.container{display:grid;grid-template-columns:80vmin;margin-bottom:1em;padding:10px;justify-content:center}.ultimate-board{display:inline-grid;grid-template-columns:repeat(3, 1fr);grid-gap:0.4em;height:80vmin}.classic-board{display:inline-grid;grid-template-columns:repeat(3, 1fr);grid-gap:0.1em}.status{margin-bottom:10px}.square{flex:1;justify-content:center;align-items:center;background-color:#fff;border:none;border:1px solid #999;font-size:20px;text-align:center;vertical-align:middle}.square:before{content:'';padding-bottom:100%;display:inline-block;vertical-align:middle}.square:focus{outline:none}.game-info{margin-top:20px;margin-left:20px}.history{list-style-type:none;padding-left:0}.disabled-board button{background-color:#f4f4f4}.x-won-board button{background-color:#EDFFEF}.o-won-board button{background-color:#EDFEFF}.move-button{background-color:white;border:solid 1px;border-color:#AAA;color:#AAA;padding:3px 25px;margin-bottom:3px;text-align:center;box-shadow:none}.current-move-button{background-color:white;border:solid 1px;border-color:#111;color:#111;padding:3px 25px;margin-bottom:3px;text-align:center;box-shadow:none}.current-move-button:hover{background-color:#111;color:white}.move-button:hover{background-color:#AAA;color:white}.button{background-color:white;border:solid 1px;border-color:#111;color:#111;padding:3px 25px;margin-bottom:3px;text-align:center;box-shadow:none;margin-left:3px}.replayInProgress{margin-left:3px;color:#19a974}.button:hover{background-color:#111;color:white}.specialIconsButton{width:150px}button.square-react-icon{background-image:url("+o+");background-repeat:no-repeat;background-position:center;background-size:contain;text-indent:100%;white-space:nowrap;overflow:hidden}button.square-vue-icon{background-image:url("+a+");background-repeat:no-repeat;background-position:center;background-size:contain;text-indent:100%;white-space:nowrap;overflow:hidden}button.square-x-icon{background-image:url("+i+");background-repeat:no-repeat;background-position:center;background-size:contain;text-indent:100%;white-space:nowrap;overflow:hidden}button.square-o-icon{background-image:url("+c+");background-repeat:no-repeat;background-position:center;background-size:contain;text-indent:100%;white-space:nowrap;overflow:hidden}button.react-icon{background-image:url("+o+");background-repeat:no-repeat;background-position:center;background-size:contain;text-indent:100%;white-space:nowrap;overflow:hidden;flex:1;justify-content:center;align-items:center;background-color:#fff;border:none;min-width:30px;min-height:30px}button.vue-icon{background-image:url("+a+");background-repeat:no-repeat;background-position:center;background-size:contain;text-indent:100%;white-space:nowrap;overflow:hidden;flex:1;justify-content:center;align-items:center;background-color:#fff;border:none;min-width:30px;min-height:30px}button.no-icon{flex:1;justify-content:center;align-items:center;background-color:#fff;border:none}button.o-icon{background-image:url("+c+");background-repeat:no-repeat;background-position:center;background-size:contain;text-indent:100%;white-space:nowrap;overflow:hidden;flex:1;justify-content:center;align-items:center;background-color:#fff;border:none;min-width:30px;min-height:30px}button.x-icon{background-image:url("+i+");background-repeat:no-repeat;background-position:center;background-size:contain;text-indent:100%;white-space:nowrap;overflow:hidden;flex:1;justify-content:center;align-items:center;background-color:#fff;border:none;min-width:30px;min-height:30px}.urlShareInput{height:24px;width:60px;margin-left:0.5em;margin-right:0.5em}.copyInfo{color:#19a974}\n",""])},,,function(e,t,n){e.exports=n.p+"df23a7d86cfadcda4fc99cd589f68898.svg"},function(e,t,n){e.exports=n.p+"575290762c34f659f5c0a11c6091468a.svg"},function(e,t,n){e.exports=n.p+"6cdd90e66fe48891c64812b5d0fcab33.svg"},function(e,t,n){e.exports=n.p+"ccfb2de5d7b2289da62e8d70939e8e41.svg"},,function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(2),i=n.n(a);function c(e){var t=e.name;return o.a.createElement("h1",null,"Ultimate tic-tac-toe in ",t)}function u(e){for(var t=null,n=function(n){var r=3*n,o=e.slice(r,r+3);t=l(o)||t;var a=e.filter(function(e,t){return t%3===n});t=l(a)||t},r=0;r<3;r+=1)n(r);var o=[e[0],e[4],e[8]];t=l(o)||t;var a=[e[2],e[4],e[6]];return t=l(a)||t}function l(e){return e.every(function(e){return"X"===e})?"X":e.every(function(e){return"O"===e})?"O":null}function s(e){var t=e.value,n=e.onClick,r=e.squareTestId,a=function(e){var t=e.value,n=e.specialIcons;return"X"===t?n?"square-vue-icon square":"square-x-icon square":"O"===t?n?"square-react-icon square":"square-o-icon square":"square"}({value:t,specialIcons:e.specialIcons});return o.a.createElement("button",{className:a,onClick:n,"data-testid":r,type:"button"},t)}function d(e){var t=e.squares,n=e.onClick,r=e.testId,a=e.className,i=e.specialIcons,c=void 0!==i&&i;function u(e,r){return o.a.createElement(s,{value:t[e],onClick:function(){return n(e)},squareTestId:r,specialIcons:c})}return o.a.createElement("div",{"data-testid":r,className:a},u("0","topLeftSquare"),u("1","topMiddleSquare"),u("2","topRightSquare"),u("3","centerLeftSquare"),u("4","centerMiddleSquare"),u("5","centerRightSquare"),u("6","bottomLeftSquare"),u("7","bottomMiddleSquare"),u("8","bottomRightSquare"))}function f(e){var t=e.description,n=e.player,r=e.specialIcons,a=function(e){var t=e.value,n=e.specialIcons;return"X"===t?n?"vue-icon":"x-icon":"O"===t?n?"react-icon":"o-icon":"no-icon"}({value:n,specialIcons:void 0!==r&&r});return o.a.createElement("div",{className:"game-status","data-testid":"gameStatus"},t,":",o.a.createElement("button",{className:a,type:"button",disabled:!0},n))}function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function b(e){var t=e.onLoadGameClick,n=p(Object(r.useState)({}),2),a=n[0],i=n[1];return o.a.createElement("span",null,o.a.createElement("textarea",{"data-testid":"importGameTextarea",onChange:function(e){i(e.target.value)}}),o.a.createElement("br",null),o.a.createElement("button",{type:"button",className:"button",onClick:function(){!function(e){try{return JSON.parse(e),!0}catch(e){return!1}}(a)?window.alert("Invalid save game JSON"):t(JSON.parse(a))}},"Load game"))}function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function g(e){var t=e.gameState,n=e.onLoadGameClick,a=m(Object(r.useState)(!1),2),i=a[0],c=a[1],u=m(Object(r.useState)(!1),2),l=u[0],s=u[1];var d=o.a.createElement("button",{type:"button",className:"button",onClick:function(){s(!1),c(!1)}},"Close");return o.a.createElement("span",null,o.a.createElement("button",{type:"button",className:"button",onClick:function(){s(!1),c(t||!1)}},"Save"),o.a.createElement("button",{type:"button",className:"button",onClick:function(){s(!0),c(!1)}},"Load"),(i||l)&&d,o.a.createElement("br",null),i&&o.a.createElement(y,{gameState:t}),l&&o.a.createElement(b,{onLoadGameClick:function(e){s(!1),c(!1),n(e)}}))}function y(e){var t=e.gameState;return o.a.createElement("textarea",{"data-testid":"exportGameTextarea",readOnly:!0,value:t?JSON.stringify(t):""})}var h=n(3),v=n.n(h),x="PLAY_SQUARE",w="TIME_TRAVEL",k="TOGGLE_SPECIAL_ICONS";function E(e,t){return{type:x,boardIndex:parseInt(e,10),squareIndex:parseInt(t,10)}}function I(){return{type:k}}function S(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function O(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q(),t=arguments.length>1?arguments[1]:void 0;switch(t.type){case x:return function(e,t){var n=t.boardIndex,r=t.squareIndex;if(j(e.history[e.pointInHistory].boards))return e;if(!function(e,t,n){var r=e.history[e.pointInHistory].boards[t];return r.isActive&&null===r.squares[n]&&!u(r.squares)}(e,n,r))return e;var o=e.history[e.pointInHistory].boards.map((c=n,l=r,s=e.nextPlayer,function(e,t){if(t===c){var n=e.squares;return Object.assign({},e,{squares:[].concat(S(n.slice(0,l)),[s],S(n.slice(+l+1)))})}return e})).map(function(e,t){return function(n,r,o){var a=r===parseInt(t,10);return Object.assign({},n,{isActive:!!A(o,{boardIndex:e,squareIndex:t})||a})}}(n,r)),a=e.history,i=[].concat(S(a.slice(0,e.pointInHistory+1)),[{boards:o}]);var c,l,s;return Object.assign({},e,{nextPlayer:({boardIndex:n,squareIndex:r},o,d=e,"X"===d.nextPlayer?"O":"X"),history:i,pointInHistory:i.length-1});var d}(e,t);case w:return function(e,t){var n=t.pointInHistory;return Object.assign({},e,{pointInHistory:n,nextPlayer:n%2==0?"X":"O"})}(e,t);case k:return Object.assign({},e,{specialIcons:!e.specialIcons});default:return e}}function j(e){var t=e.map(function(e){return u(e.squares)});return u(t)}function q(){return{nextPlayer:"X",history:[{boards:Array(9).fill().map(function(){return{squares:Array(9).fill(null),isActive:!0}})}],pointInHistory:0,specialIcons:!1}}function A(e,t){var n=t.squareIndex;return 0===e[n].squares.filter(function(e){return null===e}).length||!!u(e[n].squares)}function C(e){return e.length<2?[]:e.reduce(function(e,t,n,r){if(void 0===r[n+1])return e;var o,a,i=(o=t.boards,a=r[n+1].boards,o.reduce(function(e,t,n){if(null!==e)return e;var r=null;return t.squares.forEach(function(e,t){a[n].squares[t]!==e&&(r=E(n,t))}),r},null));return e.push(i),e},[])}function N(e){return e.reduce(O,q())}function P(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function T(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function L(e){var t=e.gameState,n=T(Object(r.useState)(""),2),a=n[0],i=n[1],c=T(Object(r.useState)(null),2),u=c[0],l=c[1];var s=function(e){if(null===e)return"";return e?"Url copied":"Copy the url from text input"}(u);return o.a.createElement(o.a.Fragment,null,o.a.createElement("button",{type:"button",className:"button",onClick:function(){var e=function(e){var t=C(e.history),n=function(e){return 0===e.length?"":e.map(function(e){return e.type===x?"a[]=p".concat(e.boardIndex).concat(e.squareIndex):"a[]=ti"}).join("&")}(e.specialIcons?[I()].concat(P(t)):t),r=window.location,o=r.protocol,a=r.host,i=r.pathname,c="".concat(o,"//").concat(a).concat(i);return"".concat(c,"?").concat(n)}(t);i(e),l(v()(e))}},"Share game"),o.a.createElement("input",{type:"text",onChange:function(){},className:"urlShareInput","data-testid":"urlShareInput",value:a}),o.a.createElement("span",{className:"copyInfo"},s))}function R(e){var t=e.onClick,n=e.children,r=e.highlight,a=void 0!==r&&r?"current-move-button":"move-button";return o.a.createElement("button",{type:"button",className:a,onClick:t},n)}function G(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function _(e){Object(r.useEffect)(function(){var t=N(function(e){return e?e.split("&").filter(function(e){return 0===e.indexOf("a[]=")}).map(function(e){return e.split("=")[1]}).map(function(e){return"ti"===e?I():E(e[1],e[2])}):[]}(G(window.location.href.split("?"),2)[1]));e(t)},[e])}function B(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function M(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function z(){var e=M(Object(r.useState)(O(void 0,"")),2),t=e[0],n=e[1],a=function(e){var t=B(Object(r.useState)(!1),2),n=t[0],o=t[1],a=B(Object(r.useState)(0),2),i=a[0],c=a[1],u=B(Object(r.useState)(null),2),l=u[0],s=u[1],d=B(Object(r.useState)(!1),2),f=d[0],p=d[1];return Object(r.useEffect)(function(){if(n){var t=C(l).slice(0,i);i>=l.length?o(!1):setTimeout(function(){e(Object.assign({},N(t),{specialIcons:f})),c(function(e){return e+1})},1e3)}},[n,i,l,e,f]),{startReplay:function(e,t){s(e),p(t),o(!0),c(0)},replayInProgress:n}}(n),i=a.startReplay,c=a.replayInProgress;function l(e,r,a){var i=r[e],c="classic-board ".concat(function(e){var t=u(e.squares);return"X"===t?"x-won-board":"O"===t?"o-won-board":e.isActive?"":"disabled-board"}(i)),l=t.specialIcons;return o.a.createElement(d,{className:c,squares:i.squares,testId:a,onClick:function(r){return function(e,r){n(O(t,E(e,r)))}(e,r)},specialIcons:l})}_(n);var s=t.nextPlayer,p=t.history,b=t.pointInHistory,m=t.specialIcons,y=p[b].boards,h=j(y);return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"ultimate-board"},l(0,y,"topLeftBoard"),l(1,y,"topMiddleBoard"),l(2,y,"topRightBoard"),l(3,y,"centerLeftBoard"),l(4,y,"centerMiddleBoard"),l(5,y,"centerRightBoard"),l(6,y,"bottomLeftBoard"),l(7,y,"bottomMiddleBoard"),l(8,y,"bottomRightBoard")),o.a.createElement("div",{className:"game-info"},o.a.createElement(f,{description:h?"Winner":"Next player",player:h||s,specialIcons:m}),o.a.createElement("br",null),o.a.createElement("button",{type:"button",className:"button specialIconsButton",onClick:function(){n(O(t,I()))}},m?"X vs. O":"Vue vs. React"),o.a.createElement(H,{replayInProgress:c,onClick:function(){i(t.history,t.specialIcons)}}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement(L,{gameState:t}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement(g,{gameState:t,onLoadGameClick:function(e){n(e)}}),o.a.createElement("br",null),o.a.createElement("ol",{className:"history"},p.map(X.bind(null,function(e){n(O(t,function(e){return{type:w,pointInHistory:e}}(e)))},b))),o.a.createElement("p",null,o.a.createElement("a",{href:"https://github.com/ldgit/react-tic-tac-toe/issues",target:"_blank",rel:"noopener noreferrer"},"Report bugs here")," ","|"," ",o.a.createElement("a",{href:"https://github.com/ldgit/react-tic-tac-toe",target:"_blank",rel:"noopener noreferrer"},"Source on Github"))))}function H(e){var t=e.onClick;return e.replayInProgress?o.a.createElement("span",{className:"replayInProgress"},"Replay in progress"):o.a.createElement("button",{type:"button",className:"button",onClick:t},"Replay game")}function X(e,t,n,r){var a=0===r?"Go to game start":"Go to move ".concat(r);return o.a.createElement("li",{key:r},o.a.createElement(R,{onClick:function(){return e(r)},highlight:t===r},a))}function F(){return o.a.createElement("div",{className:"container"},o.a.createElement(c,{name:"React"}),o.a.createElement(z,null))}n(8);!function(e){var t=e.createElement("div");e.body.appendChild(t),i.a.render(o.a.createElement(F,null),t)}(document)}]);