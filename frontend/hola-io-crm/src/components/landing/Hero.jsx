import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";


const Hero = () => {
    const { isAuthenticated }= useAuth();
    return (
    <div>Hero Section</div>
  )
}

export default Hero