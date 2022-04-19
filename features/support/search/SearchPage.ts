import {SearchSteps} from "./SearchSteps";
import {expect} from "chai";
import {BrowserAgent} from "../core/BrowserAgent";
import "reflect-metadata";

export interface SearchPage {
    openSeachPage(): Promise<void>
    searchNoResultsExpected(): Promise<void>
    searchResultsExpected(): Promise<void>
    enterOrderId(): Promise<void>
    enterEmail(): Promise<void>
    enterCompanyNumber(): Promise<void>
    //clickSearch(): Promise<void>
    verify(): Promise<void>
}

export class NoPage implements SearchPage {
    public constructor(private searchSteps: SearchSteps, private interactor: BrowserAgent) {
    }

    public async openSeachPage(): Promise<void> {
       // await this.interactor.openPage("/orders-admin/hello"");
        this.searchSteps.currentPage = this.searchSteps.ordersSearchPageState;
    }

    public async searchNoResultsExpected(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async searchResultsExpected(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async enterOrderId(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async enterEmail(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async enterCompanyNumber(): Promise<void> {
        throw new Error("Invalid operation");
    }

    //clickSearch(): Promise<void>

   // public async verify(): Promise<void> {

   // }
}

export class OrdersSearchPage implements SearchPage {
    public constructor(private searchSteps: SearchPage, private interactor: BrowserAgent) {
    }

    public async openSeachPage(): Promise<void> {
        throw new Error("Invalid operation");
     }
 
     public async searchNoResultsExpected(): Promise<void> {
        throw new Error("Invalid operation");
     }
 
     public async searchResultsExpected(): Promise<void> {
        throw new Error("Invalid operation");
     }
 
     public async enterOrderId(): Promise<void> {
 
     }
 
     public async enterEmail(): Promise<void> {
 
     }
 
     public async enterCompanyNumber(): Promise<void> {
 
     }
 
     //clickSearch(): Promise<void>
 
     public async verify(): Promise<void> {

     }
}

export class NoSearchResultsPage implements SearchPage {
    public constructor(private searchSteps: SearchPage, private interactor: BrowserAgent) {
    }

    public async openSeachPage(): Promise<void> {
        // await this.interactor.openPage("/orders-admin/hello"");
         this.searchSteps.currentPage = this.searchSteps.noSearchResultsPageState;
     }
 
     public async searchNoResultsExpected(): Promise<void> {
 
     }
 
     public async searchResultsExpected(): Promise<void> {
        throw new Error("Invalid operation");
     }
 
     public async enterOrderId(): Promise<void> {
        throw new Error("Invalid operation");
     }
 
     public async enterEmail(): Promise<void> {
        throw new Error("Invalid operation");
     }
 
     public async enterCompanyNumber(): Promise<void> {
        throw new Error("Invalid operation");
     }
 
     //clickSearch(): Promise<void>
 
     public async verify(): Promise<void> {

     }
}

export class SearchResultsPage implements SearchPage {
    public constructor(private searchSteps: SearchPage, private interactor: BrowserAgent) {
    }

    public async openSeachPage(): Promise<void> {
        // await this.interactor.openPage("/orders-admin/hello"");
         this.searchSteps.currentPage = this.searchSteps.searchResultsPageState;
     }
 
     public async searchNoResultsExpected(): Promise<void> {
        throw new Error("Invalid operation");
     }
 
     public async searchResultsExpected(): Promise<void> {
 
     }
 
     public async enterOrderId(): Promise<void> {
        throw new Error("Invalid operation");
     }
 
     public async enterEmail(): Promise<void> {
        throw new Error("Invalid operation");
     }
 
     public async enterCompanyNumber(): Promise<void> {
        throw new Error("Invalid operation");
     }
 
     //clickSearch(): Promise<void>
 
     public async verify(): Promise<void> {

        
     }
}

