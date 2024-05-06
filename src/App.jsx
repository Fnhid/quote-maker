import { useState } from 'react';
import githubLogo from '../github-mark-white.svg';
import './App.css';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { useRef } from 'react';

function App() {
  const divRef = useRef(null);
  const [count, setCount] = useState(0);
  const [quote, setQuote] = useState('');
  const [quoter, setQuoter] = useState('');
  const handleQuoterChange = (e) => {
    if(e.target.value == '') {
      setQuoter('');
    } else {
      setQuoter('- ' + e.target.value + ' -');
    }
  }
  const handleDownload = async () => {
    const div = divRef.current;
    if (!div) {
      return;
    }
    try {
      const canvas = await html2canvas(div, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, "quote.png");
        }
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };
    
  return (
    <>
      <h1>이 사이트를 발견한 당신, 무언가 명언을 남겨야 할 것 같습니다..</h1>
      <div ref={divRef} className="card">
        <p className='quote'>
          {quote}
        </p>
        <p className='quoter'>
          {quoter}
        </p>
      </div>

      <div className='input-div'>  
        <div className='quote-div'>
          <p className='name-div'>명언</p>
          <textarea onChange={(e) => {setQuote(e.target.value)}}/>
        </div>
        <div className='quoter-div'>
          <p className='name-div'>이름</p>
          <input onChange={handleQuoterChange}/>
        </div> 
      
      <div className='save-button' onClick={handleDownload}>다운로드!</div>
        <a href="https://github.com/Fnhid/quote-maker" target="_blank">
          <img src={githubLogo} className="logo" alt="Github logo" />
        </a>
      </div>
    </>
  )
}

export default App;