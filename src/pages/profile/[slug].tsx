import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import UserInfo from "../../components/profile/UserInfo";
import OtherInfo from "../../components/profile/OtherInfo";
import UserBlog from "../../components/profile/UserBlog";

const Profile = () => {
    const {slug} = useParams()
    const {auth} = useSelector((state: RootState) => state)


    return (
        <section className="userProfile" >
            {slug === auth.user?._id ? <UserInfo/> : <OtherInfo id={slug!}/>}
            <UserBlog />
        </section>
    );
};

export default Profile;