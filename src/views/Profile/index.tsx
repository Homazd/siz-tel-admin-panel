function Profile() {
  const username = localStorage.getItem("username");
  const apn = localStorage.getItem("apn");

  return (
    <div className="grid place-content-center">
      <div className=" grid grid-cols-2 gap-4 w-[400px]">
        <div className="text-blue-800 font-bold text-xl">Username</div>
        <div className="text-blue-800 font-bold text-xl">APN</div>
        <div className="font-semibold ml-2 text-amber-700 text-lg">{username}</div>
        <div className="font-semibold ml-2 text-amber-700 text-lg">{apn}</div>
      </div>
    </div>
  );
}
export default Profile;
