import Controller from "@ember/controller";

export default Controller.extend({
  isEditingDetails: false,
  newDescription: "",
  actions: {
    startEdit() {
      this.set("isEditingDetails", true);
    },
    cancelEdit() {
      this.set("isEditingDetails", false);
    },
    async editDetails() {
      let updatedDetailsModel = this.get("model");
      updatedDetailsModel.set("description", this.newDescription);
      await updatedDetailsModel.save();
      this.set("newDescription", "");
      this.set("isEditingDetails", false);
    }
  }
});
