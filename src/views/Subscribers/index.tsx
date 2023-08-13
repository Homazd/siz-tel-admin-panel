import IMSIInput from "./components/IMSIInput";
import SubscriberModal from "./components/Modal";

function Subscribers() {
  return (
    <>
      <div className="grid place-content-center">
        <span className="text-white">PSearch</span>
        <IMSIInput />
      </div>
      <SubscriberModal />
    </>
  );
}

export default Subscribers;
