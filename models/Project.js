const {Schema , models, model} = require ('mongoose');

const projectSchema = new Schema ({
    title: {type: String, required: true},
    slug: {type: String, required: true},
    images: {type: [String], required: true},
    description: {type: String, required: true},
    client: {type: [String]},
    projectcategory: {type: [String], required: true},
    tags: {type: [String]},
    livepreview: {type: String},
    status: {type: String}
}, {timestamps: true});

export const Project = models.Project || model ('Project', projectSchema, 'projects');