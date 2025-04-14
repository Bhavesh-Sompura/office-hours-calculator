import "./App.css";
import HomeTitle from "./landing/components/page";
import OfficeHoursCalculator from "./landing/page";

function App() {
  return (
    <div className="flex flex-col items-center justify-center bg-pink-300 w-full md:h-screen py-10">
      <HomeTitle />
      <OfficeHoursCalculator />
    </div>
  );
}

export default App;
