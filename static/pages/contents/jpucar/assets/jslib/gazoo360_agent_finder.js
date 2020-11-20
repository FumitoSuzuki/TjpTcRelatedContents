/*
 * UserAgentでサポートを判別するヘルパーClass
 *
 * OS
 * ・Windows:Vista以下
 * ・Mac: macOS X 10.10 Yosemite以下
 * ・iPhone/iPad : iOS9.2.1以下
 * ・Android : Android4.3.1以下
 *
 * ブラウザ
 * ・Internet Exproler 10以下
 * ・Edge 13以下
 * ・Google Chrome 56.0以下
 * ・Safari 9.0以下
 * ・Firefox 52.5.2以下
 */
var agentFinder = (function() {
  function agentFinder() {
    var _this = this;

    /*
     * 任意判定用拡張関数です。
     * この中で _this.isSupportをfalseにするとサポート外判定されます。
     * 追加のブラウザ等が発生した折、こちらに記述すると容易かと存じます。
     */
    this.detectOptional = function() {
      // console.log(bowser);
      //-  _this.isSupport = false;
    };

    /*
     * OS判別
     * Android / iOSはOSのみで特定できるためこちらのみ
     */
    this.detectOS = function() {
      //-  OS
      if (bowser.osname === 'Windows') {
        if (Number(_this.getSecondMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i)) < 6.1) _this.isSupport = false;
      }
      if (bowser.osname === 'macOS') {
        var mac = bowser.osversion.split('.').join('');
        while (mac.length < 4) {
          mac = mac + '0';
        }
        var majorVersion = mac.substr(0, 4);

        if (Number(majorVersion) <= 1010) _this.isSupport = false;
      }
      if (bowser.osname === 'Android') {
        if (bowser.osversion.indexOf('.') !== -1) {
          if (Number(bowser.osversion.replace('.', '')) < 43.2) _this.isSupport = false;
        } else {
          if (Number(bowser.osversion) < 4.32) _this.isSupport = false;
        }
      }
      if (bowser.osname === 'iOS') {
        if (Number(bowser.osversion.replace('.', '')) < 92.2) _this.isSupport = false;
      }
    };

    /*
     * ブラウザー判別
     * PCの際は更に詳細にブラウザを特定します。
     */
    this.detectBrowser = function() {
      if (bowser.name === 'Internet Explorer') {
        if (Number(bowser.version) <= 10) {
          _this.isSupport = false;
          this.ieVersion = Number(bowser.version);
        }
      }
      if (bowser.name === 'Microsoft Edge') {
        if (Number(bowser.version.split('.')[0]) <= 12) _this.isSupport = false;
      }
      if (bowser.name === 'Chrome') {
        if (Number(bowser.version) <= 56) _this.isSupport = false;
      }
      if (bowser.name === 'Safari') {
        if (Number(bowser.version.replace('.', '')) <= 90) _this.isSupport = false;
      }
      if (bowser.name === 'Firefox') {
        if (Number(bowser.version) <= 52) _this.isSupport = false;
      }
    };

    /*
     * 結果表示。ここに至るまでに
     * _this.isSupportがfalseになっていれば対象外です。
     * trueの場合はreturnで抜けています。
     */
    this.showResult = function() {
      if (_this.isSupport) return;

      var html =
        '<div class="support-window"><div class="support-window__inner"><p>ご利用の環境（OS/ブラウザ）は<br>360°Viewに対応しておりません。<br>推奨環境のOS/ブラウザにてご利用ください。</p><p>推奨環境は<a href="https://gazoo.com/attribute/" target="_blank" rel="noopener noreferrer">こちら</a></p></div></div>';
      var dom = document.querySelector('.gallery__viewer');
      dom.insertAdjacentHTML('afterbegin', html);

      if (dom.classList) dom.classList.remove('still');
      else dom.className.replace('still', '');

      var gallery = document.getElementById('gallery');
      if (gallery.classList) gallery.classList.add('no-support');
      else gallery.className += ' no-support';

      if (this.ieVersion < 11) {
        if (gallery.classList) gallery.classList.add('ie');
        else gallery.className += ' ie';
      }

      var photo = document.querySelector('.photo');
      photo.style.display = 'none';
    };

    /*
     * 正規表現に一致した値を戻すヘルパー関数。windows判別用;
     */
    this.getSecondMatch = function(regex) {
      var match = _this.ua.match(regex);
      return (match && match.length > 1 && match[3]) || '';
    };

    /*
     * 起動: constructor ES5
     */
    this.ua = navigator.userAgent;
    this.isSupport = true;
    this.ieVersion = 11;

    //-  OSを判別
    this.detectOS();

    //-  任意記述関数
    this.detectOptional();

    //-  タブレットかモバイルの場合はOS判別だけで良いので結果表示へ
    if (bowser.tablet || bowser.mobile) {
      this.showResult();
      return;
    }

    //-  PCの場合はブラウザを判別し結果表示へ
    this.detectBrowser();
    this.showResult();
  }
  return agentFinder;
})();

