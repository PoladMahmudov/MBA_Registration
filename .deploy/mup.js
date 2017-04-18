module.exports = {
  servers: {
    one: {
      host: '54.218.90.94',
      username: 'ubuntu',
      pem: '/home/polad/Documents/mba-reg.pem'
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'mba-reg',
    path: '/media/polad/Local_disk/web-programing/APP/MBA_registration',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://ec2-54-218-90-94.us-west-2.compute.amazonaws.com',
      MONGO_URL: 'mongodb://localhost:27017/meteor'
      //'mongodb://polad:polad1996@ds037617.mlab.com:37617/meteor'
      //'mongodb://localhost/meteor'
    },
    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    //port: 27017,
    servers: {
      one: {},
    },
  },
};