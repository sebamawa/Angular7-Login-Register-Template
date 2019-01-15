export class User {
  public id?: string;
  public realm?: string; // name (se usa 'realm' porque es por default del model User de Loopback)
  public username?: string;
  public email: string;
  public password: string;

  // constructor(public email: string, public password: string, public name: string, public id?) {}
  constructor() {}
}
