import { useState } from "react";

function App(){
  const [count,setCount] = useState(0);

  function buttonHandler(){
    setCount(count+1);
  }
  return(
    <div>
      <CustomButton count={count} setCount={setCount}></CustomButton>
    </div>
  )
}
//component
function CustomButton(props){
  function onclickHandler(){
    props.setCount(props.count+1);
  }
  return <button onClick={onclickHandler}>counter{props.count}</button>
}
export default App;