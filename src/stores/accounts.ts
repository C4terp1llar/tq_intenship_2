import {ref, computed, reactive} from 'vue'
import {defineStore} from 'pinia'
import type {AccountsList} from "@/types/interfaces";

export const useAccountsStore = defineStore('accounts', () => {

  const accountsList = reactive<AccountsList[]>(
    [
      {
        tags: [
          {
            text: 'метка1',
          },
          {
            text: 'метка2',
          }
        ],
        type: 'LDAP',
        login: 'qwe',
        password: null
      },
      {
        tags: [
          {
            text: 'метка3',
          },
          {
            text: 'метка4',
          }
        ],
        type: 'Локальная',
        login: 'abc',
        password: 'password123'
      },
      {
        tags: [
          {
            text: 'метка5',
          },
          {
            text: 'метка6',
          }
        ],
        type: 'LDAP',
        login: 'xyz',
        password: null
      },
    ]
  );

  const handleChangeTags = (newTags: {text: string}[], i: number) => {
    accountsList[i].tags = newTags;
  }

  const handleChangeType = (i: number, newType: 'LDAP' | 'Локальная') => {
    accountsList[i].type = newType;
  }

  const getCurrentType = (i: number) => {
    return accountsList[i].type
  }

  const getCurrentPassword = (i: number) => {
    return accountsList[i].password
  }

  const handleChangePasswordToNull = (i: number) => {
    accountsList[i].password = null;
  }

  const handleChangeLogin = (i: number, newLogin: string) => {
    accountsList[i].login = newLogin;
  }

  return {
    accountsList,
    handleChangeTags,
    getCurrentType,
    handleChangeType,
    getCurrentPassword,
    handleChangePasswordToNull,
    handleChangeLogin
  }
})
