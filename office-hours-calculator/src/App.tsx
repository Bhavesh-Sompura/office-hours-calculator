import "./App.css";
import HomeTitle from "./landing/components/page";
import OfficeHoursCalculator from "./landing/page";

function App() {
  return (
    <div className="flex flex-col items-center justify-center bg-white min-h-screen w-full py-10">
      <header className="text-4xl font-bold text-white mb-10">
        Office Hours Calculator
      </header>
        <HomeTitle />
        <OfficeHoursCalculator />
    </div>
  );
}

export default App;
