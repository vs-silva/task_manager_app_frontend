import {Route, Routes} from "react-router-dom";
import {RoutesPathsConstants} from "./routes-paths.constants";

import {HomePage} from "../pages/home-page";
import {AboutPage} from "../pages/about-page";

export function Router(): JSX.Element {
    return (<Routes data-testid="router">
        <Route path={RoutesPathsConstants.Home} element={<HomePage />}/>
        <Route path={RoutesPathsConstants.About} element={<AboutPage />}/>
    </Routes>);
}
