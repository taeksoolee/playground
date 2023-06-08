import { LoginForm } from './LoginForm.js';
import { Stars } from './Stars.js';

LoginForm({
  container: document.getElementById('root'),
  props: {
    data: [
      {
        label: 'ID',
        name: 'id',
        validator(val) {
          if (val === '') throw Error('아이디는 필수 값입니다.');          
          return true;
        }
      },
      {
        label: 'password',
        name: 'password',
        validator(val) {
          if (val === '') throw Error('비밀번호는 필수 값입니다.');
          return true;
        }
      },
      {
        label: 'Auto Login',
        name: 'auto',
        type: 'checkbox',
        validator(val) {

        }
      }
    ],
    onSubmit(formData) {
      console.log(formData);
    }
  }
});


Stars({
  container: document.getElementById('stars-container')
})