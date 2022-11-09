import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import UserInfo from "../../components/profile/UserInfo";
import OtherInfo from "../../components/profile/OtherInfo";

const Profile = () => {
    const {slug} = useParams()
    const {auth} = useSelector((state: RootState) => state)


    return (
        <section className='userProfile'>
            {slug === auth.user?._id ? <UserInfo/> : <OtherInfo/>}
            <h2>Profile</h2>
        </section>
    );
};

export default Profile;