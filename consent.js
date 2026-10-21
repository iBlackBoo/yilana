/* ==========================================================================
 * consent.js — Google 认证 CMP 接管 + 自建横幅兜底
 * --------------------------------------------------------------------------
 * 用法：在 </body> 前引入 <script src="consent.js" defer></script>
 *       详情页用 ../consent.js，脚本会自行推导 privacy.html 的相对路径。
 *
 * 模式（页面里可覆盖：window.YL_CMP = { mode: 'self' }，需在 consent.js 之前执行）
 *   'google'（默认）Google 自家的认证 CMP —— 在 AdSense「隐私权和消息 → 欧洲法规」
 *                    发布消息后，由 adsbygoogle.js 自动下发；本站不再显示自己的横幅。
 *                    找不到 Google CMP 时（未发布消息 / 被广告拦截器屏蔽），
 *                    若 fallback 为 true 则用自建横幅兜底，避免完全裸奔。
 *   'self'          只用自建横幅（旧行为，留作回退）
 *   'off'           两者都不启用
 *
 * 撤回同意：
 *   window.ylConsent.open() 优先调用 googlefc.showRevocationMessage()，
 *   只有在页面没有 Google CMP 时才展开自建横幅。
 *
 * 地区：Consent Mode 默认值本身是分地区的（EEA/英国/瑞士拒绝，其他放行），
 *   见各页面 <head>。兜底横幅同样只在同意地区自动弹出（regionGate），
 *   其他地区不打扰访客；页脚「Cookie 设置」仍然随时可用。
 * ========================================================================== */
