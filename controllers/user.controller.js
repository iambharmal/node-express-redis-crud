const redis = require('redis')
const client = redis.createClient();

async function index(req, res) {
  try {
    (async () => {
      await client.connect();
    })();
    let id = req.params.id;
    await client.get(id).then((response, reject) => {
      if(reject) {
        return res.status(500).json({
          status: 'error',
          message: 'Something went wrong!',
        })    
      }
      if(response) {
        return res.status(200).json({
          status: 'success',
          message: 'Users fetched successfully!',
          data: JSON.parse(response)
        })  
      } else {
        return res.status(200).json({
          status: 'error',
          message: 'Users does not exist!',
        })
      }
    })
    .catch(err => {
      return res.status(500).json({
        status: 'error',
        message: err,
      })
    })
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function add(req, res) {
  try {
    (async () => {
      await client.connect();
    })();

    let id = req.body.id,
        name = req.body.name,
        email = req.body.email,
        dob = req.body.dob,
        address = req.body.address;
    
    await client.set(id, JSON.stringify({
      'name': name,
      'email': email,
      'dob': dob,
      'address': address,
    }))
    .then((response, reject) => {
      if(reject) {
        return res.status(500).json({
          status: 'error',
          message: 'Something went wrong!',
        })    
      }
      return res.status(200).json({
        status: 'success',
        message: 'Users added successfully!',
      })  
    })
    .catch(err => {
      return res.status(500).json({
        status: 'error',
        message: err,
      })
    })
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function update(req, res) {
  try {
    (async () => {
      await client.connect();
    })();
    let id = req.body.id,
        name = req.body.name,
        email = req.body.email,
        dob = req.body.dob,
        address = req.body.address;

    const dbValue = await client.get(id);
    if(!dbValue) {
      return res.status(200).json({
        status: 'error',
        message: 'Users does not exist!',
      })
    }
    
    await client.set(id, JSON.stringify({
      'name': name,
      'email': email,
      'dob': dob,
      'address': address,
    }))
    .then(async (response, reject) => {
      if(reject) {
        return res.status(500).json({
          status: 'error',
          message: 'Something went wrong!',
        })    
      }
      const value = await client.get(id);
      return res.status(200).json({
        status: 'success',
        message: 'Users updated successfully!',
        data: JSON.parse(value)
      })  
    })
    .catch(err => {
      return res.status(500).json({
        status: 'error',
        message: err,
      })
    })
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function deleteUser(req, res) {
  try {
    (async () => {
      await client.connect();
    })();
    let id = req.params.id;
    const dbValue = await client.get(id);
    if(!dbValue) {
      return res.status(200).json({
        status: 'error',
        message: 'Users does not exist!',
      })
    }
    
    await client.del(id).then((response, reject) => {
      if(reject) {
        return res.status(500).json({
          status: 'error',
          message: 'Something went wrong!',
        })    
      }
      return res.status(200).json({
        status: 'success',
        message: 'Users deleted successfully!',
      })  
    })
    .catch(err => {
      return res.status(500).json({
        status: 'error',
        message: err,
      })
    })
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {
  index: index,
  update: update,
  add: add,
  deleteUser: deleteUser
}