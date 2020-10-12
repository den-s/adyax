const LOAD = 'sample/LOAD';
const LOAD_SUCCESS = 'sample/LOAD_SUCCESS';
const LOAD_FAIL = 'sample/LOAD_FAIL';

const TOGGLE = 'sample/TOGGLE';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case TOGGLE:
      return {
        ...state,
        value: !state.value
      };
    default:
      return state;
  }
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/cart/')
  };
}

export function toggle() {
  return {type: TOGGLE};
}
