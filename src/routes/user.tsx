import {Navigate, Route, Routes} from "react-router-dom";
import {Dashboard} from "~pages/user/Dashboard";
import {PermittedComponent} from "~helpers/PermittedComponent";
import React from "react";

export default () => (
    <PermittedComponent allowedGroups={["user", "admin"]}>
        <Routes>
            <Route index element={<Dashboard/>}/>
            <Route path="sign-in" element={<Navigate to="/"/>}/>
            <Route path="users" element={
                <PermittedComponent requiredPermissions={["view_user"]} fallback={<Navigate to="/"/>}>
                    <h1>view user</h1>
                </PermittedComponent>
            }/>
        </Routes>
    </PermittedComponent>
)
