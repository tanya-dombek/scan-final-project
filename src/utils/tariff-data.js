import lampImg from './imgs/lamp.svg';
import aimImg from './imgs/aim.svg';
import laptopImg from './imgs/laptop.svg';

export const tariffData = [
    {
        title: 'Beginner',
        img: lampImg,
        description: 'Для небольшого исследования',
        currentTariff: true,
        price: '1200',
        sailPrice: '799',
        instalment: '150',
        benefits: ['Безлимитная история запросов', 'Безопасная сделка', 'Поддержка 24/7']
    },
    {
        title: 'Pro',
        img: aimImg,
        description: 'Для HR и фрилансеров',
        currentTariff: false,
        price: '2600',
        sailPrice: '1299',
        instalment: '279',
        benefits: ['Все пункты тарифа Beginner', 'Экспорт истории', 'Рекомендации по приоритетам']
    },
    {
        title: 'Business',
        img: laptopImg,
        description: 'Для корпоративных клиентов',
        currentTariff: false,
        price: '3700',
        sailPrice: '2379',
        instalment: '',
        benefits: ['Все пункты тарифа Pro', 'Безлимитное количество запросов', 'Приоритетная поддержка']
    }
]