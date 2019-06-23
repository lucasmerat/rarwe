import Route from '@ember/routing/route';

export default Route.extend({
    redirect (bandModel) {
        if (bandModel.description) {
            this.transitionTo("bands.band.details");
        } else {
            this.transitionTo("bands.band.songs");
        }
    }
});
