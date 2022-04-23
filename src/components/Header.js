import headerLogo from '../images/header-logo.svg';

export default function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Логотип Место" />
        </header>
    );
}

