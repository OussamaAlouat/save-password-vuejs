
import { createLocalVue, shallowMount } from '@vue/test-utils';
import ListPasswords from '@/components/ListPasswords.vue';
import AddPassword from '@/components/AddPassword.vue';
import UpdatePassword from '@/components/UpdatePassword.vue'

import Vuex from 'vuex';

const localVue = createLocalVue()
localVue.use(Vuex);

describe('ListPasswords.vue', () => {
  let store
  let actions =  {
    changeVisibility: jest.fn(),
    removePassword: jest.fn(),
    setCurrentPassword: jest.fn(),
    pushPage: jest.fn()
  }

  beforeEach(() => {
    store = new Vuex.Store({
      getters: {
        getPasswords: () => [],
      },
      actions
    })
  })

  it('Renders component', () => {
    const wrapper = shallowMount(ListPasswords, {
      localVue,
      store
    });

    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.find('.center').text()).toEqual('Your passwords')
  })

  it('When passwords getter is empty, shows "There are not passwords"', () => {
    const wrapper = shallowMount(ListPasswords, {
      localVue,
      store
    })

    expect(wrapper.find('.button.tag').text()).toEqual('There are not passwords')
    expect(wrapper.vm.isEmpty).toBeTruthy()
  })

  it('When passwords getter is not empty, appear class "svpListContainer"', () => {
    store = new Vuex.Store({
      getters: {
        getPasswords: () => [
          {
            password: '12345',
            type: 'Data type',
            visibility: false,
            id: 'id'
          }
        ]
      },
      actions
    })
    const wrapper = shallowMount(ListPasswords, {
      localVue,
      store
    });

    expect(wrapper.find('.svpListContainer')).toBeDefined()
    expect(wrapper.find('.svpListContainer').html()).not.toBeUndefined()
  })

  it('When we click on "goToAddPassword", emits "push-page"', () => {
    store = new Vuex.Store({
      getters: {
        getPasswords: () => [
          {
            password: '12345',
            type: 'Data type',
            visibility: false,
            id: 'id'
          }
        ]
      },
      actions
    })
    const wrapper = shallowMount(ListPasswords, {
      localVue,
      store
    });

    wrapper.vm.goToAddPassword();
    wrapper.vm.$nextTick();
    expect(wrapper.emitted()['push-page']).toBeTruthy();
  })

  it('When we click on "remove", the toast confirmation is shown', () => {
    store = new Vuex.Store({
      getters: {
        getPasswords: () => [
          {
            password: '12345',
            type: 'Data type',
            visibility: true,
            id: 'id'
          }
        ]
      },
      actions,
    })
    const wrapper = shallowMount(ListPasswords, {
      localVue,
      store,
      data() {
        return {
          toastVisibility: false
        }
      }
    });

    const show = spyOn(wrapper.vm, 'showRemoveConfirmation');
    wrapper.vm.remove();
    wrapper.vm.$nextTick();
    expect(show).toHaveBeenCalled();
  })

  it('When we pass on "showRemoveConfirmation", "toastVisibility" is true', () => {
    store = new Vuex.Store({
      getters: {
        getPasswords: () => [
          {
            password: '12345',
            type: 'Data type',
            visibility: false,
            id: 'id'
          }
        ]
      },
      actions
    })

    const wrapper = shallowMount(ListPasswords, {
      localVue,
      store,
      data() {
        return {
          toastVisibility: false
        }
      },
      components: {
        AddPassword,
        UpdatePassword,
      }
    });

    wrapper.vm.showRemoveConfirmation();
    wrapper.vm.$nextTick();
    expect(wrapper.vm.toastVisibility).toBeTruthy()
  })

  it('On update password, the password have new data', () => {
    store = new Vuex.Store({
      getters: {
        getPasswords: () => [
          {
            password: '12345',
            type: 'Data type',
            visibility: false,
            id: 'id'
          }
        ]
      },
      actions
    })

    const wrapper = shallowMount(ListPasswords, {
      localVue,
      store,
      data() {
        return {
          toastVisibility: false
        }
      },
      components: {
        AddPassword,
        UpdatePassword,
      }
    });

    const newPassword = {
      password: '1245',
      type: 'Data type',
      visibility: true,
      id: 'id'
    };

    wrapper.vm.updatePassword(newPassword);
    wrapper.vm.$nextTick();
    expect(actions.setCurrentPassword).toHaveBeenCalled();
    expect(actions.pushPage).toHaveBeenCalled();
  });

  it('On confirm remove data, "removePassword" will be called', () => {
    store = new Vuex.Store({
      getters: {
        getPasswords: () => [
          {
            password: '12345',
            type: 'Data type',
            visibility: false,
            id: 'id'
          }
        ]
      },
      actions
    })

    const wrapper = shallowMount(ListPasswords, {
      localVue,
      store,
      data() {
        return {
          toastVisibility: true
        }
      },
      components: {
        AddPassword,
        UpdatePassword,
      }
    });

    const newPassword = {
      password: '12345',
      type: 'Data type',
      visibility: false,
      id: 'id'
    };

    wrapper.vm.confirm(newPassword);
    wrapper.vm.$nextTick();
    expect(actions.removePassword).toHaveBeenCalled();
  });

  it('On change visibility, "changeVisibilityPassword" action will be called' , () => {
    store = new Vuex.Store({
      getters: {
        getPasswords: () => [
          {
            password: '12345',
            type: 'Data type',
            visibility: false,
            id: 'id'
          }
        ]
      },
      actions
    })

    const wrapper = shallowMount(ListPasswords, {
      localVue,
      store,
      data() {
        return {
          toastVisibility: true
        }
      },
      components: {
        AddPassword,
        UpdatePassword,
      }
    });

    const newPassword = {
      password: '12345',
      type: 'Data type',
      visibility: false,
      id: 'id'
    };

    wrapper.vm.changeVisibilityPassword(newPassword);
    wrapper.vm.$nextTick();
    expect(actions.changeVisibility).toHaveBeenCalled();
  })
})
