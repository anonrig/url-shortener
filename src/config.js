/**
 * @author Can Kutlu Kinay <me@ckk.im>
 */

var nconf = require('nconf'),
    NODE_ENV = process.env.NODE_ENV || 'production';


nconf.argv()
    .env()
    .file({ file: 'config/default.json' })
    .file('env', { file: 'config/' + NODE_ENV + '.json' });


module.exports = nconf;
