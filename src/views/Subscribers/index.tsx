import { ModalsProvider } from "@mantine/modals";
import IMSIInput from "./components/Modal/components/edit";
import AddSubscriber from "./components/Modal/add";

function Subscribers() {
  return (
    <>
      <ModalsProvider>
        <div className="grid place-content-center">
          <span className="text-white">PSearch</span>
          <IMSIInput />
        </div>
        <AddSubscriber />
      </ModalsProvider>
    </>
  );
}

export default Subscribers;
