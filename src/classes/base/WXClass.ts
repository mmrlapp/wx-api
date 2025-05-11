export class WXClass {
  public constructor() {
    this.findInterface = this.findInterface.bind(this);
  }

  protected readonly fileToken: string | undefined = Object.keys(window).find(
    (key) => key.match(/^\$(\w{2})File$/m)
  );

  protected readonly fileInputToken: string | undefined = Object.keys(
    window
  ).find((key) => key.match(/^\$(\w{2})FileInputStream$/m));

  protected readonly moduleToken: string | undefined = this.fileToken
    ?.slice(0, 3)
    .toLowerCase();

  protected findInterface() {
    return Object.keys(window).find((key) => {
      if (key === this.fileToken || key === this.fileInputToken) return false;

      if (key === "$packageManager") return false;
      if (key === "$userManager") return false;
      if (!this.moduleToken) return false;

      return key.toLowerCase().startsWith(this.moduleToken);
    });
  }
}
