import useAxiosPublic from "../Hooks/useAxiosPublic";


const AddNotificationContent = (notificationData) => {
    const axiosPublic = useAxiosPublic();
    axiosPublic.post(`/notification/add`, notificationData)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("Error Inserting Notification:", err);
      return err;
    });

};

export default AddNotificationContent;