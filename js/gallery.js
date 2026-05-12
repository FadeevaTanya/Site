/* =========================================================================
   gallery.js — Галерея товара (pop-up + переключение)
   ========================================================================= */

(function () {
    'use strict';

    /* ===== Переключение основного изображения по миниатюре ===== */
    const mainImg = document.getElementById('mainImg');
    const thumbs  = document.querySelectorAll('.gallery__thumb');

    thumbs.forEach((thumb) => {
        thumb.addEventListener('click', () => {
            const src = thumb.dataset.src;
            if (!src || !mainImg) return;
            // Меняем местами: основной ↔ миниатюра
            const oldMain = mainImg.src;
            mainImg.style.opacity = '0';
            setTimeout(() => {
                mainImg.src = src;
                mainImg.style.opacity = '1';
                // Обновляем миниатюру
                const img = thumb.querySelector('img');
                if (img) img.src = oldMain;
                thumb.dataset.src = oldMain;
            }, 180);
        });
    });

    /* ===== Счётчик количества ===== */
    const qtyVal = document.querySelector('.info__qty-val');
    document.querySelectorAll('.info__qty-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            if (!qtyVal) return;
            let q = parseInt(qtyVal.textContent, 10) || 1;
            if (btn.dataset.action === 'plus' && q < 99) q++;
            if (btn.dataset.action === 'minus' && q > 1) q--;
            qtyVal.textContent = q;
        });
    });

    /* ===== Табы (Доставка / Правила возврата) ===== */
    const tabBtns = document.querySelectorAll('.tabs__btn');
    const tabPanes = document.querySelectorAll('.tabs__pane');
    tabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('tabs__btn--active'));
            tabPanes.forEach(p => p.classList.remove('tabs__pane--active'));
            btn.classList.add('tabs__btn--active');
            const pane = document.getElementById(target);
            if (pane) pane.classList.add('tabs__pane--active');
        });
    });

    /* ===== Pop-up для основного изображения (готовый JS-скрипт) ===== */
    if (mainImg) {
        // Создаём overlay один раз
        const overlay = document.createElement('div');
        overlay.className = 'lightbox';
        overlay.innerHTML = `
            <button class="lightbox__close" aria-label="Закрыть">&times;</button>
            <img class="lightbox__img" alt="">
        `;
        document.body.appendChild(overlay);

        const lbImg   = overlay.querySelector('.lightbox__img');
        const lbClose = overlay.querySelector('.lightbox__close');

        mainImg.style.cursor = 'zoom-in';
        mainImg.addEventListener('click', () => {
            lbImg.src = mainImg.src;
            overlay.classList.add('lightbox--open');
            document.body.style.overflow = 'hidden';
        });

        const closeLightbox = () => {
            overlay.classList.remove('lightbox--open');
            document.body.style.overflow = '';
        };

        lbClose.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }
})();
