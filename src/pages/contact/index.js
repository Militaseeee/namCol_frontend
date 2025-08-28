const form = document.querySelector('form');
console.log(form);
const numberWhatsApp = '573135962354';

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents the form from being submitted in a traditional way

    // Collect the values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    console.log(name);
    
    // Format the message text 
    const text = `Hello! I am ${name}.\nMy email: ${email}\nMessage: ${message}`;

    // Encodes text for URL
    const codedtext = encodeURIComponent(text);

    // Generate the WhatsApp link
    const url = `https://wa.me/${numberWhatsApp}?text=${codedtext}`;

    console.log(url);
    
    // Open the link in a new window or tab (open WhatsApp)
    window.open(url, '_blank');
});