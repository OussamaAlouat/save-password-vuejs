
import { createLocalVue, shallowMount } from '@vue/test-utils';
import ListPasswords from '@/components/ListPasswords.vue';
import Vuex from 'vuex';

const localVue = createLocalVue()
localVue.use(Vuex);

describe('ListPasswords.vue', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      getters: {
        getPasswords: () => []
      }
    })
  })
  it('Renders component', () => {
    const wrapper = shallowMount(ListPasswords, {
      localVue,
      store
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.find('.center').text()).toEqual('Your passwords')
  })

  it('When passwords getter is empty, shows "There are not passwords"', () => {
    const wrapper = shallowMount(ListPasswords, {
      localVue,
      store
    })
    expect(wrapper.find('.button.tag').text()).toEqual('There are not passwords')
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
      }
    })
    const wrapper = shallowMount(ListPasswords, {
      localVue,
      store
    })
    expect(wrapper.find('.svpListContainer')).toBeDefined()
    expect(wrapper.find('.svpListContainer').html()).not.toBeUndefined()

    console.log('sECOND',wrapper.find('.svpListContainer').html())
  })
})
