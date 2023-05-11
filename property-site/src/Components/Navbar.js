import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import './navbar.css';
import SellerPage from "./Seller/SellerPage";
import AddSeller from "./Seller/AddSeller";
import BuyerPage from "./Buyer/BuyerPage";
import AddBuyer from "./Buyer/AddBuyer";
import PropertyPage from "./Property/PropertyPage";
import SellerPropertiesPage from './Property/SellerProperties';
import AddProperty from "./Property/AddProperty";
 
function NavBar(){
 
	return(
		<BrowserRouter>
		<nav className="navbar navbar-expand-lg bg-light">
			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
				
				<li className="nav-item">
					<Link className="nav-link" to="/">Home</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/seller">Seller</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/buyer">Buyer</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/properties">Property</Link>
				</li>

			</ul>
		</nav>
		<Routes>
			<Route path="/seller" element={<SellerPage/>} />
			<Route path="/buyer" element={<BuyerPage/>} />
			<Route path="/add-seller" element={<AddSeller/>} />
			<Route path="/add-buyer" element={<AddBuyer/>} />
			<Route path="/properties" element={<PropertyPage/>} />
			<Route path="/seller-properties/:sellerId" element={<SellerPropertiesPage />} />
			<Route path="/add-property/:sellerId" element={<AddProperty />} />
			{/* Add other routes here */}
		</Routes>
		</BrowserRouter>
	)
}

export default NavBar