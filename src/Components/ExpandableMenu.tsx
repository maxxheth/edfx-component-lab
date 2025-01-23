import React, { useState } from "react";

const ExpandableMenu: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative">
			<button
				type="button"
				className="px-4 py-2 w-auto bg-blue-500 text-white rounded cursor-pointer relative z-10"
				onClick={toggleMenu}
			>
				Toggle Menu
			</button>
			<nav
				className={`transition-opacity duration-300
		fixed top-0 left-0 w-full h-full bg-black pointer-events-none z-0`}
			>
				<div className="grid grid-cols-3 gap-4 p-4 h-screen pointer-events-auto">
				{/* <div
					className="z-10 grid gap-8 h-max grid-cols-[minmax(1px,_1fr)_minmax(1px,_1fr)_minmax(1px,_1fr)_minmax(1px,_1fr)_minmax(1px,_1fr)_minmax(1px,_1fr)_minmax(1px,_1fr)_minmax(1px,_1fr)_minmax(1px,_1fr)_minmax(1px,_1fr)_minmax(1px,_1fr)_minmax(1px,_1fr)_minmax(1px,_1fr)_minmax(1px,_1fr)_minmax(1px,_1fr)_minmax(1px,_1fr)] grid-rows-[minmax(auto,_1fr)_minmax(auto,_1fr)] auto-cols-fr p-8 relative"
				> */}
					{[
						{ name: "Menu Item 1", gridArea: "1 / 1 / 30 / 2", id: "1" },
						{ name: "Menu Item 2", gridArea: "1 / 2 / 15 / 2", id: "2" },
						{ name: "Menu Item 3", gridArea: "15 / 2 / 30 / 2", id: "3" },
						{ name: "Menu Item 4", gridArea: "1 / 3 / 15 / 4", id: "2" },
						{ name: "Menu Item 5", gridArea: "15 / 3 / 30 / 4", id: "3" },
						// { name: 'Menu Item 3', gridArea: '1 / 12 / 2 / -1' },
						// { name: 'Menu Item 4', gridArea: '2 / 7 / 3 / 12'},
						// { name: 'Menu Item 5', gridArea: '2 / 12 / 3 / -1'},
					].map((item, index) => (
						<div
							key={item?.id}
							style={{
								gridArea: item?.gridArea,
								transitionDelay: `${index * 15}ms`,
							}}
							className={`
                  bg-red w-50 h-auto p-4 rounded shadow-lg transform transition-transform bg-white
				  ${isOpen ? "duration-500" : "duration-1000"}
                  ${isOpen ? "scale-100" : "scale-0"}
                  ${isOpen ? "origin-top-left" : "origin-bottom-right"}
                `}
						>
							{item?.name}
						</div>
					))}
				</div>
			</nav>
		</div>
	);
};

export default ExpandableMenu;
