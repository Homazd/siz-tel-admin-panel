import { Select, Button } from "@mantine/core";
import ReusableInput from "@/components/Input";

const FlowContent = () => {
    // const [flowVisible, setFlowVisible] = useState(false);
  
  
    // const handleOnDeleteFlow = () => {
    //   setFlowVisible(false);
    // };
    return (
      <div className="grid grid-cols-2 mt-3">
        <div className="col-span-1">
          <Select
            className="w-[250px]"
            label="Flow Direction"
            defaultValue={""}
            required
            placeholder="Downlink"
            data={[
              { value: "Downlink", label: "Downlink" },
              { value: "Uplink", label: "Uplink" },
            ]}
          />
          <ReusableInput
            label="Descreption"
            required
            placeholder="permit out udp from any 1-65535 to 45.45.45.45"
            className="w-[350px] mt-6"
          />
          <p>Hint: 5.4.2 Flow-Description in TS29.212</p>
        </div>
        <div className="col-span-1 mt-3">
          {/* <Button
            className="bg-red-500 text-white font-bold w-10"
            onClick={handleOnDeleteFlow}
          >
            ×
          </Button> */}
          <Button className="bg-red-500 text-white font-bold w-16 ml-6">×</Button>
         
          P
        </div>
      </div>
    );
  };

  export default FlowContent;