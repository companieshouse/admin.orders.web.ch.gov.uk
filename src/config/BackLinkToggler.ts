export class BackLinkToggler {
    constructor (private _searchPageBackLinkEnabled: boolean, private _orderPageBackLinkEnabled: boolean) {
    }

    get searchPageBackLinkEnabled (): boolean {
        return this._searchPageBackLinkEnabled;
    }

    set searchPageBackLinkEnabled (value: boolean) {
        this._searchPageBackLinkEnabled = value;
    }

    get orderPageBackLinkEnabled (): boolean {
        return this._orderPageBackLinkEnabled;
    }

    set orderPageBackLinkEnabled (value: boolean) {
        this._orderPageBackLinkEnabled = value;
    } 
}

export const BACK_LINK_TOGGLER = new BackLinkToggler(false, true);
