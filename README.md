# server_banos
servidor para impresion de baños Terminal Calama a traves de dispositivos windows

openssl genrsa -out key.pem 2048
openssl req -new -x509 -key key.pem -out cert.pem -days 36500

npm install express
npm install cors
npm install printer

El frontend puede enviar un POST así:
    fetch('https://localhost:3000/api/print', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        fecha: '2025-06-04',
        hora: '14:35:00',
        tipo: 'General',
        precio: '$500',
        codigo: 'ABC123',
        qrHtml: '<div>QR...</div>'
    })
    })
    .then(r => r.json())
    .then(console.log)
    .catch(console.error);
