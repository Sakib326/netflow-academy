import moment from "moment";
import { fetchData } from "@/utils/fetchData";
import { User } from "@/types/user";

const MyProfile = async () => {
  const user = await fetchData<User>("/auth/me");

  return (
    <>
      <h4 className="tw:py-4">My Profile</h4>
      <table className="tw:w-full tw:border-collapse tw:overflow-x-scroll">
        <tbody>
          <tr className="">
            <td className="tw:py-2 tw:font-semibold">User ID</td>
            <td className="tw:py-2">{user?.id}</td>
          </tr>
          <tr className="">
            <td className="tw:py-2 tw:font-semibold">Registration Date</td>
            <td className="tw:py-2">
              {moment(user?.created_at).format("MMMM D, YYYY h:mm A")}
            </td>
          </tr>
          <tr className="">
            <td className="tw:py-2 tw:font-semibold">Full Name</td>
            <td className="tw:py-2">{user?.name}</td>
          </tr>
          <tr className="">
            <td className="tw:py-2 tw:font-semibold">Email</td>
            <td className="tw:py-2">{user?.email}</td>
          </tr>
          <tr className="">
            <td className="tw:py-2 tw:font-semibold">Phone Number</td>
            <td className="tw:py-2">{user?.phone}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MyProfile;
