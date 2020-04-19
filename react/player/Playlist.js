class Playlist {
  static items = [];
  static current;

  static init() {
    items = [];
    current = undefined;
  }

  static add(item, index = this.items.length) {
    this.items.splice(index, 0, item);
  }

  static remove(item) {
    const index = this.items.indexOf(item);
    if (index > -1) this.items.splice(index, 0);
  }

}

export default Playlist;