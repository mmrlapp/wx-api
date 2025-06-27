import type { IntentData } from "../types/IntentInterface";

export class Intent {
  private _action: string;
  private _interface: IntentData | null = null;
  
  /**
   * Initializes a new Intent object.
   * @param {string} action The action to be performed by this intent.
   */
  public constructor(action: string) {
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

  public getParsedIntent() {
    return this._interface;
  }

  /**
   * Sets the data URI for the intent.
   * @param {string} data The data URI string.
   */
  public setData(data: string) {
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
  public setPackage(packageName: string) {
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
  public addCategory(category: string) {
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
  public setType(type: string) {
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
  public putExtra(name: string, value: string | number | boolean) {
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
  public getStringExtra(name: string): string | null {
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
  public getIntExtra(name: string): number {
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
  public getBooleanExtra(name: string): boolean {
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

  public static readonly ACTION_MAIN = "android.intent.action.MAIN";
  public static readonly ACTION_VIEW = "android.intent.action.VIEW";
  public static readonly ACTION_ATTACH_DATA = "android.intent.action.ATTACH_DATA";
  public static readonly ACTION_EDIT = "android.intent.action.EDIT";
  public static readonly ACTION_PICK = "android.intent.action.PICK";
  public static readonly ACTION_CHOOSER = "android.intent.action.CHOOSER";
  public static readonly ACTION_GET_CONTENT = "android.intent.action.GET_CONTENT";
  public static readonly ACTION_DIAL = "android.intent.action.DIAL";
  public static readonly ACTION_CALL = "android.intent.action.CALL"; 
  public static readonly ACTION_SEND = "android.intent.action.SEND";
  public static readonly ACTION_SENDTO = "android.intent.action.SENDTO";
  public static readonly ACTION_SEND_MULTIPLE = "android.intent.action.SEND_MULTIPLE";
  public static readonly ACTION_SYNC = "android.intent.action.SYNC";
  public static readonly ACTION_BATTERY_LOW = "android.intent.action.BATTERY_LOW";
  public static readonly ACTION_BATTERY_OKAY = "android.intent.action.BATTERY_OKAY";
  public static readonly ACTION_BOOT_COMPLETED = "android.intent.action.BOOT_COMPLETED";
  public static readonly ACTION_CAMERA_BUTTON = "android.intent.action.CAMERA_BUTTON";
  public static readonly ACTION_CLOSE_SYSTEM_DIALOGS = "android.intent.action.CLOSE_SYSTEM_DIALOGS";
  public static readonly ACTION_DEVICE_STORAGE_LOW = "android.intent.action.DEVICE_STORAGE_LOW";
  public static readonly ACTION_DEVICE_STORAGE_OK = "android.intent.action.DEVICE_STORAGE_OK";
  public static readonly ACTION_EXTERNAL_APPLICATIONS_AVAILABLE = "android.intent.action.EXTERNAL_APPLICATIONS_AVAILABLE";
  public static readonly ACTION_EXTERNAL_APPLICATIONS_UNAVAILABLE = "android.intent.action.EXTERNAL_APPLICATIONS_UNAVAILABLE";
  public static readonly ACTION_LOCALE_CHANGED = "android.intent.action.LOCALE_CHANGED";
  public static readonly ACTION_MEDIA_BAD_REMOVAL = "android.intent.action.MEDIA_BAD_REMOVAL";
  public static readonly ACTION_MEDIA_BUTTON = "android.intent.action.MEDIA_BUTTON";
  public static readonly ACTION_MEDIA_CHECKING = "android.intent.action.MEDIA_CHECKING";
  public static readonly ACTION_MEDIA_EJECT = "android.intent.action.MEDIA_EJECT";
  public static readonly ACTION_MEDIA_MOUNTED = "android.intent.action.MEDIA_MOUNTED";
  public static readonly ACTION_MEDIA_NOFS = "android.intent.action.MEDIA_NOFS";
  public static readonly ACTION_MEDIA_REMOVED = "android.intent.action.MEDIA_REMOVED";
  public static readonly ACTION_MEDIA_SCANNER_FINISHED = "android.intent.action.MEDIA_SCANNER_FINISHED";
  public static readonly ACTION_MEDIA_SCANNER_SCAN_FILE = "android.intent.action.MEDIA_SCANNER_SCAN_FILE";
  public static readonly ACTION_MEDIA_SCANNER_STARTED = "android.intent.action.MEDIA_SCANNER_STARTED";
  public static readonly ACTION_MEDIA_SHARED = "android.intent.action.MEDIA_SHARED";
  public static readonly ACTION_MEDIA_UNMOUNTABLE = "android.intent.action.MEDIA_UNMOUNTABLE";
  public static readonly ACTION_MEDIA_UNMOUNTED = "android.intent.action.MEDIA_UNMOUNTED";
  public static readonly ACTION_NEW_OUTGOING_CALL = "android.intent.action.NEW_OUTGOING_CALL";
  public static readonly ACTION_PACKAGE_ADDED = "android.intent.action.PACKAGE_ADDED";
  public static readonly ACTION_PACKAGE_CHANGED = "android.intent.action.PACKAGE_CHANGED";
  public static readonly ACTION_PACKAGE_DATA_CLEARED = "android.intent.action.PACKAGE_DATA_CLEARED";
  public static readonly ACTION_PACKAGE_FULLY_REMOVED = "android.intent.action.PACKAGE_FULLY_REMOVED";
  public static readonly ACTION_PACKAGE_INSTALL = "android.intent.action.PACKAGE_INSTALL";
  public static readonly ACTION_PACKAGE_FIRST_LAUNCH = "android.intent.action.PACKAGE_FIRST_LAUNCH";
  public static readonly ACTION_PACKAGE_NEEDS_VERIFICATION = "android.intent.action.PACKAGE_NEEDS_VERIFICATION";
  public static readonly ACTION_PACKAGE_REMOVED = "android.intent.action.PACKAGE_REMOVED";
  public static readonly ACTION_PACKAGE_REPLACED = "android.intent.action.PACKAGE_REPLACED";
  public static readonly ACTION_PACKAGE_RESTARTED = "android.intent.action.PACKAGE_RESTARTED";
  public static readonly ACTION_PACKAGE_VERIFIED = "android.intent.action.PACKAGE_VERIFIED";
  public static readonly ACTION_POWER_CONNECTED = "android.intent.action.POWER_CONNECTED";
  public static readonly ACTION_POWER_DISCONNECTED = "android.intent.action.POWER_DISCONNECTED";
  public static readonly ACTION_PROVIDER_CHANGED = "android.intent.action.PROVIDER_CHANGED";
  public static readonly ACTION_REBOOT = "android.intent.action.REBOOT";
  public static readonly ACTION_SCREEN_OFF = "android.intent.action.SCREEN_OFF";
  public static readonly ACTION_SCREEN_ON = "android.intent.action.SCREEN_ON";
  public static readonly ACTION_SHUTDOWN = "android.intent.action.SHUTDOWN";
  public static readonly ACTION_TIME_CHANGED = "android.intent.action.TIME_CHANGED";
  public static readonly ACTION_TIME_TICK = "android.intent.action.TIME_TICK";
  public static readonly ACTION_TIMEZONE_CHANGED = "android.intent.action.TIMEZONE_CHANGED";
  public static readonly ACTION_UID_REMOVED = "android.intent.action.UID_REMOVED";
  public static readonly ACTION_USER_BACKGROUND = "android.intent.action.USER_BACKGROUND";
  public static readonly ACTION_USER_FOREGROUND = "android.intent.action.USER_FOREGROUND";
  public static readonly ACTION_USER_INITIALIZE = "android.intent.action.USER_INITIALIZE";
  public static readonly ACTION_USER_PRESENT = "android.intent.action.USER_PRESENT";
  public static readonly ACTION_USER_UNLOCKED = "android.intent.action.USER_UNLOCKED";
  public static readonly ACTION_WALLPAPER_CHANGED = "android.intent.action.WALLPAPER_CHANGED";
  public static readonly ACTION_AIRPLANE_MODE_CHANGED = "android.intent.action.AIRPLANE_MODE"; 
  public static readonly ACTION_ANSWER = "android.intent.action.ANSWER";
  public static readonly ACTION_DREAMING_STARTED = "android.intent.action.DREAMING_STARTED";
  public static readonly ACTION_DREAMING_STOPPED = "android.intent.action.DREAMING_STOPPED";
  public static readonly ACTION_INPUT_METHOD_CHANGED = "android.intent.action.INPUT_METHOD_CHANGED";
  public static readonly ACTION_HEADSET_PLUG = "android.intent.action.HEADSET_PLUG";
  public static readonly ACTION_MANAGE_PACKAGE_STORAGE = "android.intent.action.MANAGE_PACKAGE_STORAGE";
  public static readonly ACTION_MY_PACKAGE_REPLACED = "android.intent.action.MY_PACKAGE_REPLACED";
  public static readonly ACTION_PREFERRED_APPLICATIONS_CHANGED = "android.intent.action.PREFERRED_APPLICATIONS_CHANGED";
  public static readonly ACTION_RADIO_POWER_RESET = "android.intent.action.RADIO_POWER_RESET";
  public static readonly ACTION_UMS_CONNECTED = "android.intent.action.UMS_CONNECTED";
  public static readonly ACTION_UMS_DISCONNECTED = "android.intent.action.UMS_DISCONNECTED";
  public static readonly ACTION_USER_ADDED = "android.intent.action.USER_ADDED";
  public static readonly ACTION_USER_REMOVED = "android.intent.action.USER_REMOVED";
  public static readonly ACTION_USER_STOPPED = "android.intent.action.USER_STOPPED";
  public static readonly ACTION_VPN_SETTINGS = "android.intent.action.VPN_SETTINGS";
  public static readonly ACTION_INSTALL_FAILURE = "android.intent.action.INSTALL_FAILURE"; 
  public static readonly ACTION_INSTALL_PACKAGE = "android.intent.action.INSTALL_PACKAGE";
  public static readonly ACTION_UNINSTALL_PACKAGE = "android.intent.action.UNINSTALL_PACKAGE";
  public static readonly ACTION_APPLICATION_SETTINGS = "android.intent.action.APPLICATION_SETTINGS";
  public static readonly ACTION_DATA_ROAMING_SETTINGS = "android.intent.action.DATA_ROAMING_SETTINGS";
  public static readonly ACTION_DATE_SETTINGS = "android.intent.action.DATE_SETTINGS";
  public static readonly ACTION_DEVICE_INFO_SETTINGS = "android.intent.action.DEVICE_INFO_SETTINGS";
  public static readonly ACTION_DISPLAY_SETTINGS = "android.intent.action.DISPLAY_SETTINGS";
  public static readonly ACTION_HOME_SETTINGS = "android.intent.action.HOME_SETTINGS";
  public static readonly ACTION_LOCATION_SOURCE_SETTINGS = "android.intent.action.LOCATION_SOURCE_SETTINGS";
  public static readonly ACTION_NETWORK_SETTINGS = "android.intent.action.NETWORK_SETTINGS";
  public static readonly ACTION_NFC_SETTINGS = "android.intent.action.NFC_SETTINGS";
  public static readonly ACTION_PRIVACY_SETTINGS = "android.intent.action.PRIVACY_SETTINGS";
  public static readonly ACTION_SEARCH_SETTINGS = "android.intent.action.SEARCH_SETTINGS";
  public static readonly ACTION_SECURITY_SETTINGS = "android.intent.action.SECURITY_SETTINGS";
  public static readonly ACTION_SETTINGS = "android.intent.action.SETTINGS";
  public static readonly ACTION_SOUND_SETTINGS = "android.intent.action.SOUND_SETTINGS";
  public static readonly ACTION_SYNC_SETTINGS = "android.intent.action.SYNC_SETTINGS";
  public static readonly ACTION_USAGE_ACCESS_SETTINGS = "android.intent.action.USAGE_ACCESS_SETTINGS";
  public static readonly ACTION_WIFI_IP_SETTINGS = "android.intent.action.WIFI_IP_SETTINGS";
  public static readonly ACTION_WIFI_SETTINGS = "android.intent.action.WIFI_SETTINGS";
  public static readonly ACTION_WIRELESS_SETTINGS = "android.intent.action.WIRELESS_SETTINGS";
  public static readonly ACTION_BLUETOOTH_SETTINGS = "android.intent.action.BLUETOOTH_SETTINGS";
  public static readonly ACTION_ACCESSIBILITY_SETTINGS = "android.intent.action.ACCESSIBILITY_SETTINGS";
  public static readonly ACTION_ACCOUNT_SETTINGS = "android.intent.action.ACCOUNT_SETTINGS";
  public static readonly ACTION_ADD_ACCOUNT = "android.intent.action.ADD_ACCOUNT";
  public static readonly ACTION_APPLICATION_DETAILS_SETTINGS = "android.intent.action.APPLICATION_DETAILS_SETTINGS";
  public static readonly ACTION_APPLICATION_DEVELOPMENT_SETTINGS = "android.intent.action.APPLICATION_DEVELOPMENT_SETTINGS";
  public static readonly ACTION_WEB_SEARCH = "android.intent.action.WEB_SEARCH";
  public static readonly ACTION_CREATE_SHORTCUT = "android.intent.action.CREATE_SHORTCUT";
  public static readonly EXTRA_STREAM = "android.intent.extra.STREAM";
  public static readonly EXTRA_TEXT = "android.intent.extra.TEXT";
  public static readonly EXTRA_EMAIL = "android.intent.extra.EMAIL";
  public static readonly EXTRA_CC = "android.intent.extra.CC";
  public static readonly EXTRA_BCC = "android.intent.extra.BCC";
  public static readonly EXTRA_SUBJECT = "android.intent.extra.SUBJECT";
  public static readonly EXTRA_REFERRER = "android.intent.extra.REFERRER";
  public static readonly EXTRA_REFERRER_NAME = "android.intent.extra.REFERRER_NAME";
  public static readonly EXTRA_PHONE_NUMBER = "android.intent.extra.PHONE_NUMBER";
  public static readonly EXTRA_LOCAL_ONLY = "android.intent.extra.LOCAL_ONLY";
  public static readonly EXTRA_INITIAL_INTENTS = "android.intent.extra.INITIAL_INTENTS";
  public static readonly EXTRA_CHOSEN_COMPONENT = "android.intent.extra.CHOSEN_COMPONENT";
  public static readonly EXTRA_SHORTCUT_INTENT = "android.intent.extra.SHORTCUT_INTENT";
  public static readonly EXTRA_SHORTCUT_NAME = "android.intent.extra.SHORTCUT_NAME";
  public static readonly EXTRA_SHORTCUT_ICON = "android.intent.extra.SHORTCUT_ICON";
  public static readonly EXTRA_SHORTCUT_ICON_RESOURCE =
    "android.intent.extra.SHORTCUT_ICON_RESOURCE";
  public static readonly EXTRA_TITLE = "android.intent.extra.TITLE";
  public static readonly EXTRA_HTML_TEXT = "android.intent.extra.HTML_TEXT";
  public static readonly EXTRA_ASSIST_CONTEXT = "android.intent.extra.ASSIST_CONTEXT";
  public static readonly EXTRA_ASSIST_INPUT_DEVICE_ID =
    "android.intent.extra.ASSIST_INPUT_DEVICE_ID";
  public static readonly EXTRA_ASSIST_INPUT_METHOD_MANAGER_SERVICE =
    "android.intent.extra.ASSIST_INPUT_METHOD_MANAGER_SERVICE";
  public static readonly EXTRA_ASSIST_SCREENSHOT = "android.intent.extra.ASSIST_SCREENSHOT";
  public static readonly EXTRA_ASSIST_URI = "android.intent.extra.ASSIST_URI";
  public static readonly EXTRA_ORIGINATING_URI = "android.intent.extra.ORIGINATING_URI";
  public static readonly EXTRA_WEB_SEARCH_INTENT = "android.intent.extra.WEB_SEARCH_INTENT";
  public static readonly EXTRA_MEDIA_ALBUM = "android.intent.extra.MEDIA_ALBUM";
  public static readonly EXTRA_MEDIA_ARTIST = "android.intent.extra.MEDIA_ARTIST";
  public static readonly EXTRA_MEDIA_FOCUS = "android.intent.extra.MEDIA_FOCUS";
  public static readonly EXTRA_MEDIA_GENRE = "android.intent.extra.MEDIA_GENRE";
  public static readonly EXTRA_MEDIA_TITLE = "android.intent.extra.MEDIA_TITLE";
  public static readonly EXTRA_ALARM_COUNT = "android.intent.extra.ALARM_COUNT";
  public static readonly EXTRA_CHANGED_COMPONENT_NAME_LIST =
    "android.intent.extra.CHANGED_COMPONENT_NAME_LIST";
  public static readonly EXTRA_CHANGED_PACKAGE_LIST =
    "android.intent.extra.CHANGED_PACKAGE_LIST";
  public static readonly EXTRA_CHANGED_UID_LIST = "android.intent.extra.CHANGED_UID_LIST";
  public static readonly EXTRA_DATA_REMOVED = "android.intent.extra.DATA_REMOVED";
  public static readonly EXTRA_DONT_KILL_APP = "android.intent.extra.DONT_KILL_APP";
  public static readonly EXTRA_INSTALL_RESULT = "android.intent.extra.INSTALL_RESULT";
  public static readonly EXTRA_KEY_EVENT = "android.intent.extra.KEY_EVENT";
  public static readonly EXTRA_MIME_TYPES = "android.intent.extra.MIME_TYPES";
  public static readonly EXTRA_MOUNT_FAILED = "android.intent.extra.MOUNT_FAILED";
  public static readonly EXTRA_NOTIFICATION_ID = "android.intent.extra.NOTIFICATION_ID";
  public static readonly EXTRA_NOTIFICATION_TAG = "android.intent.extra.NOTIFICATION_TAG";
  public static readonly EXTRA_PACKAGES = "android.intent.extra.PACKAGES";
  public static readonly EXTRA_REPLACING = "android.intent.extra.REPLACING";
  public static readonly EXTRA_SPLIT_NAME = "android.intent.extra.SPLIT_NAME";
  public static readonly EXTRA_SUSPENDED_PACKAGE_EXTRAS =
    "android.intent.extra.SUSPENDED_PACKAGE_EXTRAS";
  public static readonly EXTRA_UID = "android.intent.extra.UID";
  public static readonly EXTRA_USER = "android.intent.extra.USER";
  public static readonly EXTRA_CHANNEL_ID = "android.intent.extra.CHANNEL_ID";
  public static readonly EXTRA_REMOTE_INTENT_TOKEN = "android.intent.extra.REMOTE_INTENT_TOKEN";
  public static readonly EXTRA_PERMISSION_GROUP_NAME =
    "android.intent.extra.PERMISSION_GROUP_NAME";
  public static readonly EXTRA_PERMISSION_NAME = "android.intent.extra.PERMISSION_NAME";
  public static readonly EXTRA_RESTRICTIONS_BUNDLE = "android.intent.extra.RESTRICTIONS_BUNDLE";
  public static readonly EXTRA_RESTRICTIONS_INTENT = "android.intent.extra.RESTRICTIONS_INTENT";
  public static readonly EXTRA_TIMEZONE = "android.intent.extra.TIMEZONE";
  public static readonly EXTRA_DONT_REPLACE_EXISTING_APPLICATION_INFO =
    "android.intent.extra.DONT_REPLACE_EXISTING_APPLICATION_INFO";
  public static readonly EXTRA_SPLASH_SCREEN_THEME = "android.intent.extra.SPLASH_SCREEN_THEME";
  public static readonly EXTRA_SPLASH_SCREEN_ICON_ID =
    "android.intent.extra.SPLASH_SCREEN_ICON_ID";
  public static readonly EXTRA_STREAM_MULTIPLE = "android.intent.extra.STREAM_MULTIPLE";
  public static readonly EXTRA_EXCLUDE_COMPONENTS = "android.intent.extra.EXCLUDE_COMPONENTS";
  public static readonly EXTRA_ALLOW_MULTIPLE = "android.intent.extra.ALLOW_MULTIPLE";
  public static readonly EXTRA_PROVISIONING_ACCOUNT_TO_MIGRATE =
    "android.intent.extra.PROVISIONING_ACCOUNT_TO_MIGRATE";
  public static readonly EXTRA_PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME =
    "android.intent.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME";
  public static readonly EXTRA_PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED =
    "android.intent.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED";
  public static readonly EXTRA_PROVISIONING_LOCALE = "android.intent.extra.PROVISIONING_LOCALE";
  public static readonly EXTRA_PROVISIONING_TIME_ZONE =
    "android.intent.extra.PROVISIONING_TIME_ZONE";
  public static readonly EXTRA_PROVISIONING_WIFI_HIDDEN =
    "android.intent.extra.PROVISIONING_WIFI_HIDDEN";
  public static readonly EXTRA_PROVISIONING_WIFI_PASSWORD =
    "android.intent.extra.PROVISIONING_WIFI_PASSWORD";
  public static readonly EXTRA_PROVISIONING_WIFI_SECURITY_TYPE =
    "android.intent.extra.PROVISIONING_WIFI_SECURITY_TYPE";
  public static readonly EXTRA_PROVISIONING_WIFI_SSID =
    "android.intent.extra.PROVISIONING_WIFI_SSID";
}
