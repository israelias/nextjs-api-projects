const withImages = require('next-images')
module.exports = withImages({
    webpack(config, options) {
        return config
    }
})

// const profileImage = require('/public/images/profile.jpg');
