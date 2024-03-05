import { IconButton, Tooltip } from "@mui/material";
// import { useGetUserQuery, useUpdateUserMutation } from "@store/services/userService";
import axios from "axios";
import Image from "next/image";
import React, { Fragment } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import ImageUploadCSS from "./ImageUpload.module.css";

interface Provider {
  checkPrimaryState: boolean;
  checkAfterUpload: boolean;
}

interface Props {
  setSelectedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  avatar: string;
}

const ImageUpload: React.FC<Props> = ({ setSelectedFile, avatar }) => {
  const [image, setImage] = React.useState<ImageListType>([]);

  const maxNumber = 69;
  const onChange = (imageList: ImageListType) => {
    setImage(imageList);
    setSelectedFile(imageList[0].file);
  };

  const [primary, setPrimary] = React.useState<Provider>({
    checkPrimaryState: false,
    checkAfterUpload: false,
  });

  function onImgHandler() {
    setPrimary((prevState) => {
      return {
        ...prevState,
        checkPrimaryState: !prevState.checkPrimaryState,
      };
    });
  }
  function onClickHandle() {
    setPrimary((prevState) => {
      return {
        ...prevState,
        checkAfterUpload: true,
      };
    });
  }
  //   const onUploadFile = async () => {
  //     const formData = new FormData();

  //     selectedFile &&
  //       formData.append("files", selectedFile, (selectedFile as any)?.name ?? "");

  //     const uploadFile_Res = await axios.post(
  //       `${getStrapiURL()}/api/upload`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${cookies?.jwt}`,
  //         },
  //       }
  //     );
  //     if (uploadFile_Res.data) {
  //       setSelectedFile(null);
  //     }
  //     return uploadFile_Res?.data[0]?.id || null;
  //   };

  //   async function onUploadHandle(event) {
  //     event.preventDefault();
  //     const fileId = await onUploadFile();
  //     if (fileId) {
  //       userUpdate({
  //         id: data.id,
  //         data: {
  //           avatar: fileId,
  //         },
  //       });
  //     }
  //   }

  const onUploadHandle = () => {
    console.log("file upload");
  };
  return (
    <Fragment>
      {primary.checkPrimaryState || primary.checkAfterUpload ? (
        <div
          className={ImageUploadCSS.App}
          onMouseOut={onImgHandler}
          onClick={onClickHandle}
        >
          <ImageUploading
            value={image}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
              // write your building UI
              <div className="text-center">
                {image.length < 1 ? (
                  <div
                    className={`${ImageUploadCSS.img} flex justify-center items-center w-full h-full cursor-pointer`}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Change Photo
                  </div>
                ) : (
                  ""
                )}

                {imageList.map((image, index) => (
                  <div key={index} className={ImageUploadCSS.image_item}>
                    <div className={ImageUploadCSS.content_img}>
                      <Image
                        className={ImageUploadCSS.imgAfterUpload}
                        src={image.data_url}
                        alt=""
                        width={100}
                        height={100}
                      />
                      <div
                        className={ImageUploadCSS.update}
                        onClick={() => onImageUpdate(index)}
                      >
                        <p>Change Image</p>
                      </div>
                    </div>
                  </div>
                ))}
                {primary.checkAfterUpload && (
                  <div className="" onClick={onUploadHandle}>
                    <Tooltip title="Upload Image">
                      <IconButton aria-label="upload" color="info">
                        <img
                          src="/images/logo/logo-dark.png"
                          alt=""
                          className="max-w-full max-h-full object-contain"
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
              </div>
            )}
          </ImageUploading>
        </div>
      ) : (
        <img
          src={
            avatar
              ? avatar
              : "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png"
          }
          className={ImageUploadCSS.imgDefault}
          alt=""
          onMouseEnter={onImgHandler}
          onMouseOut={onImgHandler}
        />
      )}
    </Fragment>
  );
};

export default ImageUpload;
