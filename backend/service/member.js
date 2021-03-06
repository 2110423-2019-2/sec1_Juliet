var db = require('../dbconnection');
var util = require('../util');

const register = (username, data, created_at, amount, callback) => {
	const { password, firstname, lastname, phone_number, email, photo } = data;
	return db.query(
		`INSERT INTO members (username,password,firstname,lastname,phone_number,email,photo,created_at,amount) VALUES (?,?,?,?,?,?,?,?,?)`,
		[username, password, firstname, lastname, phone_number, email, photo, created_at, amount],
		callback
	);
};

const getMemberInfo = (username, callback) => {
	return db.query(
		`SELECT id,username,firstname,lastname,phone_number,email,photo,driver_status,
    amount,driving_license,approved_at,approved_by,rejected_at,rejected_by,edited_at,banned_at,banned_by FROM members WHERE username = ?`,
		[username],
		callback
	); //credit-card-related fields are removed from this line
};

function login(username, password, callback) {
	return db.query(
		`SELECT id,username,firstname,lastname,phone_number,email,photo,driver_status,
    amount,driving_license,approved_at,approved_by,rejected_at,rejected_by,edited_at,banned_at,banned_by FROM members WHERE username = ? AND password = ?`,
		[username, password],
		callback
	); //credit-card-related fields are removed from this line
}

function getByUsername(username, callback) {
	return db.query(
		`SELECT id,username,firstname,lastname,phone_number,email,photo,driver_status,
    amount,driving_license,approved_at,approved_by,rejected_at,rejected_by,edited_at,banned_at,banned_by FROM members WHERE username = ?`,
		[username],
		callback
	); //credit-card-related fields are removed from this line
}

const editMemberInfo = (id, body, callback) => {
	const { firstname, lastname, phone_number, email, photo } = body; //credit-card-related fields are removed from this line
	return db.query(
		`UPDATE members SET firstname = ?,lastname = ? ,phone_number = ?,email = ?,photo = ?
      WHERE id = ?;`, //credit-card-related fields are removed from this line
		[firstname, lastname, phone_number, email, photo, id],
		callback
	); //credit-card-related fields are removed from this line
};

const getWallet = (member_id, callback) => {
	return db.query(
		`SELECT members.amount
    FROM members
    WHERE id = ?`,
		[member_id],
		callback
	);
};

const getWallet2 = async (member_id) =>
	await util.promisifyQuery(
		`SELECT members.amount
  FROM members
  WHERE id = ?`,
		[member_id]
	);

const updateWallet = (amount, member_id, callback) => {
	return db.query(
		`UPDATE members SET members.amount = ? WHERE members.id = ?`,
		[amount, member_id],
		callback
	);
};

const getDriverRequest = (callback) => {
	return db.query(
		`SELECT id,username,firstname,lastname,phone_number,email,photo,driver_status,driving_license,
                  approved_at, approved_by,rejected_at,rejected_by,edited_at, driver_status
                  FROM members WHERE driver_status = 'pending'`,
		callback
	);
};

const getAll = (callback) => {
	return db.query(
		`SELECT id,username,firstname,lastname,phone_number,email,photo,
                  driver_status,driving_license,approved_at,approved_by,rejected_at,rejected_by,banned_at,banned_by
                  FROM members`,
		callback
	);
};

const banMember = (admin_name, banned_at, member_id, callback) => {
	return db.query(
		`UPDATE members SET banned_by = ?,banned_at = ? WHERE id = ?`,
		[admin_name, banned_at, member_id],
		callback
	);
};

const unbanMember = (member_id, callback) => {
	return db.query(
		`UPDATE members SET banned_by = null,banned_at = null WHERE id = ?`,
		[member_id],
		callback
	);
};

const getOwnerDetail = (owner_id, callback) => {
	return db.query(
		`SELECT
                          members.id as id,
                          members.username as username,
                          members.firstname as firstname,
                          members.lastName as lastname,
                          members.phone_number as phone_number,
                          members.email as email,
                          members.photo as photo,
                          AVG(review.rating ) as avg_rating
                          FROM members  left join review on review.reviewee=members.id
                          WHERE members.id = ` +
			owner_id +
			` GROUP BY members.id`,
		callback
	);
};

const getDriverDetail = (trip_id, callback) => {
	return db.query(
		`SELECT  
                    members.id,
                    members.username,
                    members.firstname,
                    members.lastname,
                    members.phone_number,
                    members.photo
                    FROM members LEFT JOIN trip ON members.id = trip.owner
                    WHERE trip.id = ? `,
		[trip_id],
		callback
	);
};

module.exports = {
	register,
	getMemberInfo,
	login,
	getByUsername,
	editMemberInfo,
	getWallet,
	getWallet2,
	updateWallet,
	getDriverRequest,
	getAll,
	banMember,
	unbanMember,
	getOwnerDetail,
	getDriverDetail,
};
