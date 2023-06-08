import { html } from 'https://cdn.skypack.dev/lit-html';
import { $$component } from "./core.js";

export const Stars = ({ container, props }) => {
  $$component({
    container,
    template,
  });
  function template() {
    // const vw = window.outerWidth;
    // const vh = window.outerHeight;
    const vw = 3000
    const vh = 900;

    const getBoxShadows = () => {
      const mapBoxShadow = () => {
        const w = parseInt(Math.random() * vw);
        const h = parseInt(Math.random() * vh);

        const color = parseInt(Math.random() * 2) === 1 ? '#ffffff' : 'var(--warn-color)';
        return `${w}px ${h}px 3px 1px ${color}`;
      }

      return new Array(500).fill(0).map(mapBoxShadow);
    }

    return html`
      <style>
        .stars {
          color: #f2f68f;
          width: 1px;
          height: 1px;
          border-radius: 50%;
          box-shadow: ${getBoxShadows().join(', ')};
        }
      </style>
      <div class="stars"></div>

    `
  }
}