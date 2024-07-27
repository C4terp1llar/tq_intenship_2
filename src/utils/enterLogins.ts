import type {AccountsList} from "@/types/interfaces";

export function enterLogins (accounts: AccountsList[]): string[] {
  let loginsArr: string[] = [];

  for (const account of accounts) {
    loginsArr.push(account.login)
  }

  return loginsArr;
}