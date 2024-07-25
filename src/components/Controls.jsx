import AddButton from "./AddButton";
import colors from "../assets/colors.json";
import Color from "./Color";
import LogoutButton from "./LogoutButton";

const Controls = () => {
    return (
        <div id="controls">
            <AddButton />
            {colors.map((color) => (
                <Color key={color.id} color={color} />
            ))}
            <LogoutButton />
        </div>
    );
};

export default Controls;
