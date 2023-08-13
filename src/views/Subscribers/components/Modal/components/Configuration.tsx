// Components
import ReusableInput from "../../../../../components/Input";
// Mantine Components
import { Select } from "@mantine/core"

const SubscriberConfig = () => {
return (
    <>
    <div className="flex">
    <ReusableInput
      label="Subscriber Key (K)"
      required
      className="w-[400px] mr-6"
    />
    <ReusableInput
      label="Authentication Management Field (AMF)"
      required
      className="w-[300px]"
    />
  </div>
  <div className="flex  mt-3">
    <ReusableInput
      label="USIM Type"
      required
      className="w-[300px] mr-6"
    />
    <ReusableInput
      label="Operator Key (OPc/OP)"
      required
      className="w-[500px]"
    />
  </div>
  <div className="flex mt-3">
    <ReusableInput
    label="UE-AMBR Downlink"
    placeholder="1"
    required
    className="w-[250px]"
    />
    <Select
    label="Unit"
    placeholder="Gbps"
    data={[
      {value: 'bps', label:'bps'},
      {value:'kbps', label: 'Kbps'},
      {value: 'mbps', label: 'Mbps'},
      {value: 'gbps', label: 'Gbps'},
      {value: 'tbps', label: 'Tbps'},
    ]} 
    className="ml-3 w-[100px]"
    clearable
    />
    <ReusableInput
    label="UE-AMBR Uplink"
    placeholder="1"
    required
    className="w-[250px] ml-2"
    />
     <Select
    label="Unit"
    placeholder="Gbps"
    data={[
      {value: 'bps', label:'bps'},
      {value:'kbps', label: 'Kbps'},
      {value: 'mbps', label: 'Mbps'},
      {value: 'gbps', label: 'Gbps'},
      {value: 'tbps', label: 'Tbps'},
    ]} 
    className="ml-3 w-[100px]"
    clearable
    />
  </div>
  </>
)
}
export default SubscriberConfig;