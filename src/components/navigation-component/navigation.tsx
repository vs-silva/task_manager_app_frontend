import {RoutesPathsConstants} from "../../router/routes-paths.constants";
import {Link} from "react-router-dom";

export function Navigation(): JSX.Element {

    return (
        <div className="container-fluid w-full flex flex-wrap items-center justify-between py-8" data-testid="navContainer">
            <nav className="flex justify-around py-4 bg-grey-light backdrop-blur-md shadow-md w-full
            fixed top-0 left-0 right-0 z-10" aria-label="breadcrumb" data-testid="nav">
                {
                    Object.entries(RoutesPathsConstants).map(([routeKey, routePath], index) => (
                        <Link className="text-gray-500 hover:text-gray-600 mr-4" to={routePath} key={index}>{routeKey}</Link>
                    ))
                }
            </nav>
        </div>);
}
