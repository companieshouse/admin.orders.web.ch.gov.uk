export class SearchResultsTable {
    constructor(public tableRows: SearchResultsRow[]) {
    }

    getRow(index: number): SearchResultsRow {
        if (index > this.tableRows.length) {
            throw new Error("Index " + index + " exceeds table size");
        }
        return this.tableRows[index];
    }
}

export class SearchResultsRow {
    constructor(private row: Map<string, string>, public linkable: boolean) {
    }

    getValues(): string[] {
        const result = [];
        for (const rowValue of this.row.values()) {
            result.push(rowValue);
        }
        return result;
    }

    getData(heading: string): string {
        if (this.row.has(heading)) {
            throw new Error("Cell " + heading + " doesn't exist");
        }
        return this.row.get(heading) || "";
    }
}
