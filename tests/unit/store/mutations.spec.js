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

  it('goBack runs ok', () => {
    const state = {
      pageStack: ['AddVue'],
    }

    Mutations.goBack(state);

    expect(state.pageStack).toHaveLength(0);
  });

  it('goBack runs ok when pageStack no have pages', () => {
    const state = {
      pageStack: [],
    }

    Mutations.goBack(state);

    expect(state.pageStack).toHaveLength(0);
  });

  it('setCurrentPassword rund ok', () => {
    const state = {
      currentPassword: {}
    }

    const password = {
      password: '12345',
      type: 'Facebook',
      visibility: false,
      id: 'id'
    }

    Mutations.setCurrentPassword(state, password)
    expect(state.currentPassword).toEqual(password);
  });

  it('setCurrentPassword (recived null) rund ok', () => {
    const state = {
      currentPassword: {}
    }

    Mutations.setCurrentPassword(state, null)
    expect(state.currentPassword).toBeNull();
  });


  it('setCurrentPassword, when recive undefined, it will set empty object', () => {
    const state = {
      currentPassword: {}
    }

    Mutations.setCurrentPassword(state, undefined)
    expect(state.currentPassword).toEqual({});
  });

  it('updatePassword runs ok', () => {
    const state = {
      currentPassword: {
        password: '12353',
        type: 'SWEET',
        visibility: true,
        id: 'id'
      },
      passwords: [
        {
          password: '12346',
          type: 'Facebook',
          visibility: true,
          id: 'id1'
        },
        {
          password: '12345',
          type: 'Facebook',
          visibility: true,
          id: 'id'
        }
      ]
    };

    const newPassword = {
      password: '12353',
      type: 'SWEET',
      visibility: true,
      id: 'id'
    }
    Mutations.updatePassword(state, newPassword);
    const find = state.passwords.find((o) => o.id === 'id')
    expect(find).toEqual(newPassword);
    
  })

  it ('updatePassword when recives null, not update nothing', () => {
    const passwords = [
      {
        password: '12346',
        type: 'Facebook',
        visibility: true,
        id: 'id1'
      },
      {
        password: '12345',
        type: 'Facebook',
        visibility: true,
        id: 'id'
      }
    ]
    const state = {
      currentPassword: {
        password: '12353',
        type: 'SWEET',
        visibility: true,
        id: 'id'
      },
      passwords: [
        ...passwords
      ]
    };

    Mutations.updatePassword(state, null);
    const find = state.passwords.find((o) => o.id === 'id')
    expect(find).toEqual(passwords[1]);
  })

  it ('updatePassword when recives undefined, not update nothing', () => {
    const passwords = [
      {
        password: '12346',
        type: 'Facebook',
        visibility: true,
        id: 'id1'
      },
      {
        password: '12345',
        type: 'Facebook',
        visibility: true,
        id: 'id'
      }
    ]
    const state = {
      currentPassword: {
        password: '12353',
        type: 'SWEET',
        visibility: true,
        id: 'id'
      },
      passwords: [
        ...passwords
      ]
    };

    Mutations.updatePassword(state, undefined);
    const find = state.passwords.find((o) => o.id === 'id')
    expect(find).toEqual(passwords[1]);
  });

  it('save runs ok', () => {
    const state = {
      currentPassword: {
        password: '12353',
        type: 'SWEET',
        visibility: true,
        id: 'id'
      },
      passwords: [
        {
          password: '12346',
          type: 'Facebook',
          visibility: true,
          id: 'id1'
        },
        {
          password: '12345',
          type: 'Facebook',
          visibility: true,
          id: 'id'
        }
      ]
    };
    jest.spyOn(window.localStorage.__proto__, 'setItem')
    Mutations.save(state);
    expect(window.localStorage.__proto__.setItem).toHaveBeenCalled()
  });
})
