const tbody = document.querySelector('tbody');
const descItem = document.querySelector('#desc');
const amount = document.querySelector('#amount');
const type = document.querySelector('type');
const btnNew = document.querySelector('#btnNew');

const incomes = document.querySelector('.incomes');
const expenses = document.querySelector('.expenses');
const total = document.querySelector('.total');

let items;
btnNew.onclick = () => {
    if(descItem.value === "" || amount.value ==="" || type.value === ""){
        return alert('Preencha todos os Campos!');
    }
    items.push({
        desc: descItem.value,
        amount:Math.abs(amount.value).toFixed(2),
        type:type.value,
    });
setItensBD();

loadItens();

descItem.value = "";
amount.value = "";
};

function deleteItem(index){
    items.splice(index,1);
    setItensBD();
    loadItens();
}

function insertItem(item,index){
    let tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${item.desc}</td>
        <td>${item.amount}</td>
        <td class="columnType">${
            item.type === "entrada"
        ? '<i class="bx bxs-chevron-up-circle"></i>'
        : '<i class="bx bxs-chevron-down-circle"></i>'
        }</td>
        <td class="columnAction">
            <button onclick="deleteItem(${index})"><i class="bx bx-trash"></i></button>
        </td>
    `;
}


function loadItens(){
    items = getItensBD();
    tbody.innerHTML='';
    items.forEach((item, index) => {
        insertItem(item,index);
    })
}

getTotals();

function getTotals(){
    const amountIncomes = items
    .filter((item) => item.type ==="Entrada")
    .map((transaction) => Number(transaction.amount));

    const amountExpenses = items
    .filter((item) => item.type ==="Saída")
    .map((transaction) => Number(transaction.amount));

    const totalIncomes = amountIncomes
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);
    const totalExpenses = Math.abs(
        amountExpenses.reduce((acc, cur) => acc + cur, 0)
    ).toFixed(2);

    const totalItems = (totalIncomes - totalExpenses).toFixed(2);

    incomes.innerHTML = totalIncomes;
    expenses.innerHTML = totalExpenses;
    total.innerHTML = totalItems;
}
//pegar itens que está no banco que está no localStorage.getItem... se não ia ser um array vazio.
const getItensBD = () => JSON.parse(localStorage.getItem('db_items')) ?? [];
const setItensBD = () =>
    localStorage.setItem('db_items', JSON.stringify(items)); //pegar os dados do items.
loadItens();