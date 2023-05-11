import './style.css';
import { SVG } from '@svgdotjs/svg.js';
import gsap from 'gsap';

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
console.log('SIZES: ', { ...sizes });

let squares: any[] = [];
let draw = SVG().addTo('body').size(sizes.width, sizes.height);

const drawGrid = () => {
  const squareSize = 0.1 * window.innerWidth;
  const numberOfSquaresWidth = Math.ceil(sizes.width / squareSize);
  const numberOfSquaresHeight = Math.ceil(sizes.height / squareSize);

  for (let i = 0; i < numberOfSquaresWidth; i++) {
    for (let j = 0; j < numberOfSquaresHeight; j++) {
      const square = draw.group();

      square
        .rect(squareSize, squareSize)
        .move(i * squareSize, j * squareSize)
        .fill('transparent');

      square
        .polygon(`0,0  ${squareSize},${squareSize} 0,${squareSize}`)
        .move(i * squareSize, j * squareSize);

      square.rotate(Math.floor(Math.random() * 4) * 90);
      square.fill('#fff');
      const calcOpacity = Math.ceil(Math.random() * 4) / 4;
      console.log('calcOpacity: ', calcOpacity);
      square.attr('final-opacity', calcOpacity);
      square.opacity(Math.floor(Math.random() * 4) / 4);
      square.stroke({
        color: '#bbff55',
        width: 1,
        linecap: 'round',
        linejoin: 'round',
      });
      squares.push(square);
    }
  }
  return squares;
};

const addEventListeners = () => {
  const polygons = document.querySelectorAll('g');
  polygons.forEach((polygon) => {
    polygon.setAttribute('opacity', '0');
    polygon.addEventListener('mouseenter', () => {
      console.log(polygon.getAttribute('final-opacity'));

      gsap.to(polygon, {
        opacity: parseFloat(polygon.getAttribute('final-opacity') || '0'),
        duration: 0.3,
        transformOrigin: '50% 50%',
      });
    });
    polygon.addEventListener('mouseleave', () => {
      gsap.to(polygon, {
        opacity: 0,
        duration: 2,
        transformOrigin: '50% 50%',
      });
    });
  });
};

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  draw.size(sizes.width, sizes.height);

  squares.forEach((square) => {
    square.remove();
  });

  squares = drawGrid();
  addEventListeners();
});

squares = drawGrid();
addEventListeners();
