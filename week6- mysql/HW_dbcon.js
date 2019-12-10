/**********************************************************
**  Description: HostWinds MySql database configuration
**********************************************************/

const credentials = require('./credentials.js');

const mysql = require('mysql');

const hostwinds = {
	connectionLimit : 10,
    host            :  credentials.HW_HOSTNAME,
    port            :  '3306',
	user            :  credentials.HW_USER,
	password        :  credentials.HW_PASSWORD,
    database        :  credentials.HW_DB,
    dateStrings     :  'true',
};

let pool = mysql.createPool(hostwinds);

module.exports.pool = pool;
