import React from "react";
interface Props {
  avatar: string;
  notification_text: string;
  date: string;
  isRead: boolean;
}
const Notifications: React.FC<Props> = ({
  avatar,
  notification_text,
  date,
  isRead,
}) => {
  return (
    <div className="flex gap-3 items-center px-4 py-2">
      <img src={avatar} alt="Notification" className="rounded-full" />
      <div>
        <div
          className={`text-base font-medium ${
            isRead ? "text-slate-500" : "text-black"
          }`}
        >
          {notification_text}
        </div>
        <h5 className="text-[#909090] text-base">{date}</h5>
      </div>
    </div>
  );
};

export default Notifications;
