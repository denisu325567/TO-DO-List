const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Пути к JSON-файлам
const menuFile = './data/menu.json';
const ordersFile = './data/orders.json';

// Читаем меню
app.get('/menu', (req, res) => {
    fs.readFile(menuFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения меню:', err);
            res.status(500).json({ message: 'Ошибка чтения меню' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Добавляем заказ
app.post('/orders', (req, res) => {
    const order = req.body;
    fs.readFile(ordersFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения заказов:', err);
            res.status(500).json({ message: 'Ошибка чтения заказов' });
            return;
        }

        const orders = JSON.parse(data);
        orders.push(order);

        fs.writeFile(ordersFile, JSON.stringify(orders, null, 2), (err) => {
            if (err) {
                console.error('Ошибка сохранения заказа:', err);
                res.status(500).json({ message: 'Ошибка сохранения заказа' });
                return;
            }
            res.json({ message: 'Заказ сохранён!', order });
        });
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});