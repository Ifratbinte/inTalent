import Title from "#components/common/title";
import generateImageUrl from "#helpers/generate-image-url";
import { UserTypeInterface } from "#interfaces/index";
import React from "react";

interface Props {
  userType: UserTypeInterface[] | undefined;
  handleTypeChange: (type: UserTypeInterface) => void;
}

const UserPage: React.FC<Props> = ({ userType, handleTypeChange }) => {
  return (
    <div className="px-3 py-12">
      <div className="flex justify-center items-center section-gap-b">
        <img
          src="/images/logo/logo-dark.png"
          alt=""
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div>
        <Title title="Select account type" />
        {userType?.length
          ? userType.map((u) => (
              <div
                className="mb-5 relative flex justify-center cursor-pointer"
                onClick={() => handleTypeChange(u)}
              >
                <img src={u?.banner} alt={u.title} />
                <span className="absolute z-10 top-14 text-white text-2xl">
                  {u?.title}
                </span>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default UserPage;
