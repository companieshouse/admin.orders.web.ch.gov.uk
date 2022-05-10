import {ViewModel} from "./ViewModel";
import {SearchPage} from "../search/SearchPage";
import {ServiceUnavailableComponent} from "./ServiceUnavailableComponent";
import {UnauthorisedComponent} from "./UnauthorisedComponent";
import {Service} from "typedi";
import "reflect-metadata";
import {ErrorPageBuildable} from "./ErrorPageBuildable";
import { NotFoundComponent } from "./NotFoundComponent";

@Service()
export class GlobalPageFactory implements ErrorPageBuildable {
    
    public static readonly ERROR_PAGE_TITLE = "Service unavailable";
    public static readonly UNAUTHORISED_TITLE = "Unauthorised";
    public static readonly NOT_FOUND_TITLE = "Page not found";

    public buildServiceUnavailable(): ViewModel {
        const page = new SearchPage(GlobalPageFactory.ERROR_PAGE_TITLE);
        page.add(new ServiceUnavailableComponent());
        return page.render();
    }

    public buildUnauthorised(): ViewModel {
        const page = new SearchPage(GlobalPageFactory.UNAUTHORISED_TITLE);
        page.add(new UnauthorisedComponent());
        return page.render();
    }

    public buildNotFound(): ViewModel {
        const page = new SearchPage(GlobalPageFactory.NOT_FOUND_TITLE)
        page.add(new NotFoundComponent());
        return page.render();
    }
}
