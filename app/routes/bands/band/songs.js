import Route from "@ember/routing/route";

export default Route.extend({
  model() {
    console.log(this.modelFor("bands.band"))
    return this.modelFor("bands.band");
  },

  resetController (controller) {
    controller.setProperties({
      isAddingSong: false,
      newSongTitle: ""
    })
  }
});
