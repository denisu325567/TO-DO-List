// Получаем элементы DOM
const form = document.getElementById('currency-form');
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const resultDiv = document.getElementById('result');

// Базовый URL API
const BASE_URL = 'https://api.exchangerate.host';

// Функция для загрузки списка валют
async function loadCurrencies() {
    try {
        // Загружаем доступные валюты
        const response = await fetch(`${BASE_URL}/symbols`);
        if (!response.ok) {
            throw new Error('Ошибка загрузки валют');
        }

        const data = await response.json();
        const symbols = data.symbols;

        // Заполняем выпадающие списки валют
        for (let code in symbols) {
            const option = `<option value="${code}">${