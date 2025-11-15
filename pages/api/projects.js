import { Project } from "@/models/Project";
import { mongooseConnect } from "@/lib/mongoose";



export default async function handle(req, res) {


    await mongooseConnect()

    const { method } = req;

    if (method === 'POST') {
        const { title, slug, images, description,client ,projectcategory, tags, livepreview,status } = req.body;

        
        const blog = await Project.create({
            title, slug, images, description,client ,projectcategory, tags, livepreview,status
        });
        res.json(blog);
    }
    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Project.findById(req.query.id));
        }else{
            res.json((await Project.find()).reverse());
        }
    }

    if(method === 'PUT'){
        const { id, title, slug, images, description,client ,projectcategory, tags, livepreview,status } = req.body;
        const blog = await Project.updateOne({_id: id}, {
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
        await Project.deleteOne({_id: id});
        res.json({success: true});
    }    
}
