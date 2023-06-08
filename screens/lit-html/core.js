import { render } from 'https://cdn.skypack.dev/lit-html';
import { Subject } from 'https://cdn.skypack.dev/rxjs';

export function $$component({ template, container, initialState={}}){
  const state$ = new Subject();

  let _state = {};

  state$.subscribe({
    next(state) {
      _state = state;
      render(template(state), container);
    }
  });

  state$.next(initialState);

  return {
    setState(state) {
      if (typeof state === 'function') {
        const result = state(_state);
        state$.next(result);  
        return;
      }
      
      state$.next(state);
    }
  };
}