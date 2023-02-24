import {Router} from "../router";
import {Navigation} from "../components/navigation-component/navigation";
import {Loader} from "../components/loader-component/loader";

export default function App(): JSX.Element {
    return(<div className="container mx-auto" data-testid="app">
        <Loader />
        <Navigation />
        <Router />
    </div>);
}
