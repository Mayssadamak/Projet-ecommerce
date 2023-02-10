const express=require('express');
const router = express.Router();
const Article=require("../models/article");


router.post("/",async(req,res)=>{
    const {reference,designation,prix,marque,qtestock,imageart,scategorieID,} = req.body;
    const article1= new Article({reference:reference,designation:designation,prix:prix,marque:marque,qtestock:qtestock,imageart:imageart,scategorieID:scategorieID})

    try {await article1.save();
        res.status(200).json(article1);
        }catch(error) {
            res.status(404).json({ message: error.message });
            }
});
router.get("/",async(req,res)=>{
    try{
        const art = await Article.find().populate("scategorieID").exec()
        res.status(200).json(art);
    }catch(error){
    res.status(404).json({ message: error.message });
    }
});

router.get('/:articleId',async(req, res)=>{
    try {
    const article = await Article.findById(req.params.articleId);
    res.status(200).json(article);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    
router.put('/:articleId', async (req, res)=> {
    const {reference,designation,prix,marque,qtestock,imageart,scategorieID} =req.body;
    const id = req.params.articleId;
    try {
    const article = { 
        reference:reference,designation:designation,prix:prix,marque:marque,qtestock:qtestock,imageart:imageart,scategorieID:scategorieID, _id:id };
    await Article.findByIdAndUpdate(id, article);
     res.json(article);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });

    router.delete('/:articleId', async (req, res)=> {
        const id = req.params.articleId;
        await Article.findByIdAndDelete(id);
        res.json({ message: "categorie deleted successfully." });
        });

module.exports = router;