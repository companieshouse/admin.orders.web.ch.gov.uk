export class SearchResultsTable {
    constructor(private tableRows: SearchResultsRow[]) {
    }

    getRow(index: number): SearchResultsRow {
        if (index > this.tableRows.length) {
            throw new Error("Index " + index + " exceeds table size");
        }
        return this.tableRows[index];
    }
}

export class SearchResultsRow {
    constructor(private row: Map<string, string>) {
    }

    getData(heading: string): string {
        if (this.row.has(heading)) {
            throw new Error("Cell " + heading + " doesn't exist");
        }
        return this.row.get(heading) || "";
    }
}
