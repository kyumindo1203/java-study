import { useState } from 'react'

function App() {

  const [count, setCount] = useState(0);
  const rightClick = () =>{
    setCount(count+1);
  }
  const leftClick = (event)=>{
    event.preventDefault(); 
    if(count <= 0){
      console.log("0이하입니다!");
    }
    else{
      setCount(count-1);
    }
  }
  return (
    <div style={{ textAlign: 'center', marginTop: '50px'}}>
    <h3>내 첫 번째 리액트 앱 🚀</h3>
    <p>리액트가 얼마나 편한지 테스트해봅시다.</p>
    <button
    onClick = {rightClick}
    onContextMenu={leftClick}
    style={{ padding: '10px 20px', fontSize: '21px', cursor: 'pointer' }}
    >
      현재 클릭 횟수 : {count} 번
    </button>

    </div>

  )
}

export default App
