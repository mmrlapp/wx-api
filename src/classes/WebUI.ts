import type { ApplicationInterface } from "../types/ApplicationInterface";
import type { WXApp } from "../types/WXApp";
import type { Intent } from "./Intent";

/**
 * Represents the WebUI interface for interacting with native application functionalities.
 * This class bridges JavaScript calls to methods exposed by the native ApplicationInterface.
 */
export class WebUI {
  private _interface: ApplicationInterface | null = null;

  public constructor() {
    if (typeof window === "undefined" || !window["webui"]) {
      console.warn(
        "window['webui'] is not defined. WebUI functionality may be limited."
      );
    } else {
      this._interface = window["webui"];
    }
  }

  /**
   * Exits the native application.
   * Corresponds to `ApplicationInterface.exit()`.
   */
  public exit() {
    if (this._interface && typeof this._interface.exit === "function") {
      this._interface.exit();
    } else {
      console.error("exit method not available on the webui interface.");
    }
  }

  /**
   * Sets the refreshing state of the pull-to-refresh mechanism.
   * Requires pull-to-refresh and JavaScript refresh interceptor to be enabled natively.
   * Corresponds to `ApplicationInterface.setRefreshing(state)`.
   * @param {boolean} state True to show refreshing indicator, false to hide.
   */
  public setRefreshing(state: boolean) {
    if (
      this._interface &&
      typeof this._interface.setRefreshing === "function"
    ) {
      this._interface.setRefreshing(state);
    } else {
      console.error(
        "setRefreshing method not available on the webui interface."
      );
    }
  }

  /**
   * Gets information about the current root manager application.
   * Corresponds to `ApplicationInterface.currentRootManager` getter.
   * @returns {Object | null} An object with packageName, versionName, and versionCode, or null if unavailable.
   */
  public get currentRootManager(): WXApp | null {
    if (
      this._interface &&
      typeof this._interface.getCurrentRootManager !== "undefined"
    ) {
      return this._interface.getCurrentRootManager();
    } else {
      console.error(
        "currentRootManager getter not available on the webui interface."
      );
      return null;
    }
  }

  /**
   * Gets information about the current application.
   * Corresponds to `ApplicationInterface.currentApplication` getter.
   * @returns {Object | null} An object with packageName, versionName, and versionCode, or null if unavailable.
   */
  public get currentApplication(): WXApp | null {
    if (
      this._interface &&
      typeof this._interface.getCurrentApplication !== "undefined"
    ) {
      return this._interface.getCurrentApplication();
    } else {
      console.error(
        "currentApplication getter not available on the webui interface."
      );
      return null;
    }
  }

  /**
   * Gets information about a specific application by its package name.
   * Corresponds to `ApplicationInterface.getApplication(packageName)`.
   * @param {string} packageName The package name of the application.
   * @returns {Object | null} An object with packageName, versionName, and versionCode, or null if unavailable/error.
   */
  public getApplication(packageName: string): WXApp | null {
    if (
      this._interface &&
      typeof this._interface.getApplication === "function"
    ) {
      return this._interface.getApplication(packageName);
    } else {
      console.error(
        "getApplication method not available on the webui interface."
      );
      return null;
    }
  }

  /**
   * Opens a file chooser dialog using the provided intent data.
   * Corresponds to `ApplicationInterface.openFile(i: IntentData?)`.
   * @param {Intent} intent An Intent object (from the previously defined Intent class) containing file selection details.
   */
  public openFile(intent: Intent) {
    if (this._interface && typeof this._interface.openFile === "function") {
      this._interface.openFile(intent.getParsedIntent());
    } else {
      console.error("openFile method not available on the webui interface.");
    }
  }

  /**
   * Starts a new activity using the provided intent data.
   * Corresponds to `ApplicationInterface.startActivity(i: IntentData)`.
   * @param {Intent} intent An Intent object (from the previously defined Intent class) describing the activity to start.
   */
  public startActivity(intent: Intent) {
    if (
      this._interface &&
      typeof this._interface.startActivity === "function"
    ) {
      this._interface.startActivity(intent.getParsedIntent());
    } else {
      console.error(
        "startActivity method not available on the webui interface."
      );
    }
  }
}
