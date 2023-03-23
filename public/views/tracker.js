const trackerFrom = document.getElementById('tracker-form');
const amount = document.getElementById('amount');
const description = document.getElementById('description');
const category = document.getElementById('category');
const expenseItems = document.getElementById('expense-items');
const expansionDiv = document.getElementById('expansion');


trackerFrom.addEventListener('submit', async(e) => {
    e.preventDefault();
    console.log('frontend: ',amount.value, description.value, category.value);

    try {   
        await axios.post(`http://localhost:4000/expense/add-expense`, {
            amount: amount.value,
            description: description.value,
            category: category.value
        },
        {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
    
        const response = await fetchExpensesFromBackend(1);

        showExpensesOnFrontend(response.expenses);

    } catch (error) {
        console.log(error);
    }
});

window.addEventListener('DOMContentLoaded', async () => {
    checkForPremium();

    // const url = window.location.search;
    // const page = url.replace('?', '');

    // console.log('page->', page);

    const response = await fetchExpensesFromBackend(1);
    console.log(response);
    
    const expenses = response.expenses;

    showExpensesOnFrontend(expenses);

    addPagination(response);
});

expenseItems.addEventListener('click', async (e) => {
    // console.log('event target: ', e.target.parentElement.id);
    const id = e.target.parentElement.id;
    try {
        await axios.delete(`http://localhost:4000/expense/delete-expense/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });

        expenseItems.removeChild(document.getElementById(`${id}`));
        
    } catch (error) {
        console.log(error);
    }

});

function showExpensesOnFrontend(expenses) {
    console.log('expenses: ', expenses);

    expenseItems.innerHTML = '';

    for(let i = 0; i < expenses.length; i ++){
        // console.log(expenses[i]);
        const expense = expenses[i];
        expenseItems.innerHTML += `
            <li id="${expense.id}">
                ${expense.amount}-${expense.description}-${expense.category}
                <button>Delete</button>
            </li>
        `;
    }    
};

async function fetchExpensesFromBackend(pageNo) {
    try {
        let rows = localStorage.getItem('rows');
        if(!rows) {
            rows = 5;
        }

        const response = await axios.get(`http://localhost:4000/expense/get-expense/?page=${pageNo}`, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'rows': rows
            }
        });

        const expenses = response.data;
        return expenses;

    } catch (error) {
        console.log(error);
    }
}