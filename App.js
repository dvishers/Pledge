document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pledge-form');
    const list = document.getElementById('pledge-list');
    const SMS_ENDPOINT = "https://your-backend-url.com/send-sms"; // Change this later if using SMS

    // Load saved promises from localStorage
    const savedPledges = JSON.parse(localStorage.getItem('pledges')) || [];
    savedPledges.forEach(p => addPledgeToList(p));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const commitment = document.getElementById('commitment').value.trim();
        const amount = document.getElementById('amount').value.trim();
        const person = document.getElementById('person').value.trim();
        const sendSMS = document.getElementById('sendSMS').checked;

        if (!commitment  !amount  !person) {
            alert("Please fill in all fields.");
            return;
        }

        const pledge = {
            commitment,
            amount,
            person,
            date: new Date().toLocaleString()
        };

        addPledgeToList(pledge);
        savePledge(pledge);

        if (sendSMS) {
            sendSMSNotification(pledge);
        }

        form.reset();
    });

    function addPledgeToList(pledge) {
        const li = document.createElement('li');
        li.classList.add('pledge-item');

        li.innerHTML = `
            <div>
                <strong>${pledge.commitment}</strong> <br>
                <small>Penalty: ${pledge.amount} | To: ${pledge.person}</small><br>
                <small>${pledge.date}</small>
            </div>
            <button class="delete-btn">✖</button>
        `;

        li.querySelector('.delete-btn').addEventListener('click', () => {
            if (confirm("Delete this promise?")) {
                li.remove();
                deletePledge(pledge);
            }
        });

        list.appendChild(li);
    }

    function savePledge(pledge) {
        const pledges = JSON.parse(localStorage.getItem('pledges')) || [];
        pledges.push(pledge);
        localStorage.setItem('pledges', JSON.stringify(pledges));
    }

    function deletePledge(pledge) {
        let pledges = JSON.parse(localStorage.getItem('pledges')) || [];
        pledges = pledges.filter(p => !(p.commitment === pledge.commitment && p.date === pledge.date));
        localStorage.setItem('pledges', JSON.stringify(pledges));
    }

    function sendSMSNotification(pledge) {
        fetch(SMS_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                to: pledge.person,
                message: New Promise: ${pledge.commitment} | Penalty: ${pledge.amount}
            })
        })
        .then(res => res.json())
        .then(data => console.log("SMS sent:", data))
        .catch(err => console.error("SMS error:", err));
    }
});
