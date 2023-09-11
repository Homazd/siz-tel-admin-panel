import { ModalsProvider } from "@mantine/modals";
import IMSIInput from "./components/Modal/components/edit";
import SubscriberModal from "./components/Modal/index";

function Subscribers() {
  return (
    <>
      <ModalsProvider>
        <div className="grid place-content-center">
          <span className="text-white">PSearch</span>
          <IMSIInput />
        </div>
        <SubscriberModal />
      </ModalsProvider>
    </>
  );
}

export default Subscribers;
