'use strict';

const rootEl = document.getElementById('root');

const formEl = document.createElement('form');
formEl.dataset.id = 'purchase-form';
rootEl.appendChild(formEl);

const nameEl = document.createElement('input');
nameEl.dataset.input = 'name';
formEl.appendChild(nameEl);

const priceEl = document.createElement('input');
priceEl.dataset.input = 'price';
priceEl.type = 'number';
formEl.appendChild(priceEl);

const addEl = document.createElement('button');
addEl.dataset.action = 'add';
addEl.textContent = 'Добавить';
formEl.appendChild(addEl);

const errorEl = document.createElement('div');
errorEl.dataset.id = 'message';
formEl.appendChild(errorEl);

const listEl = document.createElement('ul');
listEl.dataset.id = 'purchases-list';
rootEl.appendChild(listEl);

const totalEl = document.createElement('div');
rootEl.appendChild(totalEl);
totalEl.textContent = 'Самая дорогая покупка: ';

const mostExpansiveEl = document.createElement('span');
mostExpansiveEl.dataset.id = 'most-expensive';
mostExpansiveEl.textContent = 'нет покупок';
totalEl.appendChild(mostExpansiveEl);

let nextId = 1;
const purchases = [];
formEl.onsubmit = (evt) => {
    evt.preventDefault();

    errorEl.textContent = '';
    let error = null;
    const name = nameEl.value.trim();
    if (name === '') {
        error = 'Заполните поле Название';
        errorEl.textContent = error;
        nameEl.focus();
        return;
    }
    const price = Number(priceEl.value);
    if (Number.isNaN(price)) {
        error = 'Неверно введена цена';
        errorEl.textContent = error;
        priceEl.focus();
        return;
    }

    if (price < 0) {
        error = 'Цена не может быть отрицательной';
        errorEl.textContent = error;
        priceEl.focus();
        return;
    }

    const purchase = {
        id: nextId++,
        name,
        price,
    };
    purchases.push(purchase);

    formEl.reset();
    nameEl.focus();

    const rowEl = document.createElement('li');
    rowEl.textContent = `${purchase.name} на сумму ${purchase.price} с. `;
    rowEl.dataset.purchaseId = purchase.id;
    listEl.insertBefore(rowEl, listEl.firstElementChild);

    const removeEl = document.createElement('button');
    removeEl.textContent = 'Удалить';
    removeEl.dataset.action = 'remove';
    removeEl.onclick = () => {
        listEl.removeChild(rowEl);
        const index = purchases.indexOf(purchases);
        purchases.splice(index, 1);
        
        const mostExpansive = purchases.reduce((prev, curr) => {
            if (prev.price <= curr.price) {
                if (prev.id < curr.id) {
                    prev = curr;
                }
            }
            return prev;
        });

        if (purchases.length === 0) {
            mostExpansiveEl.textContent = 'нет покупок';
        }
        mostExpansiveEl.textContent = `${mostExpansive.name} на сумму ${mostExpansive.price} с.`;
    };
    rowEl.appendChild(removeEl);

    const mostExpansive = purchases.reduce((prev, curr) => {
        if (prev.price <= curr.price) {
            if (prev.id < curr.id) {
                prev = curr;
            }
        }
        return prev;
    });

    mostExpansiveEl.textContent = `${mostExpansive.name} на сумму ${mostExpansive.price} с.`;
};
