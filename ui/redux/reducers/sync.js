import * as ACTIONS from 'constants/action_types';

const reducers = {};
const defaultState = {
  hasSyncedWallet: false,
  syncHash: null,
  syncData: null,
  setSyncErrorMessage: null,
  getSyncErrorMessage: null,
  syncApplyErrorMessage: '',
  syncApplyIsPending: false,
  syncApplyPasswordError: false,
  getSyncIsPending: false,
  setSyncIsPending: false,
  prefsReady: false,
  syncLocked: false,
  hashChanged: false,
  fatalError: false,
};

reducers[ACTIONS.SYNC_STATE_POPULATE] = (state) => {
  const { syncReady } = state;
  if (!syncReady) {
    return Object.assign({}, state, {
      prefsReady: true,
    });
  } else {
    return Object.assign({}, state);
  }
};

reducers[ACTIONS.SET_PREFS_READY] = (state, action) => Object.assign({}, state, { prefsReady: action.data });

reducers[ACTIONS.GET_SYNC_STARTED] = (state) =>
  Object.assign({}, state, {
    getSyncIsPending: true,
    getSyncErrorMessage: null,
  });

reducers[ACTIONS.SET_SYNC_LOCK] = (state, action) =>
  Object.assign({}, state, {
    syncLocked: action.data,
  });

reducers[ACTIONS.GET_SYNC_COMPLETED] = (state, action) =>
  Object.assign({}, state, {
    syncHash: action.data.syncHash,
    syncData: action.data.syncData,
    hasSyncedWallet: action.data.hasSyncedWallet,
    getSyncIsPending: false,
    hashChanged: action.data.hashChanged,
    fatalError: action.data.fatalError,
  });

reducers[ACTIONS.GET_SYNC_FAILED] = (state, action) =>
  Object.assign({}, state, {
    getSyncIsPending: false,
    getSyncErrorMessage: action.data.error,
  });

reducers[ACTIONS.SET_SYNC_STARTED] = (state) =>
  Object.assign({}, state, {
    setSyncIsPending: true,
    setSyncErrorMessage: null,
  });

reducers[ACTIONS.SET_SYNC_FAILED] = (state, action) =>
  Object.assign({}, state, {
    setSyncIsPending: false,
    setSyncErrorMessage: action.data.error,
  });

reducers[ACTIONS.SET_SYNC_COMPLETED] = (state, action) =>
  Object.assign({}, state, {
    setSyncIsPending: false,
    setSyncErrorMessage: null,
    hasSyncedWallet: true, // sync was successful, so the user has a synced wallet at this point
    syncHash: action.data.syncHash,
  });

reducers[ACTIONS.SYNC_APPLY_STARTED] = (state) =>
  Object.assign({}, state, {
    syncApplyPasswordError: false,
    syncApplyIsPending: true,
    syncApplyErrorMessage: '',
  });

reducers[ACTIONS.SYNC_APPLY_COMPLETED] = (state) =>
  Object.assign({}, state, {
    syncApplyIsPending: false,
    syncApplyErrorMessage: '',
  });

reducers[ACTIONS.SYNC_APPLY_FAILED] = (state, action) =>
  Object.assign({}, state, {
    syncApplyIsPending: false,
    syncApplyErrorMessage: action.data.error,
  });

reducers[ACTIONS.SYNC_APPLY_BAD_PASSWORD] = (state) =>
  Object.assign({}, state, {
    syncApplyPasswordError: true,
  });

reducers[ACTIONS.SYNC_FATAL_ERROR] = (state) => {
  return Object.assign({}, state, {
    fatalError: true,
  });
};

reducers[ACTIONS.SYNC_RESET] = () => defaultState;

export default function syncReducer(state = defaultState, action) {
  const handler = reducers[action.type];
  if (handler) return handler(state, action);
  return state;
}
