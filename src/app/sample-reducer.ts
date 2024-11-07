type State = {};
const initialState: State = {};
export const Sample_Reducer = (
  state: State = initialState,
  action: Actions
): State => {
  switch (action.type) {
    case "CASE": {
      const { par, par2 } = action.payload;
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export const sample_AC = (payload: { par: string; par2: string }) => {
  return {
    type: "CASE",
    payload,
  } as const;
};
export type SampleAction = ReturnType<typeof sample_AC>;
export type Actions = SampleAction;
