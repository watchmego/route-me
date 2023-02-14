
import logo from '../../assets/logo.jpg';
import ('./header.css');


export default function HeaderBox() {
    return (
        <div className="header">
            <div><img src={logo} alt="Logo"/></div>
            <div>login/signup</div>
        </div>
    )
}