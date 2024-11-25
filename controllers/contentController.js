import Aarti from "../models/aartiModel.js";


export const createAarti = async (req, res) => {
    try {
      const { title, languages } = req.body;
      const files = req.files; // Access uploaded files
  
      // Validate required fields
      if (!title || !languages || !Array.isArray(JSON.parse(languages))) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const languageData = JSON.parse(languages);
  
      // Check for required file uploads
      if (!files || (!files.image && !files.audio)) {
        return res.status(400).json({ error: "Image or audio file required" });
      }
  
      let imageUrl = null;
      let audioUrl = null;
  
      // Upload image to Cloudinary
      if (files.image) {
        const imageResult = await new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload_stream(
            {
              folder: "samay_panchang/aartis/images",
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          ).end(files.image[0].buffer);
        });
        imageUrl = imageResult;
      }
  
      // Upload audio to Cloudinary
      if (files.audio) {
        const audioResult = await new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload_stream(
            {
              folder: "samay_panchang/aartis/audio",
              resource_type: "video",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          ).end(files.audio[0].buffer);
        });
        audioUrl = audioResult;
      }
  
      // Create a new Aarti document
      const newAarti = new Aarti({
        title,
        image: imageUrl,
        languages: languageData,
        audio: audioUrl,
      });
  
      await newAarti.save();
  
      res.status(201).json({ message: "Aarti created successfully", aarti: newAarti });
    } catch (error) {
      console.error("Error creating Aarti:", error.message);
      res.status(500).json({ error: "Failed to create Aarti", details: error.message });
    }
  };
  
export const getAllAartis = async (req, res) => {
  try {
    const aartis = await Aarti.find();
    res.status(200).json(aartis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Aartis" });
  }
};

export const getAartiById = async (req, res) => {
  try {
    const { id } = req.params;
    const aarti = await Aarti.findById(id);

    if (!aarti) {
      return res.status(404).json({ error: "Aarti not found" });
    }

    res.status(200).json(aarti);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Aarti" });
  }
};

export const updateAarti = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedAarti = await Aarti.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedAarti) {
      return res.status(404).json({ error: "Aarti not found" });
    }

    res
      .status(200)
      .json({ message: "Aarti updated successfully", aarti: updatedAarti });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update Aarti" });
  }
};

export const deleteAarti = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAarti = await Aarti.findByIdAndDelete(id);

    if (!deletedAarti) {
      return res.status(404).json({ error: "Aarti not found" });
    }

    res.status(200).json({ message: "Aarti deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete Aarti" });
  }
};
