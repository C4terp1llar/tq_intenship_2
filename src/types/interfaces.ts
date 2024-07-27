export interface AccountsList {
  tags: Array<{ text: string }> | [],
  type: 'LDAP' | 'Локальная',
  login: string,
  password: string | null
}