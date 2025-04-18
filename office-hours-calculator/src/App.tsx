import "./App.css";
import HomeTitle from "./landing/components/page";
import OfficeHoursCalculator from "./landing/page";

function App() {
  return (
    <div className="flex flex-col items-center justify-evenly bg-linear-to-r from-gray-700 via-rose-500 to-gray-700 md:h-screen w-full py-10">
      <HomeTitle />
      <OfficeHoursCalculator />
    </div>
  );
}

export default App;
