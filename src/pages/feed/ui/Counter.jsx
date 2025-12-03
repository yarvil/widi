import { useDispatch, useSelector } from "react-redux";
import { selectCounterValue } from "@/app/store/counter/counterSelectors";
import { increment, decrement, addBy } from "@/app/store/counter/counterSlice";

export default function Counter() {
  const value = useSelector(selectCounterValue);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Counter: {value}</h2>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(addBy(5))}>+5</button>
    </div>
  );
}
