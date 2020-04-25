class Playlist {
  static items = [];
  static currentTrack = { id: 0 };

  static init() {
    items = [];
    currentTrack = {
      id: undefined
    };
  }

  static find(trackId) {
    return this.items.find(({ id }) => id === trackId)[0];
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