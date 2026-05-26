
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { PlaceProvider } from "./context/PlaceContext.jsx";
import { FoodProvider } from './context/FoodContext.jsx'
import { RestaurantProvider } from './context/RestaurantContex.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>  {/* App-ah BrowserRouter-kulla wrap pannungho */}
    <PlaceProvider>  {/* place api data fetch and global variable */}
    <FoodProvider>  {/* food api data fetch and global variable */}
    <RestaurantProvider>  {/* foodrestaurant api data fetch and global variable */}
      <App />
    </RestaurantProvider>
    </FoodProvider>
    </PlaceProvider>
  </BrowserRouter>,
)
