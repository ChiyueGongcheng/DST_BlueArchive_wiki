/* 窄屏（顶部横栏）下：导航子菜单由 hover 展开改为点击展开的下拉面板。
   桌面宽度下不做任何处理，仍由 CSS 的 hover 规则控制。 */
(function () {
    var narrow = window.matchMedia('(max-width: 768px)');
    var OPEN = 'nav-open';

    function closeAll(except) {
        var opened = document.querySelectorAll('.menu-category.' + OPEN);
        for (var i = 0; i < opened.length; i++) {
            if (opened[i] !== except) {
                opened[i].classList.remove(OPEN);
            }
        }
    }

    function init() {
        var categories = document.querySelectorAll('.menu-category');

        for (var i = 0; i < categories.length; i++) {
            (function (cat) {
                var item = cat.querySelector('.menu-item');
                var submenu = cat.querySelector('.submenu');
                if (!item || !submenu) {
                    return;
                }
                // 子菜单为空时不拦截点击，保持原有的链接跳转行为
                if (!submenu.children.length) {
                    return;
                }

                item.addEventListener('click', function (e) {
                    if (!narrow.matches) {
                        return; // 桌面宽度交给 CSS hover
                    }
                    e.preventDefault();
                    e.stopPropagation();
                    var isOpen = cat.classList.contains(OPEN);
                    closeAll(cat);
                    if (isOpen) {
                        cat.classList.remove(OPEN);
                    } else {
                        cat.classList.add(OPEN);
                    }
                });
            })(categories[i]);
        }

        // 点击导航之外的地方收起面板
        document.addEventListener('click', function (e) {
            if (!narrow.matches) {
                return;
            }
            if (e.target && e.target.closest && e.target.closest('.menu-category')) {
                return;
            }
            closeAll(null);
        });

        // 视口变化时清理状态，避免旋转屏幕后残留展开态
        narrow.addEventListener('change', function () {
            closeAll(null);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
