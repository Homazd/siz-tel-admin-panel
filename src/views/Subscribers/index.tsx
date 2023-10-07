import { ModalsProvider } from "@mantine/modals";
import IMSIInput from "./components/Modal/components/edit";
import AddSubscriber from "./components/Modal/add";
import 'animate.css';


function Subscribers() {
  return (
    <>
      <ModalsProvider>
        <div className="grid place-content-center animate__animated animate__backInUp mt-10">
          <span className="text-[24px] font-bold text-blue-600">Search IMSI</span>
          <IMSIInput  />
        </div>
        <AddSubscriber />
      </ModalsProvider>
    </>
  );
}

export default Subscribers;
