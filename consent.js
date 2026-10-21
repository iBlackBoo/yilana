/* ==========================================================================
 * consent.js — 轻量 Cookie 同意横幅 + Google Consent Mode v2 联动
 * --------------------------------------------------------------------------
 * 用法：在 </body> 前引入 <script src="consent.js" defer></script>
 *       详情页用 ../consent.js，脚本会自行推导 privacy.html 的相对路径。
 *
 * 设计取舍：
 *   - 不接入第三方 CMP，只做「告知 + 同意/拒绝 + 可撤回」，满足基本合规告知；
 *     若后续要投 EEA/英国流量，建议换成 Google 认证的 CMP。
 *   - 选择结果存 localStorage('yilana.consent')：'all' | 'necessary'
 *   - 与 <head> 里的 Consent Mode 默认值（默认 denied）配合，同意后 update 为 granted
 * ========================================================================== */
(function () {
    'use strict';

    var KEY = 'yilana.consent';
    var LANG_KEY = 'yilana.lang';

    /* ---------- 路径推导：兼容根目录与 effects/ 子目录 ---------- */
    var self = document.currentScript || (function () {
        var all = document.getElementsByTagName('script');
        return all[all.length - 1];
    })();
    var BASE = '';
    if (self && self.src) BASE = self.src.replace(/[^/]*$/, '');

    /* ---------- 文案 ---------- */
    var TEXT = {
        en: {
            title: 'Cookies & privacy',
            body: 'This site stores your language choice locally. With your consent, Google AdSense sets cookies to serve and measure ads. You can change your choice at any time.',
            accept: 'Accept all',
            necessary: 'Necessary only',
            link: 'Privacy policy',
            settings: 'Cookie settings'
        },
        zh: {
            title: 'Cookie 与隐私',
            body: '本站只在本地保存你的语言选择。若你同意，Google AdSense 会设置 Cookie 用于展示和衡量广告。你可以随时更改这个选择。',
            accept: '全部接受',
            necessary: '仅必要',
            link: '隐私政策',
            settings: 'Cookie 设置'
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

    /* ---------- Consent Mode 同步 ---------- */
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
        // 没有 Consent Mode 时也保证 AdSense 拿到信号
        try {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: 'yl_consent_update', consent: state });
        } catch (e) {}
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

    /* ---------- 横幅 ---------- */
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

        var bNec = document.createElement('button');
        bNec.type = 'button';
        bNec.className = 'ylc-btn ylc-btn-ghost';
        bNec.textContent = L.necessary;

        bAccept.addEventListener('click', function () { choose('all'); });
        bNec.addEventListener('click', function () { choose('necessary'); });

        actions.appendChild(bAccept);
        actions.appendChild(bNec);
        el.appendChild(head);
        el.appendChild(body);
        el.appendChild(actions);
        return el;
    }

    function show() {
        if (!banner) {
            banner = build();
            document.body.appendChild(banner);
            // 下一帧加类，保证过渡动画生效
            requestAnimationFrame(function () {
                requestAnimationFrame(function () { banner.classList.add('ylc-show'); });
            });
        } else {
            banner.classList.add('ylc-show');
        }
        var btn = banner.querySelector('.ylc-btn-primary');
        if (btn) { try { btn.focus({ preventScroll: true }); } catch (e) {} }
    }

    function hide() {
        if (!banner) return;
        banner.classList.remove('ylc-show');
        var node = banner;
        banner = null;
        setTimeout(function () {
            if (node && node.parentNode) node.parentNode.removeChild(node);
        }, 450);
    }

    function choose(v) {
        saveChoice(v);
        pushConsent(v === 'all');
        hide();
        // 同意后让 Auto ads 立刻按新状态重算
        if (v === 'all') {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {}
        }
    }

    /* ---------- 对外接口（页脚「Cookie 设置」按钮用） ---------- */
    window.ylConsent = {
        choice: readChoice,
        open: show,
        reset: function () {
            try { localStorage.removeItem(KEY); } catch (e) {}
            pushConsent(false);
            show();
        }
    };

    /* ---------- 启动 ---------- */
    function init() {
        loadCSS();
        var c = readChoice();
        if (c) {
            // 老访客：把已存的选择同步给 Consent Mode（head 里的默认值已按存储算过）
            pushConsent(c === 'all');
        } else {
            show();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
