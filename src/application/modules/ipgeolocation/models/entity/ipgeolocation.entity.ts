import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';

@Table
export class IpgeolocationEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  ip: string;

  @Column(DataType.STRING)
  continent_code: string;

  @Column(DataType.STRING)
  continent_name: string;

  @Column(DataType.STRING)
  country_code2: string;

  @Column(DataType.BOOLEAN)
  country_code3: boolean;

  @Column(DataType.STRING)
  country_name: string;

  @Column(DataType.STRING)
  country_capital: string;

  @Column(DataType.STRING)
  state_prov: string;

  @Column(DataType.STRING)
  district: string;

  @Column(DataType.STRING)
  city: string;

  @Column(DataType.STRING)
  zipcode: string;

  @Column(DataType.STRING)
  latitude: string;

  @Column(DataType.STRING)
  longitude: string;

  @Column(DataType.STRING)
  is_eu: string;

  @Column(DataType.STRING)
  calling_code: string;

  @Column(DataType.STRING)
  country_tld: string;

  @Column(DataType.STRING)
  languages: string;

  @Column(DataType.STRING)
  country_flag: string;

  @Column(DataType.STRING)
  geoname_id: string;

  @Column(DataType.STRING)
  isp: string;

  @Column(DataType.STRING)
  connection_type: string;

  @Column(DataType.STRING)
  organization: string;

  @Column(DataType.JSON)
  currency: object;

  @Column(DataType.JSON)
  time_zone: object;
}
