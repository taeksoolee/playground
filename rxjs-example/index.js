import { createApp, defineComponent, ref, reactive, onMounted } from 'vue';
import { of, scan, map, startWith, interval, take, range, takeLast, fromEvent } from 'rxjs';

// of(1,2,3,4,5,6,7).pipe(
//   scan((total, n) => {
//     console.log(':::', total, n);
//     return total + n;
//   }),
//   map((sum, index) => {
//     console.log('!!', sum, index);
//     return sum / (index+1);
//   }),
//   startWith(-1),
// ).subscribe(console.log);

// interval(1000).pipe(
//   take(40),
//   map(e => e * 2),
// ).subscribe(console.log);

// range(100).pipe(
//   map(e => e+1),
//   takeLast(3),
// ).subscribe(console.log);

const Clock = defineComponent({
  name: 'Clock',
  setup() {
    const timer = ref(new Date());
    interval(1000).pipe()
      .subscribe(function() {
        timer.value = new Date();
      });

    return {
      timer,
    }
  },
  render({ timer }) {
    return (
      <div>
        <h3>Clock</h3>
        <div>
          { timer.toString() }
        </div>
      </div>
    );  
  }
});

const List = defineComponent({
  name: 'List',
  setup() {
    const list = reactive([]);

    of('kim', 'lee', 'pack').pipe()
      .subscribe(name => {
        list.push(name);
      })

    return {
      list,
    }
  },
  render({ list }) {
    return (
      <div>
        <h3>List</h3>

        <ul>
          {list.map((item, i) => {
            return (
              <li key={i}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    )
  } ,
});

const Form = defineComponent({
  name: 'Form',
  setup() {
    const formData = reactive({
      text: '',
      message: '',
    });

    const preventEvent = (e) => {
      e.preventDefault();
    }

    const onChange = (key, value) => {
      formData[key] = value;
    }

    const formRef = ref(null);
    
    onMounted(() => {;
      fromEvent(formRef.value, 'submit')
        .pipe(
          map((e) => e.target),
        )
        .subscribe(function(form) {
          console.log(form, formData);
        });
    })

    return {
      preventEvent,
      onChange,
      formData,
      formRef,
    }
  },
  render({ preventEvent,onChange, formData,  }) {
    return (
      <form ref="formRef" onSubmit={preventEvent} >
        <input value={formData.text} onChange={(e) => onChange('text', e.target.value)} />
        <button>Submit!</button>
      </form>
    )
  },
});

const App = defineComponent({
  name: 'App',
  setup() {
    const name = ref('taeksoolee');

    return {
      name,
    }
  },
  render({ name }) {
    return (
      <>
        <h1>Hello, { name }</h1>
        <hr />
        <Clock />
        <hr />
        <List />
        <hr />
        <Form />
      </>
    );  
  },
});

createApp(App).mount('#root');