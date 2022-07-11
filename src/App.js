import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Posts from './components/Posts';
import RoutesComponents from './routes/RoutesComponents';
function App() {
  return (
   <>
  < div className='body'>
  <Header / >
  
  <RoutesComponents / >

  <Posts/ >
  <Footer / >
  </div>
   </>
  );
}

export default App;
