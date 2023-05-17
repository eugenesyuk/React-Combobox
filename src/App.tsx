import "./App.scss";
import { Combobox } from "./components/Combobox";

const fruits = [
  {
    text: "🍎 Apple",
    value: "Apple"
  },
  {
    text: "🍌 Banana",
    value: "Banana"
  },
  {
    text: "🫐 Blueberry",
    value: "Blueberry"
  },
  {
    text: "🥭 Mango",
    value: "Mango"
  }
];

function App() {
  return (
    <div className='App'>
      <Combobox placeholder='Choose a fruit:' data={fruits} />
    </div>
  );
}

export default App;
