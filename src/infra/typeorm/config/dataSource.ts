import { DataSource, DataSourceOptions } from "typeorm";
import { typeormConfig } from "./typeormConfig";

const dataSource = new DataSource(typeormConfig as DataSourceOptions);
export default dataSource;