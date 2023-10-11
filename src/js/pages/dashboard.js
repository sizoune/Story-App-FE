import TimeSince from '../utlis/Utlis';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Dashboard = {
  async init() {
    await this._initialData();
    // this._initialListener();
  },

  async _initialData() {
    const fetchStory = await fetch('/data/DATA.json');
    const storyResponse = await fetchStory.json();
    console.log(storyResponse);
    this._appStories = storyResponse.listStory;
    this._populateStoryDataToCard(this._appStories);
  },

  _populateStoryDataToCard(stories = null) {
    if (!Array.isArray(stories)) {
      throw new Error(`Parameter stories should be an array.  The value is ${stories}`);
    }

    const appStories = document.getElementById('app-stories');
    appStories.innerHTML = '';

    stories.forEach((item) => {
      appStories.innerHTML += this._templateCardStory(item);
    });
  },

  _templateCardStory(story) {
    const relativeTime = TimeSince(new Date(story.createdAt))
    return `
      <div class="col">
        <card-story
          id='${story.id}'
          name='${story.name}'
          photoUrl='${story.photoUrl}'
          description='${story.description}'
          createdAt='${relativeTime}'
        ></card-story>
      </div> 
    `;
  },
};

export default Dashboard;