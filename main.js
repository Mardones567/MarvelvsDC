
// Función para cargar el archivo JSON
async function loadData() {
    const response = await fetch('datos/mortalidad_grouped_data.json');
    const responde_2 = await fetch("datos/defunciones_sexo_ano.json") 
    const responde_3 = await fetch("datos/tendencia_grupos_enfermedades.json") 
    const data = await response.json();
    const data_2 = await responde_2.json();
    const datos_3 = await responde_3.json(); 
    createChart(data);
    createChart_2(data_2);  // Llamamos a la función para crear el gráfico
    createChart_3(datos_3)
}
// Función para reproducir sonidos de manera proporcional al valor
function playSound_2(value) {
    let sound = new Audio('sfx-horror.mp3');
    
    // Definir el rango de valores posibles (ajustar según tus datos)
    const minValue = 322356848;           // Valor mínimo (ajústalo según el rango de tus datos)
    const maxValue = 629287694;     // Valor máximo (ajústalo según el rango de tus datos)

    // Calcular el volumen proporcionalmente entre 0 y 1
    let volume = (value - minValue) / (maxValue - minValue);

    // Asegurarse de que el volumen esté entre 0 y 1
    volume = Math.min(Math.max(volume, 0), 1);

    // Asignar el volumen calculado al sonido
    sound.volume = volume;

    // Reproducir el sonido
    sound.play();
}

function playSound_3(value) {
    let sound = new Audio('sfx-horror.mp3');
    
    // Definir el rango de valores posibles (ajustar según tus datos)
    const minValue = 36036374;           // Valor mínimo (ajústalo según el rango de tus datos)
    const maxValue = 165146314;     // Valor máximo (ajústalo según el rango de tus datos)

    // Calcular el volumen proporcionalmente entre 0 y 1
    let volume = (value - minValue) / (maxValue - minValue);

    // Asegurarse de que el volumen esté entre 0 y 1
    volume = Math.min(Math.max(volume, 0), 1);

    // Asignar el volumen calculado al sonido
    sound.volume = volume;

    // Reproducir el sonido
    sound.play();
}

// Función para reproducir sonidos de manera proporcional al valor
function playSound(value) {
    let sound = new Audio('sfx-horror.mp3');
    
    // Definir el rango de valores posibles (ajustar según tus datos)
    const minValue = 394139961;           // Valor mínimo (ajústalo según el rango de tus datos)
    const maxValue = 2555674559;     // Valor máximo (ajústalo según el rango de tus datos)

    // Calcular el volumen proporcionalmente entre 0 y 1
    let volume = (value - minValue) / (maxValue - minValue);

    // Asegurarse de que el volumen esté entre 0 y 1
    volume = Math.min(Math.max(volume, 0), 1);

    // Asignar el volumen calculado al sonido
    sound.volume = volume;

    // Reproducir el sonido
    sound.play();
}


// Función para crear el gráfico
function createChart(data) {
    const ctx = document.getElementById('graph').getContext('2d');
    const chartData = {
        labels: data.labels,  // Usamos las etiquetas del archivo JSON
        datasets: [{
            label: "Total de mortalidad",
            data: data.datasets[0].data,  // Usamos los datos de mortalidad
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    

    // Creamos el gráfico
    new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },    onClick: function (event, chartElement) {
           
                const datasetIndex = chartElement[0]._index;
                const value = chartData.datasets[0].data[datasetIndex]; 
    
    
                // Reproducir el sonido basado en el valor del punto
                playSound(value);}
        } // Detectar el clic sobre el gráfico
    
    });
}


function createChart_3(data){
    const ctx = document.getElementById("grafico_tendencias").getContext("2d")
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    title: {
                        display: true,
                        text: 'Año'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            return `${context.dataset.label}: ${context.raw} defunciones`;
                        }
                    }
                }
            },            // Detectar el clic sobre el gráfico
            onClick: function (event, chartElement) {
                const datasetIndex = chartElement[0]._index;
                //const value = chartData.datasets[0].data[datasetIndex];
                console.log(chartElement)

                    // Reproducir el sonido basado en el valor del punto
                    playSound(value);
                }
        }
    });
}


function createChart_2(data){
    const ctx = document.getElementById("grafico_sexo_ano").getContext("2d");
    
    const chartData = {
        labels: data.labels,  // Los años como etiquetas en el eje X
        datasets: data.datasets  // Usamos los datasets (Mujer y Hombre)
    };

    // Crear el gráfico con Chart.js
    new Chart(ctx, {
        type: 'line',  // Tipo de gráfico: línea
        data: chartData,
        options: {
            responsive: true,  // Hacer el gráfico responsivo
            scales: {
                y: {
                    beginAtZero: true,  // El eje Y comienza en cero
                    title: {
                        display: true,
                        text: 'Cantidad de defunciones'  // Título del eje Y
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Año'  // Título del eje X
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',  // La leyenda estará en la parte superior
                    title: {
                        display: true,
                        text: 'Sexo'  // Título de la leyenda
                    }
                },
                title: {
                    display: true,
                    text: 'Tendencia de defunciones por año'  // Título del gráfico
                }
            },            // Detectar el clic sobre el gráfico
            onClick: function (event, chartElement) {
           
                    const datasetIndex = chartElement[0]._index;
                    //const value = chartData.datasets[datasetIndex].data[datasetIndex];
                    const value = chartData.datasets[0].data[datasetIndex]; 


                    // Reproducir el sonido basado en el valor del punto
                    playSound(value);}
        }
    }); 
}

// Cargar los datos y crear el gráfico al cargar la página
window.onload = loadData;