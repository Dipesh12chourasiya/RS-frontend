
// import './App.css'

import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";

function App() {

  return (
    <div>
      {/* <h1 className='bg-blue-900 h-screen text-white flex items-center justify-center'>Hello World</h1> */}
      <Navbar />
      <Home/>
      <Footer />
    </div>
  )
}

export default App;
