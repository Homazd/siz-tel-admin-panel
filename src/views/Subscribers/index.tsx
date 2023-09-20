import { ModalsProvider } from "@mantine/modals";
import IMSIInput from "./components/Modal/components/edit";
import AddSubscriber from "./components/Modal/add";

function Subscribers() {
  return (
    <>
      <ModalsProvider>
        <div className="grid place-content-center">
          <span className="text-[18px] font-bold">Search</span>
          <IMSIInput />
        </div>
        <AddSubscriber />
      </ModalsProvider>
    </>
  );
}

export default Subscribers;
