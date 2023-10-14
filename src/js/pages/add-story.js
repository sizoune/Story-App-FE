import CheckUserAuth from './auth/check-user-auth';
import Story from '../network/story';
import Show from '../utlis/ShowCustomDialog';
import ErrorHandler from '../utlis/ErrorHandler';

const AddStory = {

  async init() {
    CheckUserAuth.checkLoginState();

    const submitBtn = document.querySelector('#addBtn');
    if (!CheckUserAuth.getUserSignedIn()){
      submitBtn.innerText='Submit Story As A Guest';
    } else {
      submitBtn.innerText='Submit Your Story';
    }
    await this._initialListener();
  },

  _initialListener() {
    const imageUpload = document.querySelector('#story-image');
    imageUpload.addEventListener('change', () => {
      this._updateImagePreview();
    });

    const addStoryForm = document.querySelector('#addStoryForm');
    addStoryForm.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        addStoryForm.classList.add('was-validated');
        this._addStory();
      },
      false,
    );
  },

  async _addStory() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);
      this._showLoading(true);
      try {
        let successMsg = '';
        if (CheckUserAuth.getUserSignedIn()){
          successMsg = 'Your Story has been Added Successfully!';
          await Story.addStory({
            description: formData.description,
            photo: formData.storyImage,
          });
        } else {
          successMsg = 'Your Story has been Added As A Guest Successfully! Please Login to see All Stories';
          await Story.addStoryAsGuest({
            description: formData.description,
            photo: formData.storyImage,
          });
        }
        this._showLoading(false);

        Show.successDialog(successMsg, () => {
          this._goToDashboardPage();
        });
      } catch (error) {
        this._showLoading(false);
        Show.errorDialog(ErrorHandler(error));
        console.log(error);
      }
    }
  },

  _showLoading(isLoading) {
    const loadingPlayer = document.querySelector('#loading-player');
    const submitBtn = document.querySelector('#addBtn');
    if (isLoading) {
      loadingPlayer.classList.remove('d-none');
      submitBtn.classList.add('d-none');
    } else {
      loadingPlayer.classList.add('d-none');
      submitBtn.classList.remove('d-none');
    }
  },

  _updateImagePreview() {
    const storyImageInput = document.querySelector('#story-image');
    const imagePreview = document.getElementById('imagePreview');

    const photo = storyImageInput.files[0];
    if (!photo) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      imagePreview.classList.remove('d-none');
      imagePreview.setAttribute('src', event.target.result);

      imagePreview.onload = () => {
        window.scrollTo(0, document.body.scrollHeight);
      };
    };
    reader.readAsDataURL(photo);
  },

  _getFormData() {
    const storyImageInput = document.querySelector('#story-image');
    const yourStoryInput = document.querySelector('#yourStory');

    return {
      storyImage: storyImageInput.files[0],
      description: yourStoryInput.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');
    return formDataFiltered.length === 0;
  },

  _clearInput() {
    const storyImageInput = document.querySelector('#story-image');
    const addStoryForm = document.querySelector('#addStoryForm');
    const yourStoryInput = document.querySelector('#yourStory');
    const imagePreview = document.getElementById('imagePreview');

    imagePreview.classList.add('d-none');
    addStoryForm.classList.remove('was-validated');
    yourStoryInput.value = '';
    storyImageInput.value = '';
    window.scrollTo(0, 0);
  },

  _goToDashboardPage() {
    window.location.pathname = '/';
  },
};

export default AddStory;
