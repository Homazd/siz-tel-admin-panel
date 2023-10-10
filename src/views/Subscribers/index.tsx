import { ModalsProvider } from "@mantine/modals";
import IMSIInput from "./components/Modal/components/edit";
import AddSubscriber from "./components/Modal/add";
import "animate.css";
import { useState } from "react";
import { ChangeEvent } from "react";

function Subscribers() {
  const [isTyping, setIsTyping] = useState(false);
  const [addedImsi, setAddedImsi] = useState("");
  const handleNewSubscriber = (addedImsi: string) => {
    console.log("addedImsi is", addedImsi);
    setAddedImsi(addedImsi);
  };
  const handleImsiChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true)
    setAddedImsi(event.target.value)
  };
  return (
    <>
      <ModalsProvider>
        <div className="grid place-content-center animate__animated animate__backInUp mt-10">
          <span className="text-[24px] font-bold text-blue-600">
            Search IMSI
          </span>
          <IMSIInput addedImsi={addedImsi}  handleImsiChange={handleImsiChange} isTyping={isTyping} setIsTyping={setIsTyping} />
        </div>
        <AddSubscriber onNewSub={handleNewSubscriber} />
      </ModalsProvider>
    </>
  );
}

export default Subscribers;
