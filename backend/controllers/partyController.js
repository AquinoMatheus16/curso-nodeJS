const PartyModel = require("../models/Party");

const checkPartyBudget = (budget, services) => {

    const priceSum = services.reduce((sum, service) => sum + service.price, 0);

    if (priceSum > budget) {
        return false;
    }
    return true;
}

const partyController = {

    create: async (req, res) => {
        try {
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services
            };

            if (party.services && !checkPartyBudget(party.budget, party.services)) {
                res.status(406).json({ msg: "O seu orçamento é insuficiente." });
                return;
            }

            const response = await PartyModel.create(party);

            res.status(201).json({ response, msg: "Festa criada com sucesso." })

        } catch (error) {
            console.error(error);
        }
    },

    getAll: async (req, res) => {
        try {

            const parties = await PartyModel.find();
            res.json(parties);

        } catch (error) {
            console.error(error);
        }
    },

    getId: async (req, res) => {
        try {

            const id = req.params.id;
            const parties = await PartyModel.findById(id);

            if (!parties) {
                res.status(404).json({ msg: "Festa não encontrado." })
                return;
            }

            res.json(parties);

        } catch (error) {
            console.error(error);
        }
    },

    delete: async (req, res) => {
        try {

            const id = req.params.id;
            const parties = await PartyModel.findById(id);
            if (!parties) {
                res.status(404).json({ msg: "Festa não encontrada." })
                return;
            }

            const deletedParties = await PartyModel.findByIdAndDelete(id);
            res.status(200).json({ deletedParties, mgs: "Festa excluída com sucesso." });

        } catch (error) {
            console.error(error);
        }
    },

    update: async (req, res) => {
        try {

            const id = req.params.id;
            const parties = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services
            };

            const updateParties = await PartyModel.findByIdAndUpdate(id, parties);
            if (!updateParties) {
                res.status(404).json({ msg: "Festa não encontrada." })
                return;
            }

            res.status(200).json({ parties, mgs: "Festa atualizada com sucesso." });

        } catch (error) {
            console.error(error);
        }
    }
};

module.exports = partyController;
