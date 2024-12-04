const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const five = require("johnny-five");
const app = express();



const board = new five.Board({
  port: "COM8", // Asegúrate de poner el puerto correcto aquí
});

const server = http.createServer(app);
const io = socketIo(server);  // Configurar socket.io con el servidor

let servoSpeed = 90; // Valor inicial de la velocidad

// Servir archivos estáticos (como tus archivos de la web)
app.use(express.static('public'));
// Rutas
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');  // Asegúrate de que tu archivo index.html esté en la raíz
});


// Middleware para parsear JSON
app.use(express.json());

// Endpoint para controlar la velocidad del servo
app.post('/control-servo', (req, res) => {
    const { speed } = req.body;
    console.log("Received speed:", speed);

    // Ajustar la velocidad del servo en función del valor recibido
    if (board.isReady) {
      const servo = new five.Servo(6); // Asegúrate de que el servo esté conectado al pin correcto

      
      servo.to(speed); // Mueve el servo según el valor mapeado
      res.json({ message: 'Servo speed updated', speed: speed });
    } else {
        res.status(500).json({ error: 'Board not ready' });
    }
});

// Configuración de socket.io (solo como ejemplo)
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor
board.on('ready', () => {
    app.listen(3000, () => {
        console.log('Servidor corriendo en http://localhost:3000');
    });
});
