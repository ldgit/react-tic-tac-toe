!(function(n) {
  function e(e) {
    for (
      var r, i, c = e[0], u = e[1], l = e[2], d = 0, f = [];
      d < c.length;
      d++
    )
      (i = c[d]), o[i] && f.push(o[i][0]), (o[i] = 0);
    for (r in u) Object.prototype.hasOwnProperty.call(u, r) && (n[r] = u[r]);
    for (s && s(e); f.length; ) f.shift()();
    return a.push.apply(a, l || []), t();
  }
  function t() {
    for (var n, e = 0; e < a.length; e++) {
      for (var t = a[e], r = !0, c = 1; c < t.length; c++) {
        var u = t[c];
        0 !== o[u] && (r = !1);
      }
      r && (a.splice(e--, 1), (n = i((i.s = t[0]))));
    }
    return n;
  }
  var r = {},
    o = { 0: 0 },
    a = [];
  function i(e) {
    if (r[e]) return r[e].exports;
    var t = (r[e] = { i: e, l: !1, exports: {} });
    return n[e].call(t.exports, t, t.exports, i), (t.l = !0), t.exports;
  }
  (i.m = n),
    (i.c = r),
    (i.d = function(n, e, t) {
      i.o(n, e) || Object.defineProperty(n, e, { enumerable: !0, get: t });
    }),
    (i.r = function(n) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(n, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(n, '__esModule', { value: !0 });
    }),
    (i.t = function(n, e) {
      if ((1 & e && (n = i(n)), 8 & e)) return n;
      if (4 & e && 'object' == typeof n && n && n.__esModule) return n;
      var t = Object.create(null);
      if (
        (i.r(t),
        Object.defineProperty(t, 'default', { enumerable: !0, value: n }),
        2 & e && 'string' != typeof n)
      )
        for (var r in n)
          i.d(
            t,
            r,
            function(e) {
              return n[e];
            }.bind(null, r),
          );
      return t;
    }),
    (i.n = function(n) {
      var e =
        n && n.__esModule
          ? function() {
              return n.default;
            }
          : function() {
              return n;
            };
      return i.d(e, 'a', e), e;
    }),
    (i.o = function(n, e) {
      return Object.prototype.hasOwnProperty.call(n, e);
    }),
    (i.p = '');
  var c = (window.webpackJsonp = window.webpackJsonp || []),
    u = c.push.bind(c);
  (c.push = e), (c = c.slice());
  for (var l = 0; l < c.length; l++) e(c[l]);
  var s = u;
  a.push([19, 1]), t();
})([
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function(n, e, t) {
    var r = t(10);
    'string' == typeof r && (r = [[n.i, r, '']]);
    var o = { hmr: !0, transform: void 0, insertInto: void 0 };
    t(17)(r, o);
    r.locals && (n.exports = r.locals);
  },
  function(n, e, t) {
    e = n.exports = t(11)(!1);
    var r = t(12),
      o = r(t(13)),
      a = r(t(14)),
      i = r(t(15)),
      c = r(t(16));
    e.push([
      n.i,
      '* {\n  box-sizing: border-box; }\n\nbody {\n  font: 14px "Century Gothic", Futura, sans-serif;\n  height: 100%; }\n\nhtml {\n  height: 100%; }\n\nbody, button, html {\n  padding: 0;\n  margin: 0; }\n\n.container {\n  display: grid;\n  grid-template-columns: 80vmin;\n  margin-bottom: 1em;\n  padding: 10px;\n  justify-content: center; }\n\n.ultimate-board {\n  display: inline-grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 0.4em;\n  height: 80vmin; }\n\n.classic-board {\n  display: inline-grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 0.1em; }\n\n.status {\n  margin-bottom: 10px; }\n\n.square {\n  flex: 1;\n  justify-content: center;\n  align-items: center;\n  background-color: #fff;\n  border: none;\n  border: 1px solid #999;\n  font-size: 20px;\n  text-align: center;\n  vertical-align: middle; }\n\n.square:before {\n  content: \'\';\n  padding-bottom: 100%;\n  display: inline-block;\n  vertical-align: middle; }\n\n.square:focus {\n  outline: none; }\n\n.game-info {\n  margin-top: 20px;\n  margin-left: 20px; }\n\n.history {\n  list-style-type: none;\n  padding-left: 0; }\n\n.disabled-board button {\n  background-color: #f4f4f4; }\n\n.x-won-board button {\n  background-color: #EDFFEF; }\n\n.o-won-board button {\n  background-color: #EDFEFF; }\n\n.move-button {\n  background-color: white;\n  border: solid 1px;\n  border-color: #AAA;\n  color: #AAA;\n  padding: 3px 25px;\n  margin-bottom: 3px;\n  text-align: center;\n  box-shadow: none; }\n\n.current-move-button {\n  background-color: white;\n  border: solid 1px;\n  border-color: #111;\n  color: #111;\n  padding: 3px 25px;\n  margin-bottom: 3px;\n  text-align: center;\n  box-shadow: none; }\n\n.current-move-button:hover {\n  background-color: #111;\n  color: white; }\n\n.move-button:hover {\n  background-color: #AAA;\n  color: white; }\n\n.button {\n  background-color: white;\n  border: solid 1px;\n  border-color: #111;\n  color: #111;\n  padding: 3px 25px;\n  margin-bottom: 3px;\n  text-align: center;\n  box-shadow: none;\n  margin-left: 3px; }\n\n.button:hover {\n  background-color: #111;\n  color: white; }\n\nbutton.square-react-icon {\n  background-image: url(' +
        o +
        ');\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n  text-indent: 100%;\n  white-space: nowrap;\n  overflow: hidden; }\n\nbutton.square-vue-icon {\n  background-image: url(' +
        a +
        ');\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n  text-indent: 100%;\n  white-space: nowrap;\n  overflow: hidden; }\n\nbutton.square-x-icon {\n  background-image: url(' +
        i +
        ');\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n  text-indent: 100%;\n  white-space: nowrap;\n  overflow: hidden; }\n\nbutton.square-o-icon {\n  background-image: url(' +
        c +
        ');\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n  text-indent: 100%;\n  white-space: nowrap;\n  overflow: hidden; }\n\nbutton.react-icon {\n  background-image: url(' +
        o +
        ');\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n  text-indent: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n  flex: 1;\n  justify-content: center;\n  align-items: center;\n  background-color: #fff;\n  border: none;\n  min-width: 30px;\n  min-height: 30px; }\n\nbutton.vue-icon {\n  background-image: url(' +
        a +
        ');\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n  text-indent: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n  flex: 1;\n  justify-content: center;\n  align-items: center;\n  background-color: #fff;\n  border: none;\n  min-width: 30px;\n  min-height: 30px; }\n\nbutton.no-icon {\n  flex: 1;\n  justify-content: center;\n  align-items: center;\n  background-color: #fff;\n  border: none; }\n\nbutton.o-icon {\n  background-image: url(' +
        c +
        ');\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n  text-indent: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n  flex: 1;\n  justify-content: center;\n  align-items: center;\n  background-color: #fff;\n  border: none;\n  min-width: 30px;\n  min-height: 30px; }\n\nbutton.x-icon {\n  background-image: url(' +
        i +
        ');\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n  text-indent: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n  flex: 1;\n  justify-content: center;\n  align-items: center;\n  background-color: #fff;\n  border: none;\n  min-width: 30px;\n  min-height: 30px; }\n\n.urlShareInput {\n  height: 24px;\n  width: 60px;\n  margin-left: 0.5em;\n  margin-right: 0.5em; }\n\n.copyInfo {\n  color: #19a974; }\n',
      '',
    ]);
  },
  ,
  ,
  function(n, e, t) {
    n.exports = t.p + 'df23a7d86cfadcda4fc99cd589f68898.svg';
  },
  function(n, e, t) {
    n.exports = t.p + '575290762c34f659f5c0a11c6091468a.svg';
  },
  function(n, e, t) {
    n.exports = t.p + '6cdd90e66fe48891c64812b5d0fcab33.svg';
  },
  function(n, e, t) {
    n.exports = t.p + 'ccfb2de5d7b2289da62e8d70939e8e41.svg';
  },
  ,
  ,
  function(n, e, t) {
    'use strict';
    t.r(e);
    var r = t(0),
      o = t.n(r),
      a = t(2),
      i = t.n(a);
    function c(n) {
      var e = n.name;
      return o.a.createElement('h1', null, 'Ultimate tic-tac-toe in ', e);
    }
    function u(n) {
      for (
        var e = null,
          t = function(t) {
            var r = 3 * t,
              o = n.slice(r, r + 3);
            e = l(o) || e;
            var a = n.filter(function(n, e) {
              return e % 3 === t;
            });
            e = l(a) || e;
          },
          r = 0;
        r < 3;
        r += 1
      )
        t(r);
      var o = [n[0], n[4], n[8]];
      e = l(o) || e;
      var a = [n[2], n[4], n[6]];
      return (e = l(a) || e);
    }
    function l(n) {
      return n.every(function(n) {
        return 'X' === n;
      })
        ? 'X'
        : n.every(function(n) {
            return 'O' === n;
          })
        ? 'O'
        : null;
    }
    function s(n) {
      var e = n.value,
        t = n.onClick,
        r = n.squareTestId,
        a = (function(n) {
          var e = n.value,
            t = n.specialIcons;
          return 'X' === e
            ? t
              ? 'square-vue-icon square'
              : 'square-x-icon square'
            : 'O' === e
            ? t
              ? 'square-react-icon square'
              : 'square-o-icon square'
            : 'square';
        })({ value: e, specialIcons: n.specialIcons });
      return o.a.createElement(
        'button',
        { className: a, onClick: t, 'data-testid': r, type: 'button' },
        e,
      );
    }
    function d(n) {
      var e = n.squares,
        t = n.onClick,
        r = n.testId,
        a = n.className,
        i = n.specialIcons,
        c = void 0 !== i && i;
      function u(n, r) {
        return o.a.createElement(s, {
          value: e[n],
          onClick: function() {
            return t(n);
          },
          squareTestId: r,
          specialIcons: c,
        });
      }
      return o.a.createElement(
        'div',
        { 'data-testid': r, className: a },
        u('0', 'topLeftSquare'),
        u('1', 'topMiddleSquare'),
        u('2', 'topRightSquare'),
        u('3', 'centerLeftSquare'),
        u('4', 'centerMiddleSquare'),
        u('5', 'centerRightSquare'),
        u('6', 'bottomLeftSquare'),
        u('7', 'bottomMiddleSquare'),
        u('8', 'bottomRightSquare'),
      );
    }
    function f(n) {
      var e = n.description,
        t = n.player,
        r = n.specialIcons,
        a = (function(n) {
          var e = n.value,
            t = n.specialIcons;
          return 'X' === e
            ? t
              ? 'vue-icon'
              : 'x-icon'
            : 'O' === e
            ? t
              ? 'react-icon'
              : 'o-icon'
            : 'no-icon';
        })({ value: t, specialIcons: void 0 !== r && r });
      return o.a.createElement(
        'div',
        { className: 'game-status', 'data-testid': 'gameStatus' },
        e,
        ':',
        o.a.createElement(
          'button',
          { className: a, type: 'button', disabled: !0 },
          t,
        ),
      );
    }
    function p(n, e) {
      return (
        (function(n) {
          if (Array.isArray(n)) return n;
        })(n) ||
        (function(n, e) {
          var t = [],
            r = !0,
            o = !1,
            a = void 0;
          try {
            for (
              var i, c = n[Symbol.iterator]();
              !(r = (i = c.next()).done) &&
              (t.push(i.value), !e || t.length !== e);
              r = !0
            );
          } catch (n) {
            (o = !0), (a = n);
          } finally {
            try {
              r || null == c.return || c.return();
            } finally {
              if (o) throw a;
            }
          }
          return t;
        })(n, e) ||
        (function() {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance',
          );
        })()
      );
    }
    function b(n) {
      var e = n.onLoadGameClick,
        t = p(Object(r.useState)({}), 2),
        a = t[0],
        i = t[1];
      return o.a.createElement(
        'span',
        null,
        o.a.createElement('textarea', {
          'data-testid': 'importGameTextarea',
          onChange: function(n) {
            i(n.target.value);
          },
        }),
        o.a.createElement('br', null),
        o.a.createElement(
          'button',
          {
            type: 'button',
            className: 'button',
            onClick: function() {
              !(function(n) {
                try {
                  return JSON.parse(n), !0;
                } catch (n) {
                  return !1;
                }
              })(a)
                ? window.alert('Invalid save game JSON')
                : e(JSON.parse(a));
            },
          },
          'Load game',
        ),
      );
    }
    function m(n, e) {
      return (
        (function(n) {
          if (Array.isArray(n)) return n;
        })(n) ||
        (function(n, e) {
          var t = [],
            r = !0,
            o = !1,
            a = void 0;
          try {
            for (
              var i, c = n[Symbol.iterator]();
              !(r = (i = c.next()).done) &&
              (t.push(i.value), !e || t.length !== e);
              r = !0
            );
          } catch (n) {
            (o = !0), (a = n);
          } finally {
            try {
              r || null == c.return || c.return();
            } finally {
              if (o) throw a;
            }
          }
          return t;
        })(n, e) ||
        (function() {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance',
          );
        })()
      );
    }
    function g(n) {
      var e = n.gameState,
        t = n.onLoadGameClick,
        a = m(Object(r.useState)(!1), 2),
        i = a[0],
        c = a[1],
        u = m(Object(r.useState)(!1), 2),
        l = u[0],
        s = u[1];
      var d = o.a.createElement(
        'button',
        {
          type: 'button',
          className: 'button',
          onClick: function() {
            s(!1), c(!1);
          },
        },
        'Close',
      );
      return o.a.createElement(
        'span',
        null,
        o.a.createElement(
          'button',
          {
            type: 'button',
            className: 'button',
            onClick: function() {
              s(!1), c(e || !1);
            },
          },
          'Save',
        ),
        o.a.createElement(
          'button',
          {
            type: 'button',
            className: 'button',
            onClick: function() {
              s(!0), c(!1);
            },
          },
          'Load',
        ),
        (i || l) && d,
        o.a.createElement('br', null),
        i && o.a.createElement(v, { gameState: e }),
        l &&
          o.a.createElement(b, {
            onLoadGameClick: function(n) {
              s(!1), c(!1), t(n);
            },
          }),
      );
    }
    function v(n) {
      var e = n.gameState;
      return o.a.createElement('textarea', {
        'data-testid': 'exportGameTextarea',
        readOnly: !0,
        value: e ? JSON.stringify(e) : '',
      });
    }
    var h = t(3),
      y = t.n(h),
      x = 'PLAY_SQUARE',
      w = 'TIME_TRAVEL',
      k = 'TOGGLE_SPECIAL_ICONS';
    function E(n, e) {
      return {
        type: x,
        boardIndex: parseInt(n, 10),
        squareIndex: parseInt(e, 10),
      };
    }
    function I() {
      return { type: k };
    }
    function S(n) {
      return (
        (function(n) {
          if (Array.isArray(n)) {
            for (var e = 0, t = new Array(n.length); e < n.length; e++)
              t[e] = n[e];
            return t;
          }
        })(n) ||
        (function(n) {
          if (
            Symbol.iterator in Object(n) ||
            '[object Arguments]' === Object.prototype.toString.call(n)
          )
            return Array.from(n);
        })(n) ||
        (function() {
          throw new TypeError(
            'Invalid attempt to spread non-iterable instance',
          );
        })()
      );
    }
    function q() {
      var n =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : A(),
        e = arguments.length > 1 ? arguments[1] : void 0;
      switch (e.type) {
        case x:
          return (function(n, e) {
            var t = e.boardIndex,
              r = e.squareIndex;
            if (O(n.history[n.pointInHistory].boards)) return n;
            if (
              !(function(n, e, t) {
                var r = n.history[n.pointInHistory].boards[e];
                return r.isActive && null === r.squares[t] && !u(r.squares);
              })(n, t, r)
            )
              return n;
            var o = n.history[n.pointInHistory].boards
                .map(
                  ((c = t),
                  (l = r),
                  (s = n.nextPlayer),
                  function(n, e) {
                    if (e === c) {
                      var t = n.squares;
                      return Object.assign({}, n, {
                        squares: [].concat(
                          S(t.slice(0, l)),
                          [s],
                          S(t.slice(+l + 1)),
                        ),
                      });
                    }
                    return n;
                  }),
                )
                .map(
                  (function(n, e) {
                    return function(t, r, o) {
                      var a = r === parseInt(e, 10);
                      return Object.assign({}, t, {
                        isActive:
                          !!j(o, { boardIndex: n, squareIndex: e }) || a,
                      });
                    };
                  })(t, r),
                ),
              a = n.history,
              i = [].concat(S(a.slice(0, n.pointInHistory + 1)), [
                { boards: o },
              ]);
            var c, l, s;
            return Object.assign({}, n, {
              nextPlayer:
                ({ boardIndex: t, squareIndex: r },
                o,
                (d = n),
                'X' === d.nextPlayer ? 'O' : 'X'),
              history: i,
              pointInHistory: i.length - 1,
            });
            var d;
          })(n, e);
        case w:
          return (function(n, e) {
            var t = e.pointInHistory;
            return Object.assign({}, n, {
              pointInHistory: t,
              nextPlayer: t % 2 == 0 ? 'X' : 'O',
            });
          })(n, e);
        case k:
          return Object.assign({}, n, { specialIcons: !n.specialIcons });
        default:
          return n;
      }
    }
    function O(n) {
      var e = n.map(function(n) {
        return u(n.squares);
      });
      return u(e);
    }
    function A() {
      return {
        nextPlayer: 'X',
        history: [
          {
            boards: Array(9)
              .fill()
              .map(function() {
                return { squares: Array(9).fill(null), isActive: !0 };
              }),
          },
        ],
        pointInHistory: 0,
        specialIcons: !1,
      };
    }
    function j(n, e) {
      var t = e.squareIndex;
      return (
        0 ===
          n[t].squares.filter(function(n) {
            return null === n;
          }).length || !!u(n[t].squares)
      );
    }
    function C(n) {
      return n.length < 2
        ? []
        : n.reduce(function(n, e, t, r) {
            if (void 0 === r[t + 1]) return n;
            var o,
              a,
              i =
                ((o = e.boards),
                (a = r[t + 1].boards),
                o.reduce(function(n, e, t) {
                  if (null !== n) return n;
                  var r = null;
                  return (
                    e.squares.forEach(function(n, e) {
                      a[t].squares[e] !== n && (r = E(t, e));
                    }),
                    r
                  );
                }, null));
            return n.push(i), n;
          }, []);
    }
    function N(n) {
      return (
        (function(n) {
          if (Array.isArray(n)) {
            for (var e = 0, t = new Array(n.length); e < n.length; e++)
              t[e] = n[e];
            return t;
          }
        })(n) ||
        (function(n) {
          if (
            Symbol.iterator in Object(n) ||
            '[object Arguments]' === Object.prototype.toString.call(n)
          )
            return Array.from(n);
        })(n) ||
        (function() {
          throw new TypeError(
            'Invalid attempt to spread non-iterable instance',
          );
        })()
      );
    }
    function L(n, e) {
      return (
        (function(n) {
          if (Array.isArray(n)) return n;
        })(n) ||
        (function(n, e) {
          var t = [],
            r = !0,
            o = !1,
            a = void 0;
          try {
            for (
              var i, c = n[Symbol.iterator]();
              !(r = (i = c.next()).done) &&
              (t.push(i.value), !e || t.length !== e);
              r = !0
            );
          } catch (n) {
            (o = !0), (a = n);
          } finally {
            try {
              r || null == c.return || c.return();
            } finally {
              if (o) throw a;
            }
          }
          return t;
        })(n, e) ||
        (function() {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance',
          );
        })()
      );
    }
    function T(n) {
      var e = n.gameState,
        t = L(Object(r.useState)(''), 2),
        a = t[0],
        i = t[1],
        c = L(Object(r.useState)(null), 2),
        u = c[0],
        l = c[1];
      var s = (function(n) {
        if (null === n) return '';
        return n ? 'Url copied' : 'Copy the url from text input';
      })(u);
      return o.a.createElement(
        o.a.Fragment,
        null,
        o.a.createElement(
          'button',
          {
            type: 'button',
            className: 'button',
            onClick: function() {
              var n = (function(n) {
                var e = C(n.history),
                  t = (function(n) {
                    return 0 === n.length
                      ? ''
                      : n
                          .map(function(n) {
                            return n.type === x
                              ? 'a[]=p'
                                  .concat(n.boardIndex)
                                  .concat(n.squareIndex)
                              : 'a[]=ti';
                          })
                          .join('&');
                  })(n.specialIcons ? [I()].concat(N(e)) : e),
                  r = window.location,
                  o = r.protocol,
                  a = r.host,
                  i = r.pathname,
                  c = ''
                    .concat(o, '//')
                    .concat(a)
                    .concat(i);
                return ''.concat(c, '?').concat(t);
              })(e);
              i(n), l(y()(n));
            },
          },
          'Share game',
        ),
        o.a.createElement('input', {
          type: 'text',
          onChange: function() {},
          className: 'urlShareInput',
          'data-testid': 'urlShareInput',
          value: a,
        }),
        o.a.createElement('span', { className: 'copyInfo' }, s),
      );
    }
    function P(n) {
      var e = n.onClick,
        t = n.children,
        r = n.highlight,
        a = void 0 !== r && r ? 'current-move-button' : 'move-button';
      return o.a.createElement(
        'button',
        { type: 'button', className: a, onClick: e },
        t,
      );
    }
    function G(n, e) {
      return (
        (function(n) {
          if (Array.isArray(n)) return n;
        })(n) ||
        (function(n, e) {
          var t = [],
            r = !0,
            o = !1,
            a = void 0;
          try {
            for (
              var i, c = n[Symbol.iterator]();
              !(r = (i = c.next()).done) &&
              (t.push(i.value), !e || t.length !== e);
              r = !0
            );
          } catch (n) {
            (o = !0), (a = n);
          } finally {
            try {
              r || null == c.return || c.return();
            } finally {
              if (o) throw a;
            }
          }
          return t;
        })(n, e) ||
        (function() {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance',
          );
        })()
      );
    }
    function _(n) {
      Object(r.useEffect)(
        function() {
          var e = (function(n) {
            return n.reduce(q, A());
          })(
            (function(n) {
              return n
                ? n
                    .split('&')
                    .filter(function(n) {
                      return 0 === n.indexOf('a[]=');
                    })
                    .map(function(n) {
                      return n.split('=')[1];
                    })
                    .map(function(n) {
                      return 'ti' === n ? I() : E(n[1], n[2]);
                    })
                : [];
            })(G(window.location.href.split('?'), 2)[1]),
          );
          n(e);
        },
        [n],
      );
    }
    function M(n, e) {
      return (
        (function(n) {
          if (Array.isArray(n)) return n;
        })(n) ||
        (function(n, e) {
          var t = [],
            r = !0,
            o = !1,
            a = void 0;
          try {
            for (
              var i, c = n[Symbol.iterator]();
              !(r = (i = c.next()).done) &&
              (t.push(i.value), !e || t.length !== e);
              r = !0
            );
          } catch (n) {
            (o = !0), (a = n);
          } finally {
            try {
              r || null == c.return || c.return();
            } finally {
              if (o) throw a;
            }
          }
          return t;
        })(n, e) ||
        (function() {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance',
          );
        })()
      );
    }
    function R() {
      var n = M(Object(r.useState)(q(void 0, '')), 2),
        e = n[0],
        t = n[1];
      function a(n, r, a) {
        var i = r[n],
          c = 'classic-board '.concat(
            (function(n) {
              var e = u(n.squares);
              return 'X' === e
                ? 'x-won-board'
                : 'O' === e
                ? 'o-won-board'
                : n.isActive
                ? ''
                : 'disabled-board';
            })(i),
          ),
          l = e.specialIcons;
        return o.a.createElement(d, {
          className: c,
          squares: i.squares,
          testId: a,
          onClick: function(r) {
            return (function(n, r) {
              t(q(e, E(n, r)));
            })(n, r);
          },
          specialIcons: l,
        });
      }
      _(t);
      var i = e.nextPlayer,
        c = e.history,
        l = e.pointInHistory,
        s = e.specialIcons,
        p = c[l].boards,
        b = O(p);
      return o.a.createElement(
        o.a.Fragment,
        null,
        o.a.createElement(
          'div',
          { className: 'ultimate-board' },
          a(0, p, 'topLeftBoard'),
          a(1, p, 'topMiddleBoard'),
          a(2, p, 'topRightBoard'),
          a(3, p, 'centerLeftBoard'),
          a(4, p, 'centerMiddleBoard'),
          a(5, p, 'centerRightBoard'),
          a(6, p, 'bottomLeftBoard'),
          a(7, p, 'bottomMiddleBoard'),
          a(8, p, 'bottomRightBoard'),
        ),
        o.a.createElement(
          'div',
          { className: 'game-info' },
          o.a.createElement(f, {
            description: b ? 'Winner' : 'Next player',
            player: b || i,
            specialIcons: s,
          }),
          o.a.createElement('br', null),
          o.a.createElement(
            'button',
            {
              type: 'button',
              className: 'button',
              onClick: function() {
                t(q(e, I()));
              },
            },
            'Vue vs. React?',
          ),
          o.a.createElement('br', null),
          o.a.createElement('br', null),
          o.a.createElement(T, { gameState: e }),
          o.a.createElement('br', null),
          o.a.createElement('br', null),
          o.a.createElement(g, {
            gameState: e,
            onLoadGameClick: function(n) {
              t(n);
            },
          }),
          o.a.createElement('br', null),
          o.a.createElement(
            'ol',
            { className: 'history' },
            c.map(
              function(n, e, t, r) {
                var a = 0 === r ? 'Go to game start' : 'Go to move '.concat(r);
                return o.a.createElement(
                  'li',
                  { key: r },
                  o.a.createElement(
                    P,
                    {
                      onClick: function() {
                        return n(r);
                      },
                      highlight: e === r,
                    },
                    a,
                  ),
                );
              }.bind(
                null,
                function(n) {
                  t(
                    q(
                      e,
                      (function(n) {
                        return { type: w, pointInHistory: n };
                      })(n),
                    ),
                  );
                },
                l,
              ),
            ),
          ),
          o.a.createElement(
            'p',
            null,
            o.a.createElement(
              'a',
              {
                href: 'https://github.com/ldgit/react-tic-tac-toe/issues',
                target: '_blank',
                rel: 'noopener noreferrer',
              },
              'Report bugs here',
            ),
            ' ',
            '|',
            ' ',
            o.a.createElement(
              'a',
              {
                href: 'https://github.com/ldgit/react-tic-tac-toe',
                target: '_blank',
                rel: 'noopener noreferrer',
              },
              'Source on Github',
            ),
          ),
        ),
      );
    }
    function z() {
      return o.a.createElement(
        'div',
        { className: 'container' },
        o.a.createElement(c, { name: 'React' }),
        o.a.createElement(R, null),
      );
    }
    t(9);
    !(function(n) {
      var e = n.createElement('div');
      n.body.appendChild(e), i.a.render(o.a.createElement(z, null), e);
    })(document);
  },
]);
