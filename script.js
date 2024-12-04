// Cargar datos y crear gráficos
async function loadData() {
    const response = await fetch('/datos/mortalidad_grouped_data.json');
    const response2 = await fetch('/datos/defunciones_sexo_ano.json');
    const response3 = await fetch('/datos/tendencia_grupos_enfermedades.json');
    
    const data = await response.json();
    const data2 = await response2.json();
    const data3 = await response3.json();
    
    createChart(data);
    createChart_2(data2);
    createChart_3(data3);
}

// Crear gráfico principal
function createChart(data) {
    const ctx = document.getElementById('graph').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const value = data.datasets[0].data[elements[0].index];
                    playSound(value);
                }
            }
        }
    });
}

// Crear otros gráficos (similar a createChart)
function createChart_2(data) { /* Tu lógica */ }
function createChart_3(data) { /* Tu lógica */ }

// Reproducir sonidos
// Reproducir sonidos y ajustar velocidad del servo
function playSound(value) {
    // Lógica para reproducir el sonido
    const sound = new Audio('/assets/sfx-horror.mp3');
    sound.volume = Math.min(Math.max(value / 1000000, 0), 1);
    sound.play();

    // Enviar el valor al servidor para ajustar la velocidad del servo
    fetch('/control-servo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ speed: value })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Servo speed updated', data);
    })
    .catch(error => {
        console.error('Error updating servo speed:', error);
    });
}

// Cargar los datos al cargar la página
window.onload = loadData;
