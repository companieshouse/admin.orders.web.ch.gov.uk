export class OrderDataList {
    constructor(public dataRows: OrderDataRow[]) {
    }

    getNames(): string[] {
        return this.dataRows.map(entry => entry.name);
    }

    getValues(): string[] {
        return this.dataRows.map(entry => entry.value);
    }
}

export class OrderDataRow {
    constructor(public name: string, public value: string) {
    }
}
