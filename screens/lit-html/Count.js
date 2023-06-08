import { html } from 'https://cdn.skypack.dev/lit-html';
import { $$component } from './core.js';

export const Count = ({ container, props }) => {
  const { setState } = $$component({
    container,
    template,
    initialState: {
      count: 0,
    }
  });

  function template(state) {
    const increase = () => {
      state.count++;
      setState(state);
    }

    return html`
      <div>Counter</div>

      <div>${state.count}</div>
      <button @click=${increase}>+</button>
    `;
  }
}