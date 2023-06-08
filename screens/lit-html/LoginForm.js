import { html } from 'https://cdn.skypack.dev/lit-html';
import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';
import { $$component } from "./core.js";
import { getDataStore } from "./utils.js";

export const LoginForm = ({ container, props }) => {
  const formName = 'loginForm';
  const data = props?.data ?? [];
  const onSubmit = props?.onSubmit ?? (() => {});

  const { setState } = $$component({
    container,
    template,
    initialState: {
      data: data.map(v => ({...v, error: ''}))
    }
  });

  function template(state) {
    const { data } = state;

    const formData = getDataStore();
    const errors = getDataStore();

    const names = data.map(v => v.name);
    const validators = data.reduce((a, c) => {
      a[c.name] = c.validator;
      return a;
    }, {});

    /**
     * check form valid and set error
     * @returns {boolean} isValid
     */
    const isValid = () => {
      errors.clear();
      let result = true;
      for (const name of names) {
        const input = window[formName][name];
        const val = input.value;
        formData.set(name, val);

        const validator = validators[name];
        let isFocus = false;
        if (validator) {
          try {
            validator(val);
          } catch (e) {
            if (!isFocus) {
              input.focus();
              isFocus = true;
            }
            errors.set(name, e.message);
            result = false;
          }
        }
      }
      return result;
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      
      const valid = isValid();

      const errorKeyMap = (obj) => ({
        ...obj,
        error: errors.get(obj.name) ?? '',
      });

      setState(() => ({
        ...state,
        data: state.data.map(errorKeyMap),
      }));

      if (valid) {
        onSubmit(formData.getAll());
      }
    }

    return html`
      <style scoped>
        .login-form {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: none;
          width: 300px;
          height: 300px;

          display: flex;
          flex-direction: column;
          justify-content: center;

          box-shadow: inset 0px 0px 10px 2px var(--warn-color), inset 1px 1px 10px 2px var(--warn-color);
          background-color: #ffffff;
          color: black;

          border-radius: 5px;
        }

        .form-control {
          margin-top: 10px;
          text-align: center;
        }

        .text-error {
          height: 5px;
          display: block;
          margin-top: 2px;
          color: var(--error-color);
          font-size: 5px;
          
        }

        .login-form label {
          display: inline-block;
          margin-top: 8px;
          margin-bottom: 4px;
        }

        .login-form input {
          padding: 5px;
          border: none;
          border-bottom: 1px solid var(--warn-color);
        }

        .login-form input:focus {
          border: none;
          border-bottom: 1px solid var(--background-color);
          outline: none;
        }
        

        .login-form button {
          width: 50%;
          padding: 5px;
          border-radius: 5px;
          background-color: var(--warn-color);
          border: 1px solid yellow;
        }
      </style>
      <form class="login-form" name="loginForm" @submit=${handleSubmit}>
        ${data.map(d => {
          const id = uuidv4();

          if(d.type === 'checkbox') {
            return html`
              <div class="form-control">
                <label for=${id}>${d.label}</label>
                <input type="checkbox" id=${id} name=${d.name} />
              </div>
            `;
          }

          return html`
            <div class="form-control">
              <label for=${id}>${d.label}</label>
              <div>
                <input id=${id} name=${d.name}/>
                <div class="text-error">${d.error}</div>
              </div>
            </div>
          `;
        })}
        <div class="form-control">
          <button type="submit">Submit</button>
        </div>
      </form>
    `;
  }
}