// Mantine Components
import { Divider, Button } from "antd";

const PccRules = () => {
  return (
    <div className="mt-10">
      <h3>PCC Rules</h3>
      <Divider />
      <p className="text-center">
        <Button className="bg-sky-500 text-white font-semibold w-28">+</Button>
      </p>
      <p className="text-center ml-[300px]">
        <Button className="bg-sky-500 text-white font-semibold w-28">+</Button>
      </p>
      <p className="text-center ml-[600px]">
        <Button className="bg-sky-500 text-white font-semibold w-28">+</Button>
      </p>
    </div>
  );
};

export default PccRules;