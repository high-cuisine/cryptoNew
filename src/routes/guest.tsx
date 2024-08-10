import {PermittedComponent} from "~helpers/PermittedComponent";
import {Route, Routes} from "react-router-dom";
import React from "react";
import {GamePage} from "~pages/GamePage";
import {MainLayout} from "~components/MainLayout";
import {Leaders} from "~pages/Leaders";
import {Tasks} from "~pages/Tasks";
import {Invites} from "~pages/Invites";
import {NewGamePage} from "~pages/NewGamePage";
import {KeepAlive, Provider} from "react-keep-alive";

export default () => (
    <PermittedComponent allowedGroups={[null]}>
        <Provider>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route index element={<KeepAlive name="game-page"><GamePage/></KeepAlive>}/>
                    <Route path="game" element={<KeepAlive name="new-game-page"><NewGamePage/></KeepAlive>}/>
                    <Route path="leaders" element={<Leaders/>}/>
                    <Route path="tasks" element={<Tasks/>}/>
                    <Route path="invites" element={<Invites/>}/>
                </Route>
            </Routes>
        </Provider>
    </PermittedComponent>
)
