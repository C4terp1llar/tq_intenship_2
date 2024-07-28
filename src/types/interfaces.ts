export interface AccountsList {
  tags: Array<{ text: string }> | [],
  type: 'LDAP' | 'Локальная' | string,
  login: string,
  password: string | null
}