(function () {
    'use strict';

    /* ---------------- 配置 ---------------- */
    var DEFAULTS = {
        mode: 'google',
        fallback: true,
        waitMs: 2500,
        // 只在「需要事先同意」的地区自动弹兜底横幅；
        // 其他地区 Consent Mode 默认已放行，再弹一次是多余打扰。
        regionGate: true
    };
    var CFG = {};
    (function () {
        var o = window.YL_CMP || {};
        for (var k in DEFAULTS) {
            if (Object.prototype.hasOwnProperty.call(DEFAULTS, k)) CFG[k] = DEFAULTS[k];
        }
        for (var j in o) {
            if (Object.prototype.hasOwnProperty.call(o, j)) CFG[j] = o[j];
        }
    })();

    var KEY = 'yilana.consent';
    var LANG_KEY = 'yilana.lang';

    /* ---------- 路径推导：兼容根目录与 effects/ 子目录 ---------- */
    var self = document.currentScript || (function () {
        var all = document.getElementsByTagName('script');
        return all[all.length - 1];
    })();
    var BASE = '';
    if (self && self.src) BASE = self.src.replace(/[^/]*$/, '');

    /* ---------- 文案（仅兜底横幅使用） ---------- */
    var TEXT = {
        en: {
            title: 'Cookies & privacy',
            body: 'This site stores your language choice locally. With your consent, Google AdSense sets cookies to serve and measure ads. You can change your choice at any time.',
            accept: 'Accept all',
            necessary: 'Necessary only',
            link: 'Privacy policy'
        },
        zh: {
            title: 'Cookie 与隐私',
            body: '本站只在本地保存你的语言选择。若你同意，Google AdSense 会设置 Cookie 用于展示和衡量广告。你可以随时更改这个选择。',
            accept: '全部接受',
            necessary: '仅必要',
            link: '隐私政策'
        }
    };

    /* ---------- 语言判定 ----------
     * 页面自身的 <html lang> 优先：站点脚本切语言后会清掉 ?lang，
     * 若这里再按 URL 判定，横幅就会和正文语言打架。
     */
    function detectLang() {
        var h = (document.documentElement.lang || '').toLowerCase();
        if (h.indexOf('zh') === 0) return 'zh';
        if (h === 'en') return 'en';
        var q = null;
        try { q = new URLSearchParams(location.search).get('lang'); } catch (e) {}
        if (q === 'en' || q === 'zh') return q;
        try {
            var s = localStorage.getItem(LANG_KEY);
            if (s === 'en' || s === 'zh') return s;
        } catch (e) {}
        return /^zh\b/i.test(navigator.language || '') ? 'zh' : 'en';
    }

    /* ---------- 地区判定（仅用于决定「是否自动弹兜底横幅」） ----------
     * 说明：Consent Mode 的 region 匹配由 Google 按 IP 在服务端完成，
     * 浏览器拿不到那个结果。这里用「语言里的地区 + 时区」做近似判断，
     * 判断偏保守——拿不准就当需要同意，多弹一次横幅不会违规，
     * 少弹一次才会（因为广告默认被拒，最多是收入损失，不会合规出事）。
     */
    var CONSENT_REGIONS = {
        AT: 1, BE: 1, BG: 1, HR: 1, CY: 1, CZ: 1, DK: 1, EE: 1, FI: 1, FR: 1,
        DE: 1, GR: 1, HU: 1, IE: 1, IT: 1, LV: 1, LT: 1, LU: 1, MT: 1, NL: 1,
        PL: 1, PT: 1, RO: 1, SK: 1, SI: 1, ES: 1, SE: 1,          // EU 27
        IS: 1, LI: 1, NO: 1,                                     // EEA 其余
        GB: 1, CH: 1                                              // 英国 / 瑞士
    };

    var CONSENT_TZ = {
        'Europe/Vienna': 1, 'Europe/Brussels': 1, 'Europe/Sofia': 1,
        'Asia/Nicosia': 1, 'Asia/Famagusta': 1, 'Europe/Prague': 1,
        'Europe/Copenhagen': 1, 'Europe/Tallinn': 1, 'Europe/Helsinki': 1,
        'Europe/Paris': 1, 'Europe/Berlin': 1, 'Europe/Athens': 1,
        'Europe/Budapest': 1, 'Europe/Dublin': 1, 'Europe/Rome': 1,
        'Europe/Riga': 1, 'Europe/Vilnius': 1, 'Europe/Luxembourg': 1,
        'Europe/Malta': 1, 'Europe/Amsterdam': 1, 'Europe/Warsaw': 1,
        'Europe/Lisbon': 1, 'Atlantic/Madeira': 1, 'Atlantic/Canary': 1,
        'Europe/Bucharest': 1, 'Europe/Bratislava': 1, 'Europe/Ljubljana': 1,
        'Europe/Madrid': 1, 'Europe/Stockholm': 1,
        'Atlantic/Reykjavik': 1, 'Europe/Vaduz': 1, 'Europe/Oslo': 1,
        'Europe/London': 1, 'Europe/Jersey': 1, 'Europe/Guernsey': 1,
        'Europe/Isle_of_Man': 1, 'Europe/Gibraltar': 1, 'Europe/Belfast': 1,
        'Europe/Zurich': 1
    };

    function regionFromLocale() {
        var langs = navigator.languages || [navigator.language || ''];
        var i, m, cc;
        for (i = 0; i < langs.length; i++) {
            m = /[-_]([A-Za-z]{2})(?:$|[-_])/.exec(String(langs[i] || ''));
            if (m) {
                cc = m[1].toUpperCase();
                if (CONSENT_REGIONS[cc]) return cc;
            }
        }
        // Intl 的默认 locale 通常与 navigator.language 一致，
        // 但在部分环境（如企业策略、隐私模式）里会不同，作为补充信号。
        try {
            var il = Intl.DateTimeFormat().resolvedOptions().locale || '';
            m = /[-_]([A-Za-z]{2})(?:$|[-_])/.exec(il);
            if (m) {
                cc = m[1].toUpperCase();
                if (CONSENT_REGIONS[cc]) return cc;
            }
        } catch (e) {}
        return null;
    }

    function regionFromTimezone() {
        try {
            var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            return CONSENT_TZ[tz] ? tz : null;
        } catch (e) {
            return null;
        }
    }

    /** 是否属于「必须事先取得同意」的地区（近似判断） */
    function inConsentRegion() {
        return !!(regionFromLocale() || regionFromTimezone());
    }

    function readChoice() {
        try {
            var v = localStorage.getItem(KEY);
            return v === 'all' || v === 'necessary' ? v : null;
        } catch (e) {
            return null;
        }
    }

    function saveChoice(v) {
        try { localStorage.setItem(KEY, v); } catch (e) {}
    }

    /* ---------- Consent Mode 同步（仅自建横幅路径使用） ---------- */
    function pushConsent(granted) {
        var state = granted ? 'granted' : 'denied';
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                ad_storage: state,
                ad_user_data: state,
                ad_personalization: state,
                analytics_storage: 'denied'
            });
        }
        try {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: 'yl_consent_update', consent: state });
        } catch (e) {}
    }

    /* ---------- Google CMP 探测 ---------- */
    function hasGoogleCmp() {
        var fc = window.googlefc;
        if (!fc) return false;
        // 官方 API 挂在 googlefc.callbackQueue 上；脚本未就绪时可能只有空对象
        return !!(fc.callbackQueue && typeof fc.callbackQueue.push === 'function');
    }

    /* 调用 Google 的撤回同意流程（官方推荐写法） */
    function openGoogleRevocation() {
        try {
            window.googlefc = window.googlefc || {};
            window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
            if (typeof window.googlefc.showRevocationMessage === 'function') {
                window.googlefc.callbackQueue.push(window.googlefc.showRevocationMessage);
            } else {
                window.googlefc.callbackQueue.push({
                    'CONSENT_API_READY': function () {
                        try { window.googlefc.showRevocationMessage(); } catch (e) {}
                    }
                });
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    /* ---------- 样式 ---------- */
    function loadCSS() {
        if (document.querySelector('link[data-ylc]')) return;
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = BASE + 'consent.css';
        l.setAttribute('data-ylc', '1');
        document.head.appendChild(l);
    }

    /* ---------- 兜底横幅 ---------- */
    var banner = null;

    function build() {
        var L = TEXT[detectLang()];
        var el = document.createElement('div');
        el.className = 'ylc-banner';
        el.setAttribute('role', 'dialog');
        el.setAttribute('aria-label', L.title);
        el.setAttribute('aria-live', 'polite');

        var head = document.createElement('div');
        head.className = 'ylc-head';
        head.innerHTML = '<span class="ylc-icon" aria-hidden="true">🍪</span><span></span>';
        head.lastChild.textContent = L.title;

        var body = document.createElement('p');
        body.className = 'ylc-body';
        body.appendChild(document.createTextNode(L.body + ' '));
        var a = document.createElement('a');
        a.href = BASE + 'privacy.html';
        a.textContent = L.link;
        body.appendChild(a);

        var actions = document.createElement('div');
        actions.className = 'ylc-actions';

        var bAccept = document.createElement('button');
        bAccept.type = 'button';
        bAccept.className = 'ylc-btn ylc-btn-primary';
        bAccept.textContent = L.accept;
        bAccept.addEventListener('click', function () { choose('all'); });

        var bNec = document.createElement('button');
        bNec.type = 'button';
        bNec.className = 'ylc-btn ylc-btn-ghost';
        bNec.textContent = L.necessary;
        bNec.addEventListener('click', function () { choose('necessary'); });

        actions.appendChild(bAccept);
        actions.appendChild(bNec);
        el.appendChild(head);
        el.appendChild(body);
        el.appendChild(actions);
        return el;
    }

    function show() {
        loadCSS();
        if (banner) { banner.classList.add('ylc-show'); return; }
        banner = build();
        document.body.appendChild(banner);
        requestAnimationFrame(function () {
            requestAnimationFrame(function () { if (banner) banner.classList.add('ylc-show'); });
        });
        var btn = banner.querySelector('.ylc-btn-primary');
        if (btn) { try { btn.focus({ preventScroll: true }); } catch (e) {} }
    }

    function hide() {
        if (!banner) return;
        var node = banner;
        banner = null;
        node.classList.remove('ylc-show');
        setTimeout(function () {
            if (node.parentNode) node.parentNode.removeChild(node);
        }, 450);
    }

    function choose(v) {
        saveChoice(v);
        pushConsent(v === 'all');
        hide();
        if (v === 'all') {
            try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
        }
    }

    /* ---------- 对外接口 ---------- */
    window.ylConsent = {
        mode: CFG.mode,
        choice: readChoice,
        /** 页脚「Cookie 设置」：优先走 Google CMP 的撤回流程 */
        open: function () {
            if (CFG.mode !== 'self' && hasGoogleCmp() && openGoogleRevocation()) return true;
            if (CFG.mode === 'off') return false;
            show();
            return true;
        },
        reset: function () {
            try { localStorage.removeItem(KEY); } catch (e) {}
            pushConsent(false);
            show();
        },
        hasGoogleCmp: hasGoogleCmp,
        inConsentRegion: inConsentRegion,
        region: function () { return regionFromLocale() || regionFromTimezone(); }
    };

    /* ---------- 启动 ---------- */
    function initSelf() {
        var c = readChoice();
        if (c) { pushConsent(c === 'all'); return; }
        show();
    }

    function init() {
        if (CFG.mode === 'off') return;
        if (CFG.mode === 'self') { initSelf(); return; }

        // google 模式：先等 Google CMP 出现，出现了就完全交给它
        if (hasGoogleCmp()) return;
        if (!CFG.fallback) return;

        // 非同意地区：Consent Mode 已默认放行，不再自动弹横幅。
        // 但用户此前主动选过「仅必要」的，仍然要尊重并回推一次。
        if (CFG.regionGate && !inConsentRegion()) {
            var prev = readChoice();
            if (prev) pushConsent(prev === 'all');
            return;
        }

        var waited = 0;
        var step = 200;
        var timer = setInterval(function () {
            if (hasGoogleCmp()) {          // 迟到的 CMP：撤掉自己的横幅，避免双弹窗
                clearInterval(timer);
                hide();
                return;
            }
            waited += step;
            if (waited >= CFG.waitMs) {
                clearInterval(timer);
                var c = readChoice();
                if (c) { pushConsent(c === 'all'); return; }
                show();
            }
        }, step);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
