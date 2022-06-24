class Scrollery {
  private path: string;
  private static hasNextPage = true;

  constructor(path: string) {
    this.path = path;
  }

  public static loadNextPage() {
    if (!this.hasNextPage) return;
    console.log('Load next page content');
  }
}

export default Scrollery;
