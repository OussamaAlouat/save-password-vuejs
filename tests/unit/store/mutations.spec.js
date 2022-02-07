import Mutations from '../../../src/store/mutations';
import Vue from 'vue'

describe('Mutations', () => {
  it('pushPage runs ok', () => {
    const state = {
      pageStack: [],
    }

    Mutations.pushPage(state, 'AddVue');

    expect(state.pageStack).toHaveLength(1);
    expect(state.pageStack[0]).toEqual('AddVue')
  });

  it('setPassword runs ok', () => {
    const state = {
      passwords: [],
    }

    const password = {
      password: '12345',
      type: 'Facebook',
      visibility: false,
      id: 'id'
    }

    Mutations.setPassword(state, password);

    expect(state.passwords).toHaveLength(1);
    expect(state.passwords[0]).toEqual(password)
  });

  it('removePassword runs ok', () => {
    const state = {
      passwords: [
        {
          password: '12345',
          type: 'Facebook',
          visibility: false,
          id: 'id'
        }
      ],
    }

    const password = {
      password: '12345',
      type: 'Facebook',
      visibility: false,
      id: 'id'
    }

    Mutations.removePassword(state, password);
    expect(state.passwords).toHaveLength(0);
  });

  it('changeVisibility: on visibility true, change to false', () => {
    const state = {
      passwords: [
        {
          password: '12345',
          type: 'Facebook',
          visibility: false,
          id: 'id'
        }
      ],
    }

    const password = {
      password: '12345',
      type: 'Facebook',
      visibility: true,
      id: 'id'
    }

    Mutations.changeVisibility(state, password);
    expect(state.passwords).toHaveLength(1);
    expect(state.passwords[0].visibility).toBeTruthy()
  });

  it('changeVisibility: on visibility false, change to true', () => {
    const state = {
      passwords: [
        {
          password: '12345',
          type: 'Facebook',
          visibility: true,
          id: 'id'
        }
      ],
    }

    const password = {
      password: '12345',
      type: 'Facebook',
      visibility: false,
      id: 'id'
    }

    Mutations.changeVisibility(state, password);
    expect(state.passwords).toHaveLength(1);
    expect(state.passwords[0].visibility).toBeFalsy()
  });
})