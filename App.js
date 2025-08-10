document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pledge-form');
    const list = document.getElementById('pledge-list');

    // Load saved promises from localStorage
    const savedPledges = JSON.parse(localStorage.getItem('pledges')) || [];
    savedPledges.forEach(p => addPledgeToList(p.commitment, p.amount, p.person));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const commitment = document.getElementById('commitment').value;
        const amount = document.getElementById('amount').value;
        const person = document.getElementById('person').value;

        if (commitment && amount && person) {
            addPledgeToList(commitment, amount, person);
            savePledge(commitment, amount, person);
            form.reset();
        }
    });

    function addPledgeToList(commitment, amount, person) {
        const li = document.createElement('li');
        li.textContent = Promise: ${commitment} | Penalty: ₹${amount} | To: ${person};
        list.appendChild(li);
    }

    function savePledge(commitment, amount, person) {
        const pledges = JSON.parse(localStorage.getItem('pledges')) || [];
        pledges.push({ commitment, amount, person });
        localStorage.setItem('pledges', JSON.stringify(pledges));
    }
});
