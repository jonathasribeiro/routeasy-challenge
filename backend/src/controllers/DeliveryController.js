import * as Yup from 'yup';
import Delivery from '../schemas/Delivery';

class DeliveryController {
    async index(req, res) {
        const deliveries = await Delivery.find().sort('+createdAt');

        return res.json(deliveries);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            weight: Yup.string().required(),
            place: Yup.string().required(),
            number: Yup.string().required(),
            neighborhood: Yup.string().required(),
            complement: Yup.string().required(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            country: Yup.string().required(),
            lat: Yup.number().required(),
            lng: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Erro de Validação' });
        }

        const {
            name,
            weight,
            place,
            number,
            neighborhood,
            complement,
            city,
            state,
            country,
            lat,
            lng,
        } = req.body;

        const delivery = await Delivery.create({
            name,
            weight,
            address: {
                place,
                number,
                neighborhood,
                complement,
                city,
                state,
                country,
                geolocation: {
                    lat,
                    lng,
                },
            },
        });

        return res.json(delivery);
    }

    async delete(req, res) {
        await Delivery.deleteMany();

        return res.json({ message: 'Cadastros Removidos com Sucesso' });
    }
}

export default new DeliveryController();
