import { mongooseConnect } from "@/lib/mongoose";
const { Blog } = require('@/models/Blog');



export default async function handle(req, res) {


    await mongooseConnect()

    const { method } = req;

    if (method === 'POST') {
        const { title, slug, images, description, category, tags, status } = req.body;

        
        const blog = await Blog.create({
            title,
            slug,
            images,
            description,
            category,
            tags,
            status,
        });
        res.json(blog);
    }
    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Blog.findById(req.query.id));
        }else{
            res.json((await Blog.find()).reverse());
        }
    }

    if(method === 'PUT'){
        const { id, title, slug, images, description, category, tags, status } = req.body;
        const blog = await Blog.updateOne({_id: id}, {
            title,
            slug,
            images,
            description,
            category,
            tags,
            status,
        });
        res.json(blog);
    }
    
    if(method === 'DELETE'){
        const { id } = req.query;
        await Blog.deleteOne({_id: id});
        res.json({success: true});
    }    
}