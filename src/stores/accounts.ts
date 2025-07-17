import {ref, reactive, watch} from 'vue';
import { defineStore } from 'pinia';
import type {IAccount, ITag} from "@/types";

const LOCAL_STORAGE_KEY = 'accountsList';

export const useAccountsStore = defineStore('accounts', () => {

  const loadFromLocalStorage = (): IAccount[] => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData) as IAccount[];
    }
    return [];
  };

  const saveToLocalStorage = (): void => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(accountsList));
  };

  const accountsList = reactive<IAccount[]>(loadFromLocalStorage());

  const additionFlag = ref<boolean>(false);

  const handleChangeTags = (newTags: ITag[], i: number) => {
    accountsList[i].tags = newTags;
    saveToLocalStorage();
  };

  const getCurrentType = (i: number) => {
    return accountsList[i].type;
  };

  const handleChangePasswordToNull = (i: number) => {
    accountsList[i].password = null;
    saveToLocalStorage();
  };

  const handleChangeType = (type: 'Локальная' | 'LDAP', i: number) => {
    accountsList[i].type = type;
    saveToLocalStorage();
  };

  const handleChangePassword = (i: number, newPassword: string) => {
    accountsList[i].password = newPassword;
    saveToLocalStorage();
  };

  const handleChangeLogin = (i: number, newLogin: string) => {
    accountsList[i].login = newLogin;
    saveToLocalStorage();
  };

  const addNewAccount = (newAccount: IAccount) => {
    accountsList.push(newAccount);
    saveToLocalStorage();
  }

  const deleteAccount = (i: number) => {
    accountsList.splice(i, 1);
    saveToLocalStorage();
  };

  return {
    additionFlag,
    accountsList,
    handleChangeTags,
    getCurrentType,
    handleChangePasswordToNull,
    handleChangePassword,
    handleChangeLogin,
    addNewAccount,
    deleteAccount,
    handleChangeType
  };
});
