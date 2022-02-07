import { createLocalVue, shallowMount } from '@vue/test-utils';
import UpdatePassword from '@/components/UpdatePassword.vue';
import Vuex from 'vuex';

const localVue = createLocalVue()
localVue.use(Vuex);

describe('UpdatePassword.vue', () => {
  let store;
  let actions =  {
    updatePassword: jest.fn(),
    goBack: jest.fn(),
  };

  const dat= {
    password: '12345',
    type: 'Facebook',
    visibility: false,
    id: 'id'
  }

  let getters = {
    getPassword: () => dat,
  }
  
  beforeEach(() => {
    store = new Vuex.Store({
      getters,
      actions
    })
  })



  it('Renders component', () => {
    const wrapper = shallowMount(UpdatePassword, {
      localVue,
      store,
    })

    expect(wrapper.isVueInstance()).toBeTruthy()
  });
});
