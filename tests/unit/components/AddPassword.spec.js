
import { createLocalVue, shallowMount } from '@vue/test-utils';
import AddPassword from '@/components/AddPassword.vue';
import Vuex from 'vuex';

const localVue = createLocalVue()
localVue.use(Vuex);

describe('AddPassword.vue', () => {
  let store

  let actions =  {
    setPassword: jest.fn(),
    goBack: jest.fn(),
    save: jest.fn(),
    setAllPasswords: jest.fn()
  };

  let getters = {
    getTypes: () => ['Facebook', 'Gmail', 'Instagram'],
    getPasswords: () => []
  }

  beforeEach(() => {
    store = new Vuex.Store({
      getters,
      actions
    })
  })
  it('Renders component', () => {
    const wrapper = shallowMount(AddPassword, {
      localVue,
      store
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  });

  it('On set a password "setPassword" will be called', () => {
    const wrapper = shallowMount(AddPassword, {
      localVue,
      store
    })

    wrapper.setData({
      password: '12222',
      type: 'Facebook'
    });

    wrapper.vm.addPassword();
    wrapper.vm.$nextTick();
    expect(actions.setPassword).toHaveBeenCalled()
  });
  it('On set an empty password and empty type will be appear an error message', () => {
    const wrapper = shallowMount(AddPassword, {
      localVue,
      store
    })

    wrapper.vm.addPassword();
    wrapper.vm.$nextTick();
    expect(wrapper.vm.message).toEqual('The password and the type are empty!')
  });

  it('On set an empty password but not empty type will be appear an error message', () => {
    const wrapper = shallowMount(AddPassword, {
      localVue,
      store
    })

    wrapper.setData({
      type: 'Facebook'
    });

    wrapper.vm.addPassword();
    wrapper.vm.$nextTick();
    expect(wrapper.vm.message).toEqual('The password is empty')
  });
  it('On set an empty type but not empty password will be appear an error message', () => {
    const wrapper = shallowMount(AddPassword, {
      localVue,
      store
    })

    wrapper.setData({
      password: '1234'
    });

    wrapper.vm.addPassword();
    wrapper.vm.$nextTick();
    expect(wrapper.vm.message).toEqual('The type is empty')
  });

  it('On set a password that already it is, will be appear an error message', () => {
    getters = {
      getTypes: () => ['Facebook', 'Gmail', 'Instagram'],
      getPasswords: () => [{
        password: '12345',
        type: 'Facebook',
        visibility: false,
        id: 'id'
      }]
    }

    store = new Vuex.Store({
      getters,
      actions
    })

    const wrapper = shallowMount(AddPassword, {
      localVue,
      store
    })

    wrapper.setData({
      password: '12345',
      type: 'Facebook'
    });

    wrapper.vm.addPassword();
    wrapper.vm.$nextTick();
    expect(wrapper.vm.message).toEqual('This password is already present on your passwords list')
  })
});