/* ===================================================================
正規表現での判定は難解になるため、ヘルパーライブラリでの判別にしました。
console.log(bowser);
とするとOSやブラウザの情報が容易に把握出来ます。
https://github.com/ded/bowser
=================================================================== */

/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */
// prettier-ignore
! function (e, t, n) {
  typeof module != "undefined" && module.exports ? module.exports = n() : typeof define == "function" && define.amd ? define(t, n) : e[t] = n()
}(this, "bowser", function () {
  function t(t) {
    function n(e) {
      var n = t.match(e);
      return n && n.length > 1 && n[1] || ""
    }

    function r(e) {
      var n = t.match(e);
      return n && n.length > 1 && n[2] || ""
    }

    function N(e) {
      switch (e) {
        case "NT":
          return "NT";
        case "XP":
          return "XP";
        case "NT 5.0":
          return "2000";
        case "NT 5.1":
          return "XP";
        case "NT 5.2":
          return "2003";
        case "NT 6.0":
          return "Vista";
        case "NT 6.1":
          return "7";
        case "NT 6.2":
          return "8";
        case "NT 6.3":
          return "8.1";
        case "NT 10.0":
          return "10";
        default:
          return undefined
      }
    }
    var i = n(/(ipod|iphone|ipad)/i).toLowerCase(),
      s = /like android/i.test(t),
      o = !s && /android/i.test(t),
      u = /nexus\s*[0-6]\s*/i.test(t),
      a = !u && /nexus\s*[0-9]+/i.test(t),
      f = /CrOS/.test(t),
      l = /silk/i.test(t),
      c = /sailfish/i.test(t),
      h = /tizen/i.test(t),
      p = /(web|hpw)os/i.test(t),
      d = /windows phone/i.test(t),
      v = /SamsungBrowser/i.test(t),
      m = !d && /windows/i.test(t),
      g = !i && !l && /macintosh/i.test(t),
      y = !o && !c && !h && !p && /linux/i.test(t),
      b = r(/edg([ea]|ios)\/(\d+(\.\d+)?)/i),
      w = n(/version\/(\d+(\.\d+)?)/i),
      E = /tablet/i.test(t) && !/tablet pc/i.test(t),
      S = !E && /[^-]mobi/i.test(t),
      x = /xbox/i.test(t),
      T;
    /opera/i.test(t) ? T = {
      name: "Opera",
      opera: e,
      version: w || n(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
    } : /opr\/|opios/i.test(t) ? T = {
      name: "Opera",
      opera: e,
      version: n(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || w
    } : /SamsungBrowser/i.test(t) ? T = {
      name: "Samsung Internet for Android",
      samsungBrowser: e,
      version: w || n(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
    } : /coast/i.test(t) ? T = {
      name: "Opera Coast",
      coast: e,
      version: w || n(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
    } : /yabrowser/i.test(t) ? T = {
      name: "Yandex Browser",
      yandexbrowser: e,
      version: w || n(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
    } : /ucbrowser/i.test(t) ? T = {
      name: "UC Browser",
      ucbrowser: e,
      version: n(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
    } : /mxios/i.test(t) ? T = {
      name: "Maxthon",
      maxthon: e,
      version: n(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
    } : /epiphany/i.test(t) ? T = {
      name: "Epiphany",
      epiphany: e,
      version: n(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
    } : /puffin/i.test(t) ? T = {
      name: "Puffin",
      puffin: e,
      version: n(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
    } : /sleipnir/i.test(t) ? T = {
      name: "Sleipnir",
      sleipnir: e,
      version: n(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
    } : /k-meleon/i.test(t) ? T = {
      name: "K-Meleon",
      kMeleon: e,
      version: n(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
    } : d ? (T = {
      name: "Windows Phone",
      osname: "Windows Phone",
      windowsphone: e
    }, b ? (T.msedge = e, T.version = b) : (T.msie = e, T.version = n(/iemobile\/(\d+(\.\d+)?)/i))) : /msie|trident/i.test(t) ? T = {
      name: "Internet Explorer",
      msie: e,
      version: n(/(?:msie |rv:)(\d+(\.\d+)?)/i)
    } : f ? T = {
      name: "Chrome",
      osname: "Chrome OS",
      chromeos: e,
      chromeBook: e,
      chrome: e,
      version: n(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
    } : /edg([ea]|ios)/i.test(t) ? T = {
      name: "Microsoft Edge",
      msedge: e,
      version: b
    } : /vivaldi/i.test(t) ? T = {
      name: "Vivaldi",
      vivaldi: e,
      version: n(/vivaldi\/(\d+(\.\d+)?)/i) || w
    } : c ? T = {
      name: "Sailfish",
      osname: "Sailfish OS",
      sailfish: e,
      version: n(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
    } : /seamonkey\//i.test(t) ? T = {
      name: "SeaMonkey",
      seamonkey: e,
      version: n(/seamonkey\/(\d+(\.\d+)?)/i)
    } : /firefox|iceweasel|fxios/i.test(t) ? (T = {
      name: "Firefox",
      firefox: e,
      version: n(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
    }, /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(t) && (T.firefoxos = e, T.osname = "Firefox OS")) : l ? T = {
      name: "Amazon Silk",
      silk: e,
      version: n(/silk\/(\d+(\.\d+)?)/i)
    } : /phantom/i.test(t) ? T = {
      name: "PhantomJS",
      phantom: e,
      version: n(/phantomjs\/(\d+(\.\d+)?)/i)
    } : /slimerjs/i.test(t) ? T = {
      name: "SlimerJS",
      slimer: e,
      version: n(/slimerjs\/(\d+(\.\d+)?)/i)
    } : /blackberry|\bbb\d+/i.test(t) || /rim\stablet/i.test(t) ? T = {
      name: "BlackBerry",
      osname: "BlackBerry OS",
      blackberry: e,
      version: w || n(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
    } : p ? (T = {
      name: "WebOS",
      osname: "WebOS",
      webos: e,
      version: w || n(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
    }, /touchpad\//i.test(t) && (T.touchpad = e)) : /bada/i.test(t) ? T = {
      name: "Bada",
      osname: "Bada",
      bada: e,
      version: n(/dolfin\/(\d+(\.\d+)?)/i)
    } : h ? T = {
      name: "Tizen",
      osname: "Tizen",
      tizen: e,
      version: n(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || w
    } : /qupzilla/i.test(t) ? T = {
      name: "QupZilla",
      qupzilla: e,
      version: n(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || w
    } : /chromium/i.test(t) ? T = {
      name: "Chromium",
      chromium: e,
      version: n(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || w
    } : /chrome|crios|crmo/i.test(t) ? T = {
      name: "Chrome",
      chrome: e,
      version: n(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
    } : o ? T = {
      name: "Android",
      version: w
    } : /safari|applewebkit/i.test(t) ? (T = {
      name: "Safari",
      safari: e
    }, w && (T.version = w)) : i ? (T = {
      name: i == "iphone" ? "iPhone" : i == "ipad" ? "iPad" : "iPod"
    }, w && (T.version = w)) : /googlebot/i.test(t) ? T = {
      name: "Googlebot",
      googlebot: e,
      version: n(/googlebot\/(\d+(\.\d+))/i) || w
    } : T = {
      name: n(/^(.*)\/(.*) /),
      version: r(/^(.*)\/(.*) /)
    }, !T.msedge && /(apple)?webkit/i.test(t) ? (/(apple)?webkit\/537\.36/i.test(t) ? (T.name = T.name || "Blink", T.blink = e) : (T.name = T.name || "Webkit", T.webkit = e), !T.version && w && (T.version = w)) : !T.opera && /gecko\//i.test(t) && (T.name = T.name || "Gecko", T.gecko = e, T.version = T.version || n(/gecko\/(\d+(\.\d+)?)/i)), !T.windowsphone && (o || T.silk) ? (T.android = e, T.osname = "Android") : !T.windowsphone && i ? (T[i] = e, T.ios = e, T.osname = "iOS") : g ? (T.mac = e, T.osname = "macOS") : x ? (T.xbox = e, T.osname = "Xbox") : m ? (T.windows = e, T.osname = "Windows") : y && (T.linux = e, T.osname = "Linux");
    var C = "";
    T.windows ? C = N(n(/Windows ((NT|XP)( \d\d?.\d)?)/i)) : T.windowsphone ? C = n(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i) : T.mac ? (C = n(/Mac OS X (\d+([_\.\s]\d+)*)/i), C = C.replace(/[_\s]/g, ".")) : i ? (C = n(/os (\d+([_\s]\d+)*) like mac os x/i), C = C.replace(/[_\s]/g, ".")) : o ? C = n(/android[ \/-](\d+(\.\d+)*)/i) : T.webos ? C = n(/(?:web|hpw)os\/(\d+(\.\d+)*)/i) : T.blackberry ? C = n(/rim\stablet\sos\s(\d+(\.\d+)*)/i) : T.bada ? C = n(/bada\/(\d+(\.\d+)*)/i) : T.tizen && (C = n(/tizen[\/\s](\d+(\.\d+)*)/i)), C && (T.osversion = C);
    var k = !T.windows && C.split(".")[0];
    if (E || a || i == "ipad" || o && (k == 3 || k >= 4 && !S) || T.silk) T.tablet = e;
    else if (S || i == "iphone" || i == "ipod" || o || u || T.blackberry || T.webos || T.bada) T.mobile = e;
    return T.msedge || T.msie && T.version >= 10 || T.yandexbrowser && T.version >= 15 || T.vivaldi && T.version >= 1 || T.chrome && T.version >= 20 || T.samsungBrowser && T.version >= 4 || T.firefox && T.version >= 20 || T.safari && T.version >= 6 || T.opera && T.version >= 10 || T.ios && T.osversion && T.osversion.split(".")[0] >= 6 || T.blackberry && T.version >= 10.1 || T.chromium && T.version >= 20 ? T.a = e : T.msie && T.version < 10 || T.chrome && T.version < 20 || T.firefox && T.version < 20 || T.safari && T.version < 6 || T.opera && T.version < 10 || T.ios && T.osversion && T.osversion.split(".")[0] < 6 || T.chromium && T.version < 20 ? T.c = e : T.x = e, T
  }

  function r(e) {
    return e.split(".").length
  }

  function i(e, t) {
    var n = [],
      r;
    if (Array.prototype.map) return Array.prototype.map.call(e, t);
    for (r = 0; r < e.length; r++) n.push(t(e[r]));
    return n
  }

  function s(e) {
    var t = Math.max(r(e[0]), r(e[1])),
      n = i(e, function (e) {
        var n = t - r(e);
        return e += (new Array(n + 1)).join(".0"), i(e.split("."), function (e) {
          return (new Array(20 - e.length)).join("0") + e
        }).reverse()
      });
    while (--t >= 0) {
      if (n[0][t] > n[1][t]) return 1;
      if (n[0][t] !== n[1][t]) return -1;
      if (t === 0) return 0
    }
  }

  function o(e, r, i) {
    var o = n;
    typeof r == "string" && (i = r, r = void 0), r === void 0 && (r = !1), i && (o = t(i));
    var u = "" + o.version;
    for (var a in e)
      if (e.hasOwnProperty(a) && o[a]) {
        if (typeof e[a] != "string") throw new Error("Browser version in the minVersion map should be a string: " + a + ": " + String(e));
        return s([u, e[a]]) < 0
      }
    return r
  }

  function u(e, t, n) {
    return !o(e, t, n)
  }
  var e = !0,
    n = t(typeof navigator != "undefined" ? navigator.userAgent || "" : "");
  return n.test = function (e) {
    for (var t = 0; t < e.length; ++t) {
      var r = e[t];
      if (typeof r == "string" && r in n) return !0
    }
    return !1
  }, n.isUnsupportedBrowser = o, n.compareVersions = s, n.check = u, n._detect = t, n.detect = t, n
})

/*
 * Domを取得後でないとクラス追加等が出来ないので準備完了時に発動
 */
if (document.readyState != 'loading') {
  new agentFinder();
} else if (document.addEventListener) {
  window.addEventListener('DOMContentLoaded', function() {
    new agentFinder();
  });
} else {
  document.attachEvent('onreadystatechange', function() {
    if (document.readyState != 'loading') new agentFinder();
  });
}
