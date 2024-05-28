import { NodeEnv } from '../enums';

//TODO: Change the function to get the environment
// Function to get the environment
export function getEnvironment(): NodeEnv {
  return (process.env.NODE_ENV as NodeEnv) || NodeEnv.DEVELOPMENT;
}

// Function to get the port
export function getPort(): number {
  return parseInt(process.env.PORT) || 3001;
}

// Function to get the MQTT URL
export function getMqttUrl(): string {
  return getEnvironment() === NodeEnv.PRODUCTION
    ? process.env.MQTT_URL
    : process.env.MQTT_LOCAL_URL || 'mqtt://localhost:1883';
}

//TODO: Implement the function to get the MQTT topic
// Function to get the MQTT topic

interface PostgresConfig {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  autoLoadEntities: boolean;
  synchronize: boolean;
  entities: string[];
}

export function getPostgresConfig(): PostgresConfig{  
  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'apz_backend_db',
    autoLoadEntities: true,
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
  };
}
