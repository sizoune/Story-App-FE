import { TimeSince } from '../utlis/Utlis';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CheckUserAuth from './auth/check-user-auth';
import Story from '../network/story';
import ErrorHandler from '../utlis/ErrorHandler';
import Show from '../utlis/ShowCustomDialog';

const Dashboard = {
  async init() {
    CheckUserAuth.checkLoginState();

    await this._initialData();
    // this._initialListener();
  },

  async _initialData() {
    this._renderPlaceHolder();
    try {
      const response = await Story.getAllStory();
      const storyResponse = response.data;
      this._appStories = storyResponse.listStory;
      this._populateStoryDataToCard(this._appStories);
    } catch (error) {
      Show.errorDialog(ErrorHandler(error));
      console.log(error);
    }
  },

  _renderPlaceHolder() {
    const appStories = document.getElementById('app-stories');
    appStories.innerHTML = '';
    for (let index = 0; index < 10; index += 1) {
      appStories.innerHTML += this._templateCardPlaceholderStory(
        {
          name: 'wildan',
          photoUrl: '',
          description:
            'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',
          createdAt: '2022-01-08T06:34:18.598Z',
        },
      );
    }
  },

  _populateStoryDataToCard(stories = null) {
    if (!Array.isArray(stories)) {
      throw new Error(`Parameter stories should be an array.  The value is ${stories}`);
    }

    const appStories = document.getElementById('app-stories');
    appStories.innerHTML = '';

    stories.forEach((item) => {
      appStories.innerHTML += this._templateCardStory(item, false);
    });
  },

  _templateCardStory(story, isLoading) {
    const relativeTime = TimeSince(new Date(story.createdAt));
    return `
      <div class='col'>
        <card-story
          name='${story.name}'
          photoUrl='${story.photoUrl}'
          description='${story.description}'
          createdAt='${relativeTime}'
          isLoading='${isLoading}'
        ></card-story>
      </div> 
    `;
  },

  _templateCardPlaceholderStory(story) {
    return `
      <div class='col-sm'>
        <card-story-placeholder
          name='${story.name}'
          photoUrl='${story.photoUrl}'
          description='${story.description}'
          createdAt='${story.createdAt}'
          isLoading=true
        ></card-story-placeholder>
      </div> 
    `;
  },
};

export default Dashboard;
