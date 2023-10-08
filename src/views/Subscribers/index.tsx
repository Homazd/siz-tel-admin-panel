import { useState } from "react";
import { ModalsProvider } from "@mantine/modals";
import IMSIInput from "./components/Modal/components/edit";
import AddSubscriber from "./components/Modal/add";
import "animate.css";

function Subscribers() {
  // const [addedSub, setAddedSub] = useState(null);
  // const handleAddedSubChange = (newAddedSub : any) => {
  //   setAddedSub(newAddedSub);
  //   console.log("addedSub", addedSub);
  // }
  const [addedImsi, setAddedImsi] = useState('');
  const handleSetImsi = (imsi : string) => {
    setAddedImsi(imsi);
    console.log("added imsi is:", addedImsi)
  }
  return (
    <>
      <ModalsProvider>
        <div className="grid place-content-center animate__animated animate__backInUp mt-10">
          <span className="text-[24px] font-bold text-blue-600">
            Search IMSI
          </span>
          <IMSIInput addedImsi={addedImsi} />
        </div>
        <AddSubscriber addedImsi={addedImsi} handleSetImsi={handleSetImsi} />
      </ModalsProvider>
    </>
  );
}

export default Subscribers;
