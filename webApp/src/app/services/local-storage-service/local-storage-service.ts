import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  public getValue(id: string): number | BigInt | string | Date | boolean | Object | null | undefined {
    return this.convertFromString(localStorage.getItem(id));
  }

  public storeValue(id: string, value: number | BigInt | string | Date | boolean | Object | null | undefined): void {
      localStorage.setItem(id, this.convertToString(value));
  }

  public removeValue(id: string): void{
    localStorage.removeItem(id);
  }

  private convertToString(value: number | BigInt | string | Date | boolean | Object | null | undefined): string {
    if (value === null) return "null";
    if (value === undefined) return "undefined";

    if (typeof value === "bigint") return `${value.toString()}n`;
    if (value instanceof Date) return value.toISOString();
    if (value instanceof Object) return JSON.stringify(value);

    return value.toString();
  }

  private convertFromString(value: string | null | undefined): number | BigInt | string | Date | boolean | Object | null | undefined {

    if (value === null || value === "null") return null;
    if (value === undefined || value === "undefined") return undefined;

    if (value === "true") return true;
    if (value === "false") return false;

    if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);

    if (/^-?\d+n$/.test(value)) return BigInt(value.slice(0, -1));

    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?$/.test(value)) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) return date;
    }

    if ((value.startsWith("{") && value.endsWith("}")) ||
      (value.startsWith("[") && value.endsWith("]"))) {
      try {
        return JSON.parse(value);
      } catch {
      }
    }

    return value;
  }

}
