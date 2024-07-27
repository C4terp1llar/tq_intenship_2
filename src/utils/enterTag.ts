import type {AccountsList} from "@/types/interfaces";


export function enterTags (accounts: AccountsList[]): string[] {
  let tagsArr: string[] = [];

  for (const account of accounts) {
    const tagTexts = account.tags.map((tag) => tag.text).join("; ");
    tagsArr.push(tagTexts);
  }

  return tagsArr;
}