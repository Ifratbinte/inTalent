"use client";

import Notifications from "#components/common/list/notification";
import { useNotification } from "#stores/contexts/notification-context.provider";
import { changePageCtx } from "#stores/pages/pageCtxSlice";
import moment from "moment";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
// import moment from "moment";

const Notification = () => {
  const { data } = useNotification();

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(
      changePageCtx({
        title: "Notifications",
        isBackActive: false,
        isFavoriteBtnActive: false,
        isActiveShare: false,
        isSearchActive: false,
        isCreateButtonActive: false,
      })
    );
  }, []);

  return (
    <>
      {/* <Header avatar="/images/avatar/avatar-2.png" title="Notification" /> */}
      <div className="h-full overflow-x-auto py-5">
        {data.length > 0 ? (
          data.map((notification, i: number) => {
            return (
              <Notifications
                key={i}
                avatar={notification.avatar || "https://placehold.co/40"}
                notification_text={`${notification.id}: ${notification.title}`}
                date={moment(notification.created_at ?? new Date()).format(
                  "MMM DD"
                )}
                isRead={notification.read}
              />
            );
          })
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <h3>No notification...</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
