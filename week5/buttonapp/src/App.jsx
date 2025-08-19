import { useState } from "react";

function App(){
  const [count,setCount] = useState(0);

  function buttonHandler(){
    setCount(count+1);
  }
  return(
    <div>
      <button onClick={buttonHandler}>Counter {count}</button>
    </div>
  )
}

export default App;