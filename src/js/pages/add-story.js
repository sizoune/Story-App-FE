import lottie from 'lottie-web';
import { Modal } from 'bootstrap';

const AddStory = {

  _defAnimation() {
    return lottie.loadAnimation({
      container: document.getElementById('lottieSvg'),
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: '/asset/success.json',
    });
  },

  async init() {
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

  _addStory() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);
      this._showSuccessDialog();
      // this._goToDashboardPage();
    }
  },

  _showSuccessDialog() {
    const myModal = new Modal(document.getElementById('myModal'));
    const btnDashboard = document.getElementById('btnDashboard');
    const btnAnother = document.getElementById('btnAnother');

    this._defAnimation();

    btnDashboard.onclick = () => {
      this._goToDashboardPage();
    };

    btnAnother.onclick = () => {
      myModal.hide();
      document.querySelector('svg').remove();
      this._clearInput();
    };
    myModal.show();
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
