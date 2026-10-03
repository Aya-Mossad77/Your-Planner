const GOOD_ADVICE = [
    "Excellent! you need to improve entertainment",
    "Your financial performance is impressive!",
    "You are on the right track!"
];
const AVERAGE_ADVICE = [
    "You are doing well but save more",
    "Savings are stable",
];
const POOR_ADVICE = [
    "You need to review your expenses immediately",
    "Look for ways to increase side income"
];

function showPage(id) {

    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active'); 
    
    if (id === 'advicePage') {
        const salary = localStorage.getItem('monthlySalary');
        if (salary) {
            document.getElementById('salaryDisplay').textContent = `${parseFloat(salary).toFixed(2)} USD`;

            document.getElementById('resultsArea').classList.add('hidden');
        }
    }
}
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const name = document.getElementById('userName').value;
    const salary = document.getElementById('userSalary').value; 
    
    if (name.trim() === "" || parseFloat(salary) <= 0 || isNaN(parseFloat(salary))) {
        alert("Invalid input! Please check name and salary.");
        return;
    }

    localStorage.setItem('userName', name);
    localStorage.setItem('monthlySalary', salary);
    
    
    document.getElementById('welcomeMessage').textContent = `Welcome, ${name}!`;

    showPage('home'); 
});

document.getElementById('expenseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const salary = parseFloat(localStorage.getItem('monthlySalary'));
    const expenses = parseFloat(document.getElementById('monthlyExpenses').value);
    if(expenses>salary){
        alert("express cannot be greater than salary")
        return;
    }

    const savingAmount = salary - expenses;
    const savingRatio = (savingAmount / salary) * 100; 

    document.getElementById('savingAmount').textContent = `${savingAmount.toFixed(2)} USD`;
    document.getElementById('savingRatio').textContent = `${savingRatio.toFixed(2)}%`;
    
    let adviceArray;

    if (savingAmount == 0) {
         adviceArray = POOR_ADVICE;
        document.getElementById('savingRatio').style.color = '#dc3545'; 
    } else if (savingRatio >= 15) {
        adviceArray = GOOD_ADVICE;
        document.getElementById('savingRatio').style.color = '#28a745'; 
    } else {
        adviceArray = AVERAGE_ADVICE;
        document.getElementById('savingRatio').style.color = '#ffc107';
    }

    const randomIndex = Math.floor(Math.random() * adviceArray.length);
    const advice = adviceArray[randomIndex];
    document.getElementById('personalAdvice').textContent = advice;
    document.getElementById('resultsArea').classList.remove('hidden');
});

function logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('monthlySalary');
    showPage('loginPage');
}

window.onload = function() {
     
        showPage('loginPage');
    
};