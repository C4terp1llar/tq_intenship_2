import {ref, reactive, watch} from 'vue';
import { defineStore } from 'pinia';
import type { AccountsList } from "@/types/interfaces";

const LOCAL_STORAGE_KEY = 'accountsList';

export const useAccountsStore = defineStore('accounts', () => {

  const loadFromLocalStorage = (): AccountsList[] => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData) as AccountsList[];
    }
    return [];
  };

  const saveToLocalStorage = (): void => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(accountsList));
  };


  const accountsList = reactive<AccountsList[]>(loadFromLocalStorage());

  const additionFlag = ref<boolean>(false);

  const handleChangeTags = (newTags: { text: string }[], i: number) => {
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

  const handleChangePassword = (i: number, newPassword: string) => {
    accountsList[i].password = newPassword;
    saveToLocalStorage();
  };

  const handleChangeLogin = (i: number, newLogin: string) => {
    accountsList[i].login = newLogin;
    saveToLocalStorage();
  };

  const addNewAccount = (newAccount: AccountsList) => {
    accountsList.push(newAccount);
    saveToLocalStorage();
  }

  return {
    additionFlag,
    accountsList,
    handleChangeTags,
    getCurrentType,
    handleChangePasswordToNull,
    handleChangePassword,
    handleChangeLogin,
    addNewAccount
  };
});
