import { useEffect, useReducer } from "react"

export const initialAsyncState = {
  loading: false,
  data: null,
  error: null
}
export function useAsync(fnFetch, skipMounted = false) { 
  const [state, dispatch] = useReducer(asyncReducer, initialAsyncState)
  
  const getData = createAsyncDispatcher(fnFetch)

  useEffect(() => {
    !skipMounted && getData(dispatch)
  }, [])

  return [state, dispatch]
}
export function asyncReducer(state, action) {
  const asyncStates = {
    loading: { loading: true, data: null, error: null },
    success: data => ({ loading: false, data, error: null }),
    error: error => ({ loading: false, data: null, error })
  }
  switch (action.type) {
    case 'LOADING':
      return asyncStates.loading;
    case 'SUCCESS':
      return asyncStates.success(action.data);
    case 'ERROR':
      return asyncStates.error(action.error);
    default:
      throw new Error(`Unhanded action type: ${action.type}`);
  }
}

export function createAsyncDispatcher(fnFetch) {
  return async function(dispatch, params) {
    dispatch({ type: 'LOADING' })
    try {
      const data = await fnFetch(params)
      dispatch({ type: 'SUCCESS', data: data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  }
}