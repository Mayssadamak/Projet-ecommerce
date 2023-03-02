const express= require("express");
const router = express.Router();
const SCategorie=require("../models/scategorie");


router.post("/",async(req,res)=>{
    const { nomscategorie, imagescat,categorieID} = req.body;
    const scat1 = new SCategorie({nomscategorie:nomscategorie, 
   imagescat:imagescat,categorieID:categorieID})
     //ou bien const cat1 = new Categorie(req.body);
    try {await scat1.save();
        res.status(200).json(scat1);
        }catch(error) {
            res.status(404).json({ message: error.message });
            }
});
router.get("/",async(req,res)=>{
    try{
        const scat=await SCategorie.find().populate("categorieID").exec()
        res.status(200).json(scat);
    }catch(error){
    res.status(404).json({ message: error.message });
    }

});

router.get('/:scategorieId',async(req, res)=>{
    try {
    const scat = await SCategorie.findById(req.params.scategorieId);  
     res.status(200).json(scat);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    
router.put('/:scategorieId', async (req, res)=> {
    const { nomcategorie, imagecategorie,categorieID} = req.body;
    const id = req.params.scategorieId;
    try {
    const scat1 = { 
    nomcategorie:nomcategorie,imagecategorie:imagecategorie, categorieID:categorieID,_id:id };
    await SCategorie.findByIdAndUpdate(id, scat1);
     res.json(scat1);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });

    router.delete('/:scategorieId', async (req, res)=> {
        const id = req.params.scategorieId;
        await SCategorie.findByIdAndDelete(id);
        res.json({ message: "scategorie deleted successfully." });
        });

module.exports = router;
