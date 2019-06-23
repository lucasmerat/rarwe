import Route from "@ember/routing/route";

export default Route.extend({
  model() {
    return this.modelFor("bands.band");
  },
  actions: {
    willTransition(transition) {
      if (this.controller.isEditingDetails) {
        let leave = window.confirm("You are editing, are you sure?");
        if (!leave) {
          transition.abort();
        }
      }
    }
  },
  resetController(controller) {
    controller.setProperties({
      isEditingDetails: false,
      newDescription: ""
    });
  }
});
