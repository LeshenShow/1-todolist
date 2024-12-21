import { Grid2, Paper } from "@mui/material";
import { useGetTodolistsQuery } from "features/todolists/api/todolistsApi";
import { TodolistSkeleton } from "../TodolistsSkeleton/TodolistsSkeleton";
import { Todolist } from "./Todolist/Todolist";

export function Todolists() {
  // redux & thunk
  // const todolists = useAppSelector(selectTodolists);
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchTodolistsTC());
  // }, []);

  // skip variant
  // const [skip, setSkip] = useState(true);
  // const { data: todolists } = useGetTodolistsQuery(undefined, { skip });
  // const setTodolistHandler = () => {
  //   setSkip(false);
  // };

  // lazy variant
  // const [trigger, { data: todolists }] = useLazyGetTodolistsQuery();

  const {
    data: todolists,
    refetch,
    isLoading,
  } = useGetTodolistsQuery(undefined, {
    pollingInterval: 3000,
    skipPollingIfUnfocused: true,
  });
  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </div>
    );
  }
  return (
    <>
      {/* <div style={{ display: "flex", justifyContent: "space-between", gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </div> */}
      {/* <button onClick={() => refetch()}>update data</button> */}
      {/* <button onClick={() => trigger()}>SKIP</button> */}
      {/* {skip && <button onClick={setTodolistHandler}>SKIP</button>} */}
      {todolists?.map((todolist) => (
        <Grid2 key={todolist.id}>
          <Paper elevation={8} sx={{ p: "20px" }}>
            <Todolist todolist={todolist} />
          </Paper>
        </Grid2>
      ))}
    </>
  );
}
