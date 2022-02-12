const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg')

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
})

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function(email) {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => {
      if (!result.rows) {
        return null
      }        
        return result.rows[0]
    })
    .catch((err) => {
      return err.message;
    });
};
exports.getUserWithEmail = getUserWithEmail;


/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => {
      if (!result.rows) {
        return null
      }        
        return result.rows[0]
    })
    .catch((err) => {
      return err.message;
    });  
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, email: string, password: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool
    .query(`
    INSERT INTO users (name, email, password)
    VALUES $1, $2, $3
    RETURNING *;`, [user.name, user.email, user.password])

    .then((result) => {
      console.log(result.rows);
      return result.rows[0];
    })
    .catch((err) => {
      return err.message;
    });
}
exports.addUser = addUser;





/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

const getAllReservations = function(guest_id, limit = 10) {
  
  const queryString = `
      SELECT *
      FROM reservations
      WHERE guest_id = $1
      LIMIT = $2;
      `
  const queryParams = [guest_id, limit];

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((err) => {
      return err.message;
    });

};
exports.getAllReservations = getAllReservations;






/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  const nextParameter = function() {
    if (queryParams.length) {
      queryString += `AND `;
    } else {
      queryString += `WHERE `;
    }
  };


  // 3
  if (options.city) {
    nextParameter();              // Call nextParameter to determine if an AND or a WHERE should be added to queryString
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
  if (options.owner_id) {
    nextParameter();
    queryParams.push(`%${options.owner_id}%`);
    queryString += `WHERE owner_id LIKE $${queryParams.length}`;
  }
  if (options.minimum_price_per_night) {
    nextParameter();
    queryParams.push(`%${options.minimum_price_per_night}%`);
    queryString += `WHERE minimum_price_per_night >= $${queryParams.length}`;
  }
  if (options.maximum_price_per_night) {
    nextParameter();
    queryParams.push(`%${options.maximum_price_per_night}%`);
    queryString += `WHERE maximum_price_per_night <= $${queryParams.length}`;
  }
  if (options.minimum_rating) {
    nextParameter();
    queryParams.push(`%${options.minimum_rating}%`);
    queryString += `WHERE minimum_rating >= $${queryParams.length}`;
  }
  
  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log("queryString is: ", queryString);  
  console.log("queryParams is: ", queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);

  
};
exports.getAllProperties = getAllProperties;







/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
