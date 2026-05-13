/* =========================================================================
   cart.js — Логика корзины (без модального окна)
   ========================================================================= */
(function () {
    'use strict';

    function formatPrice(n) {
        return n.toLocaleString('ru-RU').replace(/,/g, ' ') + ' ₽';
    }

    function recalc() {
        const rows = document.querySelectorAll('.cart-row[data-price]');
        const countEl = document.querySelector('.page-title-count');
        if (countEl) countEl.textContent = '(' + rows.length + ')';

        rows.forEach((row) => {
            const unit = parseInt(row.dataset.price, 10);
            const qty = parseInt(row.querySelector('.cart-row__qty-val').textContent, 10) || 1;
            const priceEl = row.querySelector('.cart-row__price');
            if (priceEl) priceEl.textContent = formatPrice(unit * qty);
        });

        if (rows.length === 0) {
            const list = document.querySelector('.cart-list');
            const btn = document.querySelector('.checkout-btn');
            if (list) {
                list.innerHTML = `
                    <div style="text-align:center;padding:60px 20px;">
                        <p style="font-size:20px;color:#4F2B3F;margin-bottom:16px;">Корзина пуста</p>
                        <a href="index.html" style="color:#4F2B3F;text-decoration:underline;">Вернуться в каталог</a>
                    </div>`;
            }
            if (btn) btn.style.display = 'none';
        }
    }

    /* Кнопки +/− */
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.cart-row__qty-btn');
        if (!btn) return;
        const row = btn.closest('.cart-row');
        const val = row.querySelector('.cart-row__qty-val');
        let q = parseInt(val.textContent, 10) || 1;
        if (btn.dataset.action === 'plus' && q < 99) q++;
        if (btn.dataset.action === 'minus' && q > 1) q--;
        val.textContent = q;
        recalc();
    });

    /* Удаление строки */
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.cart-row__remove');
        if (!btn) return;
        const row = btn.closest('.cart-row');
        row.style.transition = 'opacity .3s, transform .3s';
        row.style.opacity = '0';
        row.style.transform = 'translateX(20px)';
        setTimeout(() => { row.remove(); recalc(); }, 300);
    });

    /* «Выбрать всё» */
    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
        selectAll.addEventListener('change', () => {
            document.querySelectorAll('.cart-row__check').forEach((cb) => {
                cb.checked = selectAll.checked;
            });
        });
    }

    /* «Очистить корзину» */
    const clearAll = document.getElementById('clearAll');
    if (clearAll) {
        clearAll.addEventListener('click', () => {
            if (!confirm('Очистить корзину?')) return;
            document.querySelectorAll('.cart-row').forEach((r) => r.remove());
            recalc();
        });
    }

    /* «Продолжить оформление» — без модального окна */
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    recalc();
})();
