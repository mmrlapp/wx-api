import type { IntentData } from "../types/IntentInterface";

export class Intent {
  private _action: string;
  private _interface: IntentData | null = null;
  /**
   * Initializes a new Intent object.
   * @param {string} action The action to be performed by this intent.
   */
  constructor(action: string) {
    this._action = action;
    if (
      typeof window === "undefined" ||
      !window["$intent"] ||
      typeof window["$intent"].create !== "function"
    ) {
      console.warn(
        "window['$intent'] or window['$intent'].create is not defined. Intent functionality may be limited."
      );
    } else {
      this._interface = window["$intent"].create(this._action);
    }
  }

  getParsedIntent() {
    return this._interface;
  }

  /**
   * Sets the data URI for the intent.
   * @param {string} data The data URI string.
   */
  setData(data: string) {
    if (this._interface && typeof this._interface.setData === "function") {
      this._interface.setData(data);
    } else {
      console.error("setData method not available on the intent interface.");
    }
  }

  /**
   * Sets the package name for the intent.
   * This method corresponds to `setPackage` in IntentData.
   * @param {string} packageName The package name to set.
   */
  setPackage(packageName: string) {
    if (this._interface && typeof this._interface.setPackage === "function") {
      this._interface.setPackage(packageName);
    } else {
      console.error("setPackage method not available on the intent interface.");
    }
  }

  /**
   * Adds a category to the intent.
   * This method corresponds to `addCategory` in IntentData.
   * @param {string} category The category to add.
   */
  addCategory(category: string) {
    if (this._interface && typeof this._interface.addCategory === "function") {
      this._interface.addCategory(category);
    } else {
      console.error(
        "addCategory method not available on the intent interface."
      );
    }
  }

  /**
   * Sets the MIME type for the intent.
   * This method corresponds to `setType` in IntentData.
   * @param {string} type The MIME type to set.
   */
  setType(type: string) {
    if (this._interface && typeof this._interface.setType === "function") {
      this._interface.setType(type);
    } else {
      console.error("setType method not available on the intent interface.");
    }
  }

  /**
   * Adds extended data to the intent.
   * This method corresponds to the `putExtra` overloads in IntentData.
   * @param {string} name The name of the extra data.
   * @param {(string|number|boolean)} value The value of the extra data.
   */
  putExtra(name: string, value: string | number | boolean) {
    if (this._interface && typeof this._interface.putExtra === "function") {
      // The native `putExtra` likely handles type conversion based on the value passed.
      this._interface.putExtra(name, value);
    } else {
      console.error("putExtra method not available on the intent interface.");
    }
  }

  /**
   * Retrieves string extra data from the intent.
   * This method corresponds to `getStringExtra` in IntentData.
   * @param {string} name The name of the extra data.
   * @returns {string | null} The string value, or null if not found.
   */
  getStringExtra(name: string): string | null {
    if (
      this._interface &&
      typeof this._interface.getStringExtra === "function"
    ) {
      return this._interface.getStringExtra(name);
    } else {
      console.error(
        "getStringExtra method not available on the intent interface."
      );
      return null;
    }
  }

  /**
   * Retrieves integer extra data from the intent.
   * This method corresponds to `getIntExtra` in IntentData.
   * @param {string} name The name of the extra data.
   * @returns {number} The integer value, or the default value if not found.
   */
  getIntExtra(name: string): number {
    if (this._interface && typeof this._interface.getIntExtra === "function") {
      return this._interface.getIntExtra(name);
    } else {
      console.error(
        "getIntExtra method not available on the intent interface."
      );
      return 0x0;
    }
  }

  /**
   * Retrieves boolean extra data from the intent.
   * This method corresponds to `getBooleanExtra` in IntentData.
   * @param {string} name The name of the extra data.
   * @returns {boolean} The boolean value, or the default value if not found.
   */
  getBooleanExtra(name: string): boolean {
    if (
      this._interface &&
      typeof this._interface.getBooleanExtra === "function"
    ) {
      return this._interface.getBooleanExtra(name);
    } else {
      console.error(
        "getBooleanExtra method not available on the intent interface."
      );
      return false;
    }
  }
}
