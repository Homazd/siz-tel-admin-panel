import InputButton from "./components/inputButton";
import InputWithButton from "./components/SearchInput";

function Subscribers() {
  return (
    <>
      <div className="grid place-content-center">
        <span className="text-white">Search</span>
        <InputWithButton />
      </div>
      <InputButton />
    </>
  );
}

export default Subscribers;
