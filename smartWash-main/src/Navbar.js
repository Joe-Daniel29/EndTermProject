import {navHamburgerButton, navMenu} from "./DOMElements";
import g from "./Globals";

const showNavMenu = () => {
	navMenu.classList.remove("hidden");
	navMenu.classList.add("flex");
	g.navMenuOpen = true;
}

const hideNavMenu = () => {
	navMenu.classList.remove("flex");
	navMenu.classList.add("hidden");
	g.navMenuOpen = false;
}

const Navbar = () => {
	navHamburgerButton.addEventListener("click", () => {
		if (g.navMenuOpen) {
			hideNavMenu();
		} else {
			showNavMenu();
		}
	});
}

export default Navbar;
