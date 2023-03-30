const { Service: ServiceModel } = require("../models/Service");

const serviceController = {

    create: async (req, res) => {
        try {

            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            };

            const reponse = await ServiceModel.create(service);

            res.status(201).json({ reponse, mgs: "Serviço criado com sucesso!" });

        } catch (error) {
            console.error(error);
        }
    },

    getAll: async (req, res) => {
        try {

            const services = await ServiceModel.find();
            res.json(services);

        } catch (error) {
            console.error(error);
        }
    },

    getId: async (req, res) => {
        try {
            const id = req.params.id;
            const service = await ServiceModel.findById(id);

            if (!service) {
                res.status(404).json({ msg: "Serviço não encontrado." })
                return;
            }

            res.json(service);

        } catch (error) {
            console.error(error);
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const service = await ServiceModel.findById(id);
            if (!service) {
                res.status(404).json({ msg: "Serviço não encontrado." })
                return;
            }

            const deletedService = await ServiceModel.findByIdAndDelete(id);
            res.status(200).json({ deletedService, mgs: "Serviço excluído com sucesso." });

        } catch (error) {
            console.error(error);
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;
            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            };

            const updateService = await ServiceModel.findByIdAndUpdate(id, service);
            if (!updateService) {
                res.status(404).json({ msg: "Serviço não encontrado." })
                return;
            }

            res.status(200).json({ service, mgs: "Serviço atualizado com sucesso.", updateService });

        } catch (error) {
            console.error(error);
        }
    }
};

module.exports = serviceController;
