import { module, test } from "qunit";
import { visit, click, fillIn, currentURL } from "@ember/test-helpers";
import { createBand } from "rarwe/tests/helpers/custom-helpers";
import { setupApplicationTest } from "ember-qunit";
import setupMirageTest from "ember-cli-mirage/test-support/setup-mirage";

module("Acceptance | Bands", function(hooks) {
  setupApplicationTest(hooks);
  setupMirageTest(hooks);

  test("List bands", async function(assert) {
    this.server.create("band", { name: "Spoon" });
    this.server.create("band", { name: "Long Distance Calling" });
    await visit("/");

    assert
      .dom("[data-test-rr=band-link]")
      .exists({ count: 2 }, "All band links are rendered");
    assert
      .dom("[data-test-rr=band-list-item]:first-child")
      .hasText("Spoon", "First band link contains the band name");
  });

  test("Create a band", async function(assert) {
    this.server.logging = true;
    this.server.create("band", { name: "U2" });

    await visit("/");
    await createBand("CRV");

    assert.dom("[data-test-rr=band-link]").exists("New band link rendered");
    assert
      .dom("[data-test-rr=songs-nav-item] >.active")
      .hasText("Songs", "The Songs tab is active");
  });

  test("Sort songs in various ways", async function(assert) {
    let band = this.server.create("band", { name: "Them Crooked Vultures" });
    this.server.create("song", { title: "Elephants", rating: 5, band });
    this.server.create("song", { title: "New Fang", rating: 4, band });
    this.server.create("song", {
      title: "Mind Eraser, No Chaser",
      rating: 4,
      band
    });
    this.server.create("song", {
      title: "Spinning in Daffodils",
      rating: 5,
      band
    });

    await visit("/");
    await click('[data-test-rr=band-link]');
    assert.equal(currentURL(), '/bands/1/songs');

    assert.dom('[data-test-rr=song-list-item]:first-child').hasText('Elephants', 'First song is the first in alphabet');
    assert.dom('[data-test-rr=song-list-item]:last-child').hasText('New Fang', 'The last song is the lowest ranked, last one in the alphabet');

    await click('[data-test-rr=sort-by-title-desc]');
    assert.equal(currentURL(), '/bands/1/songs?sort=titleDesc');
    assert.dom('[data-test-rr=song-list-item]:first-child').hasText('Spinning in Daffodils', 'The first song is the one that comes last in the alphabet');
    assert.dom('[data-test-rr=song-list-item]:last-child').hasText('Elephants', 'The last song is the one that comes first in the alphabet');  
  });

  test('Search songs', async function(assert) {

    let band = this.server.create('band', { name: 'Them Crooked Vultures' });
    this.server.create('song', { title: 'Elephants', rating: 5, band});
    this.server.create('song', { title: 'New Fang', rating: 4, band });
    this.server.create('song', { title: 'Mind Eraser, No Chaser', rating: 4, band });
    this.server.create('song', { title: 'Spinning in Daffodils', rating: 5, band });
    this.server.create('song', { title: 'No One Loves Me & Neither Do I', rating: 5, band });
    
    await visit('/');
    await click('[data-test-rr=band-link]');
    await fillIn('[data-test-rr=search-box]', 'no');
    assert.equal(currentURL(), '/bands/1/songs?s=no');

    assert.dom('[data-test-rr=song-list-item]').exists({ count: 2 }, 'The songs matching the search term are displayed');
    
    await click('[data-test-rr=sort-by-title-desc]');
    
    assert.dom('[data-test-rr=song-list-item]:first-child').hasText('No One Loves Me & Neither Do I', 'A matching song that comes later in the alphabet appears on top');
    assert.dom('[data-test-rr=song-list-item]:last-child').hasText('Mind Eraser, No Chaser', 'A matching song that comes sooner in the alphabet appears at the bottom');
    
    });


});
