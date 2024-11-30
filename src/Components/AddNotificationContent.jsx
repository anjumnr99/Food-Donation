import useAxiosPublic from "../Hooks/useAxiosPublic";


const AddNotificationContent = (notificationData,refetch) => {
    const axiosPublic = useAxiosPublic();
    axiosPublic.post(`/notification/add`, notificationData)
    .then((res) => {
      console.log(res.data);
      refetch();
      return res.data;
    })
    .catch((err) => {
      console.error("Error Inserting Notification:", err);
      return err;
    });

};

export default AddNotificationContent;