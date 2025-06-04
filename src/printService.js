const fs = require('fs');
const os = require('os');
const { exec } = require('child_process');

function imprimirTicket({ fecha, hora, tipo, precio, codigo }) {
  return new Promise((resolve, reject) => {
    if (!codigo || !tipo) {
      return reject(new Error('Campos requeridos faltantes'));
    }

    // Contenido base
    const content = `
        Ticket de Acceso
        -------------------------
        Fecha: ${fecha}
        Hora: ${hora}
        Tipo: ${tipo}
        Precio: ${precio}
        Código: ${codigo}

        `;

    // ESC d 5 => avanzar 5 líneas (0x1B 0x64 0x05)
    const feed = Buffer.from([0x1B, 0x64, 0x05]);

    // GS V 0 => corte total (0x1D 0x56 0x00)
    const cut = Buffer.from([0x1D, 0x56, 0x00]);

    const buffer = Buffer.concat([
      Buffer.from(content, 'ascii'),
      feed,
      cut
    ]);

    const tmpPath = `${os.tmpdir()}\\ticket_print.bin`;

    try {
      fs.writeFileSync(tmpPath, buffer);
      exec(`type "${tmpPath}" > LPT1`, (err) => {
        if (err) {
          return reject(new Error('Error al imprimir: ' + err.message));
        }
        resolve('Ticket impreso con corte total.');
      });
    } catch (err) {
      reject(new Error('Fallo al escribir archivo de impresión: ' + err.message));
    }
  });
}

module.exports = { imprimirTicket };
