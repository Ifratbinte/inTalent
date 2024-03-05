// "use client";
// import Loader from "#components/common/Loader";
// import { useChatCtx } from "#stores/contexts/chat-context.provider";
// import { changePageCtx } from "#stores/pages/pageCtxSlice";
// import { RootState } from "#stores/store";
// import React, { useLayoutEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Avatar } from "@mui/material";
// import { IoDocumentTextOutline } from "react-icons/io5";
// import { MdAttachFile } from "react-icons/md";
// import { BsSend } from "react-icons/bs";
// import { Button } from "#components/common/button";
// import BaseModal from "#components/common/modal/BaseModal";

// const Conversation = ({ params }: { params: { id: string } }) => {
//   // Redux state
//   const user = useSelector((state: RootState) => state.user);
//   const dispatch = useDispatch();
//   const chatCtx = useChatCtx();
//   const [modal, setModal] = useState<null | "INVITATION_click">(null);

//   // Memoized chat data
//   const chat = useMemo(() => {
//     return chatCtx.chats.find((i) => i.id == params.id);
//   }, [chatCtx.chats, user.data]);

//   // Memoized chat with user data
//   const chatWith = useMemo(() => {
//     if (chat?.agent_id == user.data?.id) {
//       return {
//         id: chat?.talent_id,
//         type: "Talent",
//         name: `${chat?.talent.user.first_name} ${
//           chat?.talent.user.last_name ?? ""
//         }`,
//       };
//     } else {
//       return {
//         id: chat?.agent_id,
//         type: "Agent",
//         name: `${chat?.agent.user.first_name} ${
//           chat?.agent.user.last_name ?? ""
//         }`,
//       };
//     }
//   }, [chat, user.data]);

//   useLayoutEffect(() => {
//     if (chatWith.name) {
//       dispatch(
//         changePageCtx({
//           title: chatWith.name,
//           isBackActive: true,
//           isActiveShare: false,
//           isSearchActive: false,
//           isFavoriteBtnActive: false,
//           isCreateButtonActive: false,
//         })
//       );
//     }
//   }, [chatWith]);

//   // State for new message input
//   const [newMessage, setNewMessage] = useState("");

//   // Function to handle sending messages
//   const handleSendMessage = () => {
//     console.log("Sending message:", newMessage);

//     setNewMessage("");
//   };
//   // Function to handle attaching files
//   const handleAttachFile = () => {
//     console.log("Attaching file...");
//   };
//   const handleClose = () => {
//     setModal(null);
//   };
//   if (!chat?.Message?.length) {
//     return <Loader />;
//   }

//   return (
//     <>
//       <BaseModal open={modal === "INVITATION_click"} handleClose={handleClose}>
//         {
//           <>
//             <div className="flex flex-col items-center justify-center gap-2 my-5">
//               <IoDocumentTextOutline size={70} color="gray" className="mb-5" />
//               <h4 id="parent-modal-title" className="text-center ">
//                 You received a new proposal from Hatch Co.
//               </h4>
//             </div>
//             <div>
//               <h5 className="  text-base text-slate-600">Event</h5>
//               <h5>Dubai Fashion week</h5>
//             </div>
//             <div className="flex gap-2 py-1 mt-5">
//               <div className="w-1/2">
//                 <h5 className="  text-base text-slate-600">Hourly rate</h5>
//                 <h4>$25.00 usd</h4>
//               </div>
//               <div className="w-1/2">
//                 <h5 className="  text-base text-slate-600">Total hour</h5>
//                 <h4>10</h4>
//               </div>
//             </div>
//             <div>
//               <h5 className=" mt-3 text-base text-slate-600">
//                 Additional notes
//               </h5>
//               <p className="  text-sm" id="parent-modal-description">
//                 Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 Aspernatur, quaerat ad! Harum repellat a eaque enim, temporibus
//                 quod amet modi quia est laboriosam consequatur nemo in eos
//                 tempora esse? Laboriosam.
//               </p>
//             </div>

//             <Button label="Accept Contract" variant="secondary" type="submit" />
//             <Button
//               label=" reject proposal"
//               variant="outline-secondary"
//               type="button"
//             />
//           </>
//         }
//       </BaseModal>
//       <div className="flex flex-col w-full mx-auto py-3 space-y-3">
//         {/* Render messages */}
//         {chat.Message.map((message) => (
//           <div
//             key={message.id}
//             className={`flex p-2 ${
//               message.user_id === chatWith.id ? "justify-end" : "justify-start"
//             }`}>
//             <div className="flex flex-col items-start max-w-[70%]">
//               {/* Display avatar only for the first message of the conversation */}
//               {/* {message.isFirst && ( */}
//               <div className="flex items-center">
//                 <Avatar
//                   className={`w-16 h-16 rounded-full mb-3 ${
//                     message.user_id === chatWith.id ? " ml-4 " : " "
//                   }`}
//                 />
//                 <div className="ml-2 mb-3">
//                   <p className="font-semibold text-black">{chatWith.name}</p>
//                   <p className="text-xs text-gray-500">10:00pm</p>
//                 </div>
//               </div>

//               <div
//                 className={`p-2 rounded-lg  ${
//                   message.user_id === chatWith.id
//                     ? " bg-blue-100 text-black self-end"
//                     : " bg-gray-200 text-black self-start"
//                 }`}>
//                 {message.content}
//               </div>
//             </div>
//           </div>
//         ))}
//         <hr />

//         {/* Message input field and send button */}
//         <div className="px-3">
//           <textarea
//             placeholder="Write message..."
//             className="py-1 mb-12 w-full outline-none resize-none"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//           />

//           <hr className=" border-t border-dashed border-gray-300" />
//           <div className="flex justify-end px-5 py-3">
//             {/* Attach file icon */}
//             <div className="border rounded-md p-3 bg-gray-100 mr-5">
//               <MdAttachFile
//                 className="text-gray-500 cursor-pointer text-2xl"
//                 onClick={handleAttachFile}
//               />
//             </div>
//             {/* Send message icon */}
//             <div className="border rounded-md p-2 bg-gray-100">
//               <BsSend
//                 className="  text-gray-500 cursor-pointer text-2xl
//             "
//                 onClick={handleSendMessage}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Conversation;
