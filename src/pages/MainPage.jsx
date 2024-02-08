import React from 'react';
import CustomPaginationActionsTable from "../features/LinkStatisticsTable";
import LinkForm from "../features/LinkForm/LinkForm";
import {useSelector} from "react-redux";
import AuthButtons from "../shared/AuthButtons";

function MainPage(props) {
    const {isLoggedIn} = useSelector((state) => state.auth);

    return (
        <div>
            <AuthButtons/>
            <LinkForm/>
            {isLoggedIn && <CustomPaginationActionsTable/>}
        </div>
    );
}

export default MainPage;