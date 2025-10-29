import ExpandableMenu from "./Components/Menus/ExpandableMenu";
import MouseFollower from "./Components/Mouse/MouseFollower";
import DotsGrid from "./Components/Effects/DotsGrid";
import AnimatedBorder from "./Components/UI/AnimatedBorder";

function App() {
	// const [count, setCount] = useState(0)

	return (
		<>
			<MouseFollower />
			<ExpandableMenu />
			<div className="absolute top-10 left-10 z-20">
				<AnimatedBorder>
					<div className="p-8">
						<h1 className="text-4xl text-white">Hover me</h1>
					</div>
				</AnimatedBorder>
			</div>
			<DotsGrid />
		</>
	);
}

export default App;
