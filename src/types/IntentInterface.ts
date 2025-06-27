export interface IntentInterface {
  create(action: string): IntentData;
}

export interface IntentData {
  setPackage(packageName: string): void;
  setData(data: string): void;
  addCategory(category: string): void;
  setType(type: string): void;
  getStringExtra(name: string): string | null;
  getIntExtra(name: string, defaultValue?: number): number;
  getBooleanExtra(name: string, defaultValue?: boolean): boolean;
  putExtra(name: string, value: string | number | boolean): void;
}
