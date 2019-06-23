import Route from '@ember/routing/route';

export default Route.extend({
    model (params) {
        return this.store.findRecord("band", params.id);
    },
    actions: {
        didTransition() {
            let band = this.modelFor(this.routeName);
            document.title = `${band.name} - Rock & Roll`;
        }
    }
});
