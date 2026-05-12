/* =========================================================================
   cart.js — Логика корзины
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
            const btn = document.querySelector('.checkout-btn[data-bs-toggle]');
            if (list) {
                list.innerHTML = `
                    <div style="text-align:center;padding:60px 20px;color:var(--gray);">
                        <p style="font-size:20px;color:var(--accent);">Корзина пуста</p>
                        <a href="index.html" style="color:var(--accent);text-decoration:underline;">Вернуться в каталог</a>
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

    /* Форма оформления */
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const body = orderForm.closest('.modal-body');
            if (body) {
                body.innerHTML = `
                    <div style="text-align:center;padding:30px 20px;">
                        <div style="font-size:48px;color:#5fa86b;">✓</div>
                        <h4 style="color:var(--accent);margin-top:16px;">Спасибо за заказ!</h4>
                        <p style="color:var(--gray);">Мы свяжемся с вами в ближайшее время.</p>
                    </div>`;
            }
        });
    }

    recalc();
})();
