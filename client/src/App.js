import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [price, setPrice] = useState({
    average: 0,
    highest: 0,
    lowest: 0,
  });
  const [loading, setLoading] = useState(true);

  const loadOilPrice = async () => {
    const interval = setInterval(() => {
      setPrice({
        average: parseInt(Math.random() * 10000),
        highest: parseInt(Math.random() * 10000),
        lowest: parseInt(Math.random() * 10000),
      });
    }, 100);
    const ret = await fetch('https://api-oilprice.6unu.net');
    const { average, highest, lowest } = await ret.json();
    clearInterval(interval);
    setLoading(false);
    setPrice({
      average,
      highest,
      lowest
    });
  }

  useEffect(() => {
    loadOilPrice();
  }, []);

  return (
    <div className="App">
      <div className="header">
        <a href='https://github.com/6unpk/daily-oil-price' style={{fontSize: '24px'}}>
          <i className="fa-brands fa-github"></i>
        </a>
      </div>
      <div className="grid">
        <div className="row">
          평균: {price.average}
        </div>
        <div className="row">
          최저: {price.lowest}
        </div>
        <div className="row">
          최고: {price.highest}
        </div>
      </div>
      {loading && <div className="loading">
        기름 값 가져오는 중...
      </div>}
    </div>
  );
}

export default App;
