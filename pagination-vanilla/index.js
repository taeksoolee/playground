const PER_PAGE = 3;
const MAX_PAGER = 3;

/** @type {HTMLButtonElement} */
const firstPageBtn = document.querySelector('button[first-page-btn]');
/** @type {HTMLButtonElement} */
const previousPageBtn = document.querySelector('button[previous-page-btn]');
/** @type {HTMLButtonElement} */
const nextPageBtn = document.querySelector('button[next-page-btn]');
/** @type {HTMLButtonElement} */
const lastPageBtn = document.querySelector('button[last-page-btn]');

/** @type {HTMLDivElement} */
const paginationPreviousContainer = document.querySelector('#paginationPreviousContainer');
/** @type {HTMLDivElement} */
const paginationNextContainer = document.querySelector('#paginationNextContainer');

/** @type {HTMLDivElement} */
const previousEllipsis = paginationPreviousContainer.querySelector('#previousEllipsis');
/** @type {HTMLDivElement} */
const nextEllipsis = paginationNextContainer.querySelector('#nextEllipsis');

/**
 * @typedef Meta
 * @property {number} cur
 * @property {number} perPage
 * @property {number} last
 * @property {number} next
 * @property {number} first
 * @property {number} previous
 * @property {number} total
 */
/**
 * @typedef User
 * @property {number} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {boolean} isActive
 */

/**
 * @typedef Payload
 * @property {Meta} meta
 * @property {User[]} list
 */

/**
 * @param {number} page 
 * @param {(payload: Payload) => void} callback 
 */
function fetchUserWithPagination(page, callback) {
  fetch(`http://localhost:4000/api/auth?cur=${page}&perPage=${data.meta.perPage}`)
    .then(res => res.json())
    .then(data => {
      callback(data);
    });
}

/** @type {Payload} */
const defaultData = {
  meta: {
    cur: 1,
    perPage: PER_PAGE,
    first: 1,
    last: 1,
    next: null,
    previous: null,
    total: 0,
  },
  list: [],
};

/** @type {[HTMLButtonElement, Function][]} */
const paginstaionItemList = [];

const data = new Proxy(defaultData, {
  get(target, props) {
    return target[props];
  },
  set(target, props, receiver) {
    switch(props) {
      case 'meta':
        const meta = receiver;
        target.meta = meta;
        updatePagination(meta);
        break;
      case 'list':
        const userList = receiver;
        target.list = userList;
        renderPageList(userList);
        break;
      default:
        // target[props] = receiver;
        break;
    } 
  }
});

/**
 * @param {number} curPage 
 */
function goPage(curPage) {
  fetchUserWithPagination(curPage, (payload) => {
    data.meta = payload.meta;
    data.list = payload.list;
  });
}

/**
 * @param {HTMLButtonElement} target
 */
function goPageSpecificNumber() {
  const pageNum = this.getAttribute('page-num');
  goPage(pageNum);
}

/**
 * 
 * @param {User[]} userList 
 */
function renderPageList(userList) {
  /** @type {(keyof User)[]} */
  const userKeys = ['id', 'firstName', 'lastName', 'isActive'];

  /** @type {HTMLTableElement} */
  const tbody = document.querySelector('#userTable tbody');

  /** @type {NodeListOf<HTMLTableRowElement>} */
  const trs = tbody.querySelectorAll('tr');
  trs.forEach(tr => tr.remove());

  userList.forEach((user) => {
    /** @type {HTMLTableRowElement} */
    const tr = document.createElement('tr');
    
    userKeys.forEach(key => {
      /** @type {HTMLTableCellElement} */
      const td = document.createElement('td');
      td.innerText = user[key];
      const classList = td.classList;
      classList.add('p-2');
      classList.add('border-2');
      classList.add('border-primary');
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  const restRows = Array.from({length: Math.abs(userList.length-PER_PAGE)}, () => null);

  if (restRows.length > 0) {
    restRows.forEach(() => {
      /** @type {HTMLTableRowElement} */
      const tr = document.createElement('tr');
      userKeys.forEach(() => {
        const td = document.createElement('td');
        td.innerText = '-';
        const classList = td.classList;
        classList.add('p-2');
        classList.add('border-2');
        classList.add('border-primary');
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }
}

/**
 * @param {Meta} metaData 
 */
function updatePagination(metaData) {
  /** @type {HTMLDivElement} */
  const paginationNumbersContainer = document.querySelector('#pageinationNumbersContainer');
  /** @type {NodeListOf<HTMLButtonElement>} */
  const numbersBtns = paginationNumbersContainer.querySelectorAll('button');
  numbersBtns.forEach(btn => {
    btn.removeEventListener('click', goPageSpecificNumber);
    btn.remove();
  });

  /**
   * 이동 가능한 페이지 목록을 생성한다.
   */
  const allNums = [];
  for (let i=metaData.first; i<metaData.last+1; i++) {
    allNums.push(i);
  }
  
  let [p1, p2] = [metaData.cur, metaData.cur];
  const nums = [metaData.cur];
  while (true) {
    [p1, p2] = [p1-1, p2+1];
    if (p1 < metaData.first && p2 > metaData.last) break;

    p2 <= metaData.last && nums.length < MAX_PAGER && nums.push(p2);
    p1 >= metaData.first && nums.length < MAX_PAGER && nums.unshift(p1);
    if (nums.length === MAX_PAGER) break;
  }
  
  nums.forEach(num => {
    const numStr = num+'';

    /** @type {HTMLButtonElement} */
    const button = document.createElement('button');

    const classList = button.classList;
    classList.add('flex');
    classList.add('justify-center');
    classList.add('items-center');
    classList.add('w-10');
    classList.add('h-10');
    classList.add('p-2');
    classList.add('m-2');
    classList.add('border-2');
    classList.add('border-primary');
    num === metaData.cur && classList.add('bg-primary');

    button.setAttribute('move-page-btn', '');
    button.setAttribute('page-num', numStr);

    button.innerText = numStr;
    button.addEventListener('click', goPageSpecificNumber);

    paginationNumbersContainer.appendChild(button);
  });

  firstPageBtn.innerText = `${metaData.first}`;
  lastPageBtn.innerText = `${metaData.last}`;

  
  metaData.first < nums[0]
    ? paginationPreviousContainer.classList.remove('hidden')
    : paginationPreviousContainer.classList.add('hidden');

  metaData.last > nums[nums.length-1]
    ? paginationNextContainer.classList.remove('hidden')
    : paginationNextContainer.classList.add('hidden');

  nums[0]-1 === metaData.first
    ? previousEllipsis.classList.add('hidden')
    : previousEllipsis.classList.remove('hidden');

  nums[nums.length-1]+1 === metaData.last
    ? nextEllipsis.classList.add('hidden')
    : nextEllipsis.classList.remove('hidden');

  metaData.previous 
    ? previousPageBtn.removeAttribute('disabled')
    : previousPageBtn.setAttribute('disabled', 'true') ;

  metaData.next
    ? nextPageBtn.removeAttribute('disabled')
    : nextPageBtn.setAttribute('disabled', 'true');
}

firstPageBtn.addEventListener('click', function() {
  goPage(data.meta.first);
});
previousPageBtn.addEventListener('click', function() {
  goPage(data.meta.previous);
});
nextPageBtn.addEventListener('click', function() {
  goPage(data.meta.next);
});
lastPageBtn.addEventListener('click', function() {
  goPage(data.meta.last);
});

goPage(data.meta.cur);