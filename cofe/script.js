// Загрузка меню с сервера и отображение на странице
fetch('http://localhost:3001/menu')
    .then(response => response.json())
    .then(menu => {
        const menuSection = document.getElementById('menu');
        menuSection.innerHTML = ''; // Очищаем содержимое

        menu.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>Цена: ${item.price} ₽</p>
            `;
            menuSection.appendChild(menuItem);
        });
    })
    .catch(error => console.error('Ошибка загрузки меню:', error));

// Отправка данных формы заказа на сервер
const orderForm = document.querySelector('form'); // Убедимся, что форма выбрана корректно
orderForm.addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            orderForm.reset();
        })
        .catch(error => console.error('Ошибка отправки заказа:', error));
});