// Import required modules (ES Modules syntax)
import express from 'express';
import MenuItem from '../models/Menu.js'; // NOTE: .js extension required in ES modules

const router = express.Router();


// =======================
// CREATE MENU ITEM
// =======================
router.post('/', async (req, res) => {
    try {
        // Create new menu item using request body
        const newMenuItem = new MenuItem(req.body);

        // Save to database
        const response = await newMenuItem.save();

        console.log('✅ Menu data saved');

        // 201 → resource created successfully
        res.status(201).json(response);

    } catch (err) {
        console.error(err);

        // 500 → internal server error
        res.status(500).json({ error: 'Internal server error in Menu' });
    }
});


// =======================
// READ ALL MENU ITEMS
// =======================
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();

        console.log('✅ Menu data fetched');

        res.status(200).json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// =======================
// READ BY TASTE (IMPROVED ROUTE)
// =======================
// Instead of '/:menuType' → use '/taste/:menuType'
// This avoids conflict with '/:id'
router.get('/taste/:menuType', async (req, res) => {
    try {
        // Destructuring params
        const { menuType } = req.params;

        // Valid taste types
        const validTypes = ['spicy', 'sweet', 'sour'];

        // Validation check
        if (!validTypes.includes(menuType)) {
            // 400 → bad request (invalid input)
            return res.status(400).json({ error: 'Invalid taste type' });
        }

        // Fetch data based on taste
        const menuData = await MenuItem.find({ taste: menuType });

        console.log('✅ Data fetched by taste');

        res.status(200).json(menuData);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// =======================
// UPDATE MENU ITEM
// =======================
router.put('/:id', async (req, res) => {
    try {
        const response = await MenuItem.findByIdAndUpdate(
            req.params.id,   // ID from URL
            req.body,        // Updated data
            {
                new: true,        // return updated document
                runValidators: true, // run schema validation
            }
        );

        // If ID not found
        if (!response) {
            return res.status(404).json({ error: 'ID not found for update' });
        }

        console.log('✅ Data updated successfully');

        res.status(200).json(response);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// =======================
// DELETE MENU ITEM
// =======================
router.delete('/:id', async (req, res) => {
    try {
        const response = await MenuItem.findByIdAndDelete(req.params.id);

        // If ID not found
        if (!response) {
            return res.status(404).json({ error: 'ID not found for delete' });
        }

        console.log('✅ Data deleted successfully');

        res.status(200).json({ message: 'Menu item deleted successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// =======================
// EXPORT ROUTER (ES MODULE)
// =======================
export default router;


