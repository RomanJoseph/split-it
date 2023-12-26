export interface IUserPostgresAdapter {
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    remove(id: number): Promise<void>;
    findByLogin(login: string): Promise<any>;
    save(user: any): Promise<any>;
};