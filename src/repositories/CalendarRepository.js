import Repository from './Repository'
import Calendar from './../models/Calendar'
import datasource from '../datasources/baljs-rest-api'

export default class CalendarRepository extends Repository {
  constructor () {
    super(Calendar, datasource)
  }
}
