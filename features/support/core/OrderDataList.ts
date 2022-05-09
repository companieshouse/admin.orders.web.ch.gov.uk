export class OrderDataList {
    constructor(public dataRows: OrderDataRow[]) {
    }

    getRow(index: number): OrderDataRow {
        if (index > this.dataRows.length) {
            throw new Error("Index " + index + " exceeds list size");
        }
        return this.dataRows[index];
    }
}

export class OrderDataRow {
    constructor(private row: Map<string, string>) {
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
