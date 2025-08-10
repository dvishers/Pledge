document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pledge-form');
    const list = document.getElementById('pledge-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const commitment = document.getElementById('commitment').value;
        const amount = document.getElementById('amount').value;
        const person = document.getElementById('person').value;

        if (commitment && amount && person) {
            const li = document.createElement('li');
            li.textContent = Promise: ${commitment} | Penalty: ₹${amount} | To: ${person};
            list.appendChild(li);
            form.reset();
        }
    });
});
