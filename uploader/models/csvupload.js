const { Model } = require('objection');

module.exports = class UploadModel extends Model {
    static get tableName() {
        return 'csvupload';
    }

    static get jsonSchema () {
        return {
            type: 'object',
            properties: {
                id: {type: 'integer'},
                file_type: {type: 'string', minLength: 1, maxLength: 255},
                uploaded_file: {type: 'string', minLength: 1, maxLength: 255},
            }
        };
    }
}