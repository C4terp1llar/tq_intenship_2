export interface IAccount {
  tags: ITag[] | [],
  type: 'LDAP' | 'Локальная' | string,
  login: string,
  password: string | null
}

export interface ITag {
  text: string;
}