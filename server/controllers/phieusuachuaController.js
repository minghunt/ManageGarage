import * as phieusuachuaDAO from '../dao/phieusuachuaDAO.js';
import ct_phieusuachua from '../models/CT_phieusuachuaModel.js';
import phieusuachuaModel from '../models/phieusuachuaModel.js'
async function createPSC(req,res) {
    try {
        const newPsc = req.body;
        const createPSC = await phieusuachuaDAO.createPSC(newPsc);
        res.status(200).json(createPSC);
    } catch (error) {
        res.status(500).json({ messsage:"Lỗi: ", error: error.message });
    }
}
async function getctPSC(req,res) {
    try {
        const ctPsc =await ct_phieusuachua.find()
        res.status(200).json(ctPsc);
    } catch (error) {
        res.status(500).json({ messsage:"Lỗi: ", error: error.message });
    }
}
async function getPSC(req,res) {
    try {
        const Psc =await phieusuachuaModel.find()
        res.status(200).json(Psc);
    } catch (error) {
        res.status(500).json({ messsage:"Lỗi: ", error: error.message });
    }
}
async function getPSCbyMaXe(req,res) {
    try {
        const MaXeR = Number(req.params.MaXe);
        console.log("MaXe:",MaXeR)
        const Psc =await phieusuachuaModel.aggregate([
            {
                $match:{
                    MaXe:MaXeR
            }
        },
        { 
            $lookup: {
                from: "ct_phieusuachuas",
                localField: "MaPSC",
                foreignField: "MaPSC",
                as: "ctPhieuSuaChua",
              }
       },{
        $lookup: {
            from: "tiencongs",
            localField: "ctPhieuSuaChua.MaTienCong",
            foreignField: "MaTienCong",
            as: "tiencong",
          }
       },
       {
         $addFields: {
           ctPhieuSuaChua: {
             $map: {
               input: "$ctPhieuSuaChua",
               as: "ct",
               in: {
                 $mergeObjects: [
                   "$$ct",
                   {
                    tiencong: {
                       $arrayElemAt: [
                         {
                           $filter: {
                             input: "$tiencong",
                             cond: { $eq: ["$$this.MaTienCong", "$$ct.MaTienCong"] }
                           }
                         },
                         0
                       ]
                     }
                   }
                 ]
               }
             }
           }
         }
       },
       {
        $lookup: {
            from: "ct_phutungpscs",
            localField: "ctPhieuSuaChua.MaCTPSC",
            foreignField: "MaCTPSC",
            as: "ctPhutungSuaChua",
          }
       },
       {
        $lookup: {
            from: "phutungs",
            localField: "ctPhutungSuaChua.MaPhuTung",
            foreignField: "MaPhuTung",
            as: "phutung",
          }
       },
       {
         $addFields: {
            ctPhutungSuaChua: {
             $map: {
               input: "$ctPhutungSuaChua",
               as: "ct",
               in: {
                 $mergeObjects: [
                   "$$ct",
                   {
                    phutung: {
                       $arrayElemAt: [
                         {
                           $filter: {
                             input: "$phutung",
                             cond: { $eq: ["$$this.MaPhuTung", "$$ct.MaPhuTung"] }
                           }
                         },
                         0
                       ]
                     }
                   }
                 ]
               }
             }
           }
         }
       },
       
       
            
        ])
        res.status(200).json(Psc);
    } catch (error) {
        res.status(500).json({ messsage:"Lỗi: ", error: error.message });
    }
}
export {
    createPSC,getPSC,getctPSC,getPSCbyMaXe
};