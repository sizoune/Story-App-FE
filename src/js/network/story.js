import ApiEndpoint from '../config/api-endpoint';
import { MultiPartInstance, MultiPartWithoutTokenInstance, StoryInstance } from './instance';

const Story = {
  async getAllStory() {
    console.log(StoryInstance);
    return await StoryInstance.get(ApiEndpoint.GET_ALL_STORIES);
  },
  async getStoryById(id) {
    return await StoryInstance.get(ApiEndpoint.GET_BY_ID_STORY(id));
  },

  async addStory({ description, photo }) {
    const data = { description, photo };
    return await MultiPartInstance.post(ApiEndpoint.ADD_NEW_STORY, data);
  },
  async addStoryAsGuest({ description, photo }) {
    const data = { description, photo };
    return await MultiPartWithoutTokenInstance.post(ApiEndpoint.ADD_NEW_STORY_AS_GUEST, data);
  },
};

export default Story;
