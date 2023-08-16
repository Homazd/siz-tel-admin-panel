import { useGetSubscribersQuery } from "../../../services/subscribers";

const SubscribersComponent = () => {
  const {
    data: Subscribers,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubscribersQuery("12345");

  if (isLoading) return "Loading...";
  if (error) return `Error: ${error}`;

  return (
    <>
      {Subscribers.map((subscriber) => (
        <div key={subscriber.IMSI}>{subscriber.connected}</div>
      ))}
    </>
  );
};
