import { DataSource, DataSourceOptions } from "typeorm";
import { typeormConfig } from "./typeormConfig";

const AppDataSource = new DataSource(typeormConfig as DataSourceOptions);
export default AppDataSource;