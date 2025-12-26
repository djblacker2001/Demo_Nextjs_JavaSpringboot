import React from "react";

interface UserInfoProps {
    username: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ username }) => {
    return (
        <div className="user-info">
            Tài khoản: <b>{username}</b>
        </div>
    );
};

export default UserInfo;
