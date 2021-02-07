import './App.css';

import Card from './components/Card';


function App() {
  const card1 = {
    img: 'https://onex.am/img/svg/step1.svg',
    imageAlt: 'location',
    text: 'card1 description'
  };

  const card2 = {
    img: 'https://onex.am/img/svg/step2.svg',
    imageAlt: 'shopping',
    text: 'card2 description'
  };

  const card3 = {
    img: 'https://onex.am/img/svg/step3.svg',
    imageAlt: 'delivery',
    text: 'card3 description'
  };  

  return (
    <div className="app">
      <div className="card_wrapper">
        <Card img={card1.img} imgAlt={card1.imageAlt} text={card1.text} obj={card1} />
        <Card img={card2.img} imgAlt={card2.imageAlt} text={card2.text} />
        <Card img={card3.img} imgAlt={card3.imageAlt} text={card3.text} />
      </div>
    </div>
  );
}

export default App;
