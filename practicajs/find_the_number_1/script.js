const botones = document.getElementsByClassName('boton')
const caja = document.getElementById('caja')
const cajaBotones = document.getElementById('botones')
const botonVolverInicio = document.getElementById('button')
const textos = document.getElementById('textos')
const textoAyuda = document.getElementById('textoAyuda')
const contador = document.getElementById('contador')
const titulo = document.getElementById('titulo')
const imagePresentation = document.getElementById('imagePresentation')
const cajaImagenPresentation = document.getElementById('cajaImagenPresentation')

for (let i = 0, cant = 9; i < botones.length ; i++, cant += 7) {
  botones[i].addEventListener('click', () => doGame(cant))
  botones[i].addEventListener('mouseover', () => setImage(i))
  botones[i].addEventListener('mouseout', () => removeImage(i))
}

function setImage(number) {
  if (number == 3) {
    imagePresentation.src = `img/the_rock.gif`
  } else {
    imagePresentation.src = `img/${number}.png`
  }
}

function removeImage(argument) {
  imagePresentation.src = 'img/white.jpeg'
}

function doGame(cant) {
  let tablero = setParagraphs(cant)
  stylizeParagraphs(tablero)
  let coordenadas = makeCoordenates(tablero, cant)
  tablero.addEventListener('click', (event) => SeeCoordinates(event, coordenadas))
}

function setParagraphs(cant) {
  let content = '0 '.repeat(cant*cant)
  let parrafo = document.createElement('p')
  parrafo.setAttribute('id', 'tableroDeJuego')
  parrafo.textContent = content

  if (cant == 30) {
    parrafo.style.width = '550px'
    parrafo.style.height = 'auto'
  } else if (cant == 23) {  
    parrafo.style.width = '360px'
    parrafo.style.height = 'auto'
  } else if (cant == 16) {
    parrafo.style.width = '250px'
    parrafo.style.height = 'auto'
  } else {
    parrafo.style.width = '140px'
    parrafo.style.height = 'auto'
  }

  cajaBotones.style.display = 'none'
  botonVolverInicio.before(parrafo)

  const tablero = document.getElementById('tableroDeJuego')
  tablero.style.margin = '0px'

  botonVolverInicio.style.display = 'block'
  botonVolverInicio.addEventListener('click', volverAlInicio)

  textos.style.display = 'flex'
  cajaImagenPresentation.style.display = 'none'

  return tablero
}

function stylizeParagraphs(tablero) {
  let withSpan = tablero.innerHTML.split('').map((letra) => `<span>${letra}</span>` ).join('')
  tablero.innerHTML = withSpan

  const ceros = document.querySelectorAll('span');
  ceros.forEach(cero => {
    cero.addEventListener('mouseover', () => {
      cero.style.color = '#40e49c';
      cero.style.fontWeight = 'bold'
      cero.style.fontSize = '20px'
    });

    cero.addEventListener('mouseout', () => {
      cero.style.color = '';
      cero.style.fontWeight = 'normal'
      cero.style.fontSize = '16px'
    });
  });
}

function makeCoordenates(tablero, cant) {
  let cantidad = Math.floor((cant*cant)/2)
  const numeroParAleatorio = Math.floor(Math.random() * (cantidad)) * 2
  let ceros = Array.from(tablero.querySelectorAll('span'))
  let objetivo = ceros[numeroParAleatorio]
  let coordenadas = objetivo.getBoundingClientRect()
  return {
    izquierda: coordenadas.x - 1.3,
    arriba: coordenadas.y - 1.3,
    derecha: coordenadas.x + 11.4833 ,
    abajo: coordenadas.y + 20.3
  }
}

function volverAlInicio() {
  location.reload()
}

function SeeCoordinates(event, coordenadas) {
  let coordenadasMouse =  {
    izquierda: event.clientX,
    arriba: event.clientY
  }
  let verticalmenteBien = coordenadasMouse.izquierda < coordenadas.derecha && coordenadasMouse.izquierda > coordenadas.izquierda
  let horizontalmenteBien = coordenadasMouse.arriba < coordenadas.abajo && coordenadasMouse.arriba > coordenadas.arriba

  if (verticalmenteBien && horizontalmenteBien) {
    startFelicitaciones()
  } else {
    if (verticalmenteBien) {
      content = 'Estas verticalmente bien!!!'
    } else if (coordenadasMouse.izquierda > coordenadas.izquierda) {
      content = 'Mas a la izquierda'
    } else {
      content = 'Mas a la derecha'
    }


    if (horizontalmenteBien) {
      content2 = ' y Estas bien horizontalmente!!!!'
    } else if (coordenadasMouse.arriba > coordenadas.arriba) {
      content2 = ' y Mas arriba esta'
    } else {
      content2 = ' y Mas abajo esta'
    }
    textoAyuda.textContent = content + content2
    contador.textContent = parseInt(contador.textContent)  + 1
  }

}

function startFelicitaciones(argument) {
  let tablero = document.getElementById('tableroDeJuego')
  tablero.remove()
  textos.style.display = 'none'
  titulo.style.display = 'none'

  let image = document.getElementById('image')
  image.style.display = 'flex'
  let felicidades = document.createElement('p')
  felicidades.style.fontSize = '40px'
  felicidades.style.margin = '15px 0px'
  felicidades.textContent = 'Felicidades!!'
  botonVolverInicio.before(felicidades)
}