import { useReducer } from "react";

function reducer(state: any, action: any) {
  return {
    ...state,
    [action.name]: action.value
  };
}

export default function useFields(initialValues: any) {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const onChange = (event: React.ChangeEvent) => {
    dispatch(event.currentTarget);
  };

  return [state, onChange];
}
