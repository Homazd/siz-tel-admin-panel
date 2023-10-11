// React
import { useState } from "react";
import { ChangeEvent } from "react";
import { ModalsProvider } from "@mantine/modals";
// Components
import IMSIInput from "./components/Modal/components/edit";
import AddSubscriber from "./components/Modal/add";
// Style
import "animate.css";

function Subscribers() {
  const [isTyping, setIsTyping] = useState(false);
  const [addedImsi, setAddedImsi] = useState("");
  const handleNewSubscriber = (addedImsi: string) => {
    setAddedImsi(addedImsi);
  };
  const handleImsiChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setAddedImsi(event.target.value);
  };
  return (
    <>
      <ModalsProvider>
        <div className="flex justify-center animate__animated animate__backInUp mt-10">
          <div>
            <span className="text-[24px] font-bold text-blue-600 pb-3">
              Search IMSI
            </span>
            <IMSIInput
              addedImsi={addedImsi}
              handleImsiChange={handleImsiChange}
              isTyping={isTyping}
              setIsTyping={setIsTyping}
            />
            <AddSubscriber onNewSub={handleNewSubscriber} />
          </div>
        </div>
      </ModalsProvider>
    </>
  );
}

export default Subscribers;
