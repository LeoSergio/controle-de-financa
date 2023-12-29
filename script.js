const tbody = document.querySelector('tbody');
const descItem = document.querySelector('#desc');
const amount = document.querySelector('#amount');
const type = document.querySelector('type');
const btnNew = document.querySelector('#btnNew');

const incomes = document.querySelector('.incomes');
const expenses = document.querySelector('.expenses');
const total = document.querySelector('.total');

let items;

//pegar itens que está no banco que está no localStorage.getItem... se não ia ser um array vazio.
const getItensBD = () => JSON.parse(localStorage.getItem('db_items')) ?? [];
const setItensBD = () =>
    localStorage.setItem('db_items', JSON.stringify(items)); //pegar os dados do items.