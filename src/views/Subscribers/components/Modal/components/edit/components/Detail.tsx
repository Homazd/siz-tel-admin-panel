import { DataType } from "@/redux/Types/subscriberTypes";
interface inputDetail {
  searchedSubscriber: DataType;
}

const Detail: React.FC<inputDetail> = ({ searchedSubscriber }) => {
  const sessionType = () => {
    const sessionItem = searchedSubscriber.ambr.downlink.unit;
    switch (sessionItem) {
      case 1:
        return "IPv4";
      case 2:
        return "IPv6";
      case 3:
        return "IPv4v6";
      default:
        break;
    }
  };

  const capabilityApr = () => {
    const aprCapability =
      searchedSubscriber.slice[0].session[0].qos.arp.pre_emption_capability;
    switch (aprCapability) {
      case 1:
        return "Disabled";
      case 2:
        return "Enabled";

      default:
        break;
    }
  };

  const vulnerabilitySST = () => {
    const vulnerability =
      searchedSubscriber.slice[0].session[0].qos.arp.pre_emption_vulnerability;
    switch (vulnerability) {
      case 1:
        return "Disabled";
      case 2:
        return "Enabled";

      default:
        break;
    }
  };

  return (
    <>
      <div className="h-[50px] bg-gray-100 text-[20px] pt-2">
        <span className="p-6">IMSI: {searchedSubscriber.imsi}</span>
      </div>{" "}
      <div className="mt-6 pl-3">
        <h3 className="font-bold mb-3 text-[18px]">Subscriber Configuration</h3>
        <div className="grid grid-cols-2 gap-[200px]">
          <div className="col-span-1 text-[16px]">
            <p>
              {searchedSubscriber.imeisv}{" "}
              <span className="text-gray-400 text-[14px]">...IMEISV</span>
            </p>
            <p>
              {searchedSubscriber.security.k}
              <span className="text-gray-400 text-[14px]">...K</span>
            </p>
            <p>
              {searchedSubscriber.security.op ? searchedSubscriber.security.op : searchedSubscriber.security.opc}
              <span className="text-gray-400 text-[14px]">...OPc</span>
            </p>
            <p>
              {searchedSubscriber.security.amf}
              <span className="text-gray-400 text-[14px]">...AMF</span>
            </p>
            {/* <p>
              {searchedSubscriber.security.sqn}
              <span className="text-gray-400 text-[14px]">...SQN</span>
            </p> */}
          </div>
          <div className="col-span-1">
            <p>
              {searchedSubscriber.ambr.downlink.value} Gbps
              <span className="text-gray-300 text-sm">...DL</span>
            </p>
            <span>{searchedSubscriber.ambr.uplink.value} Gbps</span>
            <span className="text-gray-300 text-sm">...UL</span>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-bold mb-3">SST:1 (Default S-NSSAI)</h3>

          <div className="grid grid-cols-8">
            <div className="col-span-1 text-gray-400 text-sm">DNN/APN</div>
            <div className="col-span-1 text-gray-400 text-sm">Type</div>
            <div className="col-span-1 text-gray-400 text-sm">5QI/QCI</div>
            <div className="col-span-1 text-gray-400 text-sm">ARP</div>
            <div className="col-span-1 text-gray-400 text-sm">Capability</div>
            <div className="col-span-1 text-gray-400 text-sm">
              Vulnerability
            </div>
            <div className="col-span-1 text-gray-400 text-sm">MBR DL/UL</div>
            <div className="col-span-1 text-gray-400 text-sm">GBR DL/UL</div>
          </div>
          <div className="grid grid-cols-8 mt-3">
            <div className="col-span-1 text-sm">
              {searchedSubscriber.slice[0].session[0].name}
            </div>
            <div className="col-span-1 text-sm">{sessionType()}</div>
            <div className="col-span-1 text-sm">
              {searchedSubscriber.slice[0].session[0].qos.index}
            </div>
            <div className="col-span-1 text-sm">
              {searchedSubscriber.slice[0].session[0].qos.arp.priority_level}
            </div>
            <div className="col-span-1 text-sm">{capabilityApr()}</div>
            <div className="col-span-1 text-sm">{vulnerabilitySST()}</div>
            <div className="col-span-1 text-sm">{}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